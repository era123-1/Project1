const apiKey = "AIzaSyBxYwQsLGmy0JrDSSqe8qxumqc1t-HyHg4"; 

const formE1 = document.getElementById("search-form");
const inputE1 = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let pageToken = "";

async function searchVideos() {
    inputData = inputE1.value;
    const url = `https://www.googleapis.com/youtube/v3/search?q=${inputData}&part=snippet&type=video&key=${apiKey}&pageToken=${pageToken}`;

    const response = await fetch(url);
    const data = await response.json();

    const items = data.items;

    if (!pageToken) {
        searchResults.innerHTML = "";
    }

    items.forEach(item => {
        const videoWrapper = document.createElement("div");
        videoWrapper.classList.add("search-result");

        const videoThumbnail = document.createElement("img");
        videoThumbnail.src = item.snippet.thumbnails.medium.url;
        videoThumbnail.alt = item.snippet.title;

        const videoLink = document.createElement("a");
        videoLink.href = `https://www.youtube.com/watch?v=${item.id.videoId}`;
        videoLink.target = "_blank";
        videoLink.textContent = item.snippet.title;

        videoWrapper.appendChild(videoThumbnail);
        videoWrapper.appendChild(videoLink);

        searchResults.appendChild(videoWrapper);
    });

    pageToken = data.nextPageToken || "";

    if (pageToken) {
        showMore.style.display = "block";
    } else {
        showMore.style.display = "none";
    }
}

formE1.addEventListener("submit", async (event) => {
    event.preventDefault();
    pageToken = "";
    await searchVideos(pageToken);
});

showMore.addEventListener("click", async () => {
    await searchVideos();
});