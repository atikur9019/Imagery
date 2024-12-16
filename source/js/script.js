const body = document.querySelector('body');
const apiKeyValue = "qIiu3kGYMAHjQTFbssCsvTpuvHzZ7MBAS4C6FJCMR5dnTcgq8FpnonD8";
// const apiUrl = 'https://api.pexels.com';

const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const imageContainer = document.querySelector('.image-show-container');
const mediaType = document.querySelector('#mediaType');
const showSearch = document.querySelector('h3');

const moodText = document.querySelector('.mood-text');
const moodIcon = document.querySelector('.mood-icon');
const moodContent = document.querySelector('.mood-content');



moodContent.addEventListener('click', () => {
    const isLight = body.classList.toggle('light-mode');
    console.log(isLight); 
    moodText.textContent = isLight ? 'Dark' : 'Light';
    moodIcon.textContent = isLight ? 'dark_mode' : 'light_mode';
});


searchBtn.addEventListener('click', () => {
    let searchValue = searchInput.value;
    if (searchValue.trim() !== '') {
        fetchImages(searchValue);
        searchInput.blur();
        showSearch.innerHTML = `<b>${searchValue}</b> your search results`;
    }
});

searchInput.addEventListener('keydown', (event) => {
    let searchValue = searchInput.value;
    if (event.key === 'Enter' && searchValue.trim() !== '') {
        fetchImages(searchValue);
        searchInput.blur();
        showSearch.innerHTML = `<b>${searchValue}</b> - your search results`;

    }
});


async function fetchImages(searchValue) {
    const mediaType = document.querySelector('#mediaType').value;
    const endpoint = mediaType === 'photos'
        ? `https://api.pexels.com/v1/search?query=${searchValue}&per_page=10`
        : `https://api.pexels.com/videos/videos/search?query=${searchValue}&per_page=10`;

    try {
        const response = await fetch(endpoint, {
            headers: {
                Authorization: apiKeyValue
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch media');
        }

        const data = await response.json();
        displayImages(data, mediaType);
    } catch (error) {
        imageContainer.innerHTML = '<p>Sorry, media not found.</p>';
        console.error(error);
    }
}

function displayImages(images, mediaType) {
    imageContainer.innerHTML = '';

    const mediaItems = mediaType === 'photo'
        ? images.photos
        : images.videos;
    
    mediaItems.forEach(image => {
        const mediaElement = createMediaElement(image, mediaType);
        imageContainer.appendChild(mediaElement);
    });
}


function createMediaElement(item, mediaType) {
    const mediaDiv = document.createElement('div');
    mediaDiv.classList.add('image-container');

    let mediaSource, downloadUrl;
    let downloadBtn;

    if (mediaType === 'photos') {
        mediaSource = document.createElement('img');
        downloadBtn = document.createElement('button');
        downloadBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-337q-8 0-15-2.5t-13-8.5L308-492q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T365-549l75 75v-286q0-17 11.5-28.5T480-800q17 0 28.5 11.5T520-760v286l75-75q12-12 28.5-11.5T652-548q11 12 11.5 28T652-492L508-348q-6 6-13 8.5t-15 2.5ZM240-160q-33 0-56.5-23.5T160-240v-80q0-17 11.5-28.5T200-360q17 0 28.5 11.5T240-320v80h480v-80q0-17 11.5-28.5T760-360q17 0 28.5 11.5T800-320v80q0 33-23.5 56.5T720-160H240Z"/></svg>`;
        downloadBtn.classList.add('download-btn');
        mediaSource.style.position = 'relative';
        mediaSource.src = item.src.large;
        downloadUrl = item.src.large;
    } else {
        mediaSource = document.createElement('video');
        mediaSource.src = item.video_files[0].link;
        downloadBtn = document.createElement('button');
        downloadBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-337q-8 0-15-2.5t-13-8.5L308-492q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T365-549l75 75v-286q0-17 11.5-28.5T480-800q17 0 28.5 11.5T520-760v286l75-75q12-12 28.5-11.5T652-548q11 12 11.5 28T652-492L508-348q-6 6-13 8.5t-15 2.5ZM240-160q-33 0-56.5-23.5T160-240v-80q0-17 11.5-28.5T200-360q17 0 28.5 11.5T240-320v80h480v-80q0-17 11.5-28.5T760-360q17 0 28.5 11.5T800-320v80q0 33-23.5 56.5T720-160H240Z"/></svg>`;
        downloadBtn.classList.add('download-btn');
        mediaSource.style.position = 'relative';
        mediaSource.controls = true;
        mediaSource.autoplay = false; 
        downloadUrl = item.video_files[0].link;
    }

    // downloadBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-337q-8 0-15-2.5t-13-8.5L308-492q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T365-549l75 75v-286q0-17 11.5-28.5T480-800q17 0 28.5 11.5T520-760v286l75-75q12-12 28.5-11.5T652-548q11 12 11.5 28T652-492L508-348q-6 6-13 8.5t-15 2.5ZM240-160q-33 0-56.5-23.5T160-240v-80q0-17 11.5-28.5T200-360q17 0 28.5 11.5T240-320v80h480v-80q0-17 11.5-28.5T760-360q17 0 28.5 11.5T800-320v80q0 33-23.5 56.5T720-160H240Z"/></svg>`;
    // downloadBtn.classList.add('download-btn');
    downloadBtn.addEventListener('click', () => downloadMedia(downloadUrl));

    mediaDiv.appendChild(mediaSource);
    mediaDiv.appendChild(downloadBtn);

    return mediaDiv;
}


function downloadMedia(url) {
    const link = document.createElement('a');
    link.href = url;

    link.download = url.split('/').pop();
    body.appendChild(link);
    link.click();
    body.removeChild(link);
}

