const apiKeyValue = "qIiu3kGYMAHjQTFbssCsvTpuvHzZ7MBAS4C6FJCMR5dnTcgq8FpnonD8";

const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

const moodText = document.querySelector('.mood-text');
const moodIcon = document.querySelector('.mood-icon');
const moodContent = document.querySelector('.mood-content');
const body = document.querySelector('body');



moodContent.addEventListener('click', () => {
    let text = moodText.textContent.trim();
    let icon = moodIcon.textContent.trim();
    
    if (text === 'Light' && icon === 'light_mode') {
        moodText.textContent = 'Dark';
        moodIcon.textContent = 'dark_mode';
        body.classList.add('light-mode');
    }else if (text === 'Dark' && icon === 'dark_mode') {
        moodText.textContent = 'Light';
        moodIcon.textContent = 'light_mode';
        body.classList.remove('light-mode');
    }
});


searchBtn.addEventListener('click', () => {
    let searchValue = searchInput.value;
    if (searchValue.trim() !== '') {
        fetchImages(searchValue);
        searchInput.value = '';
        searchInput.blur();
        console.log(searchValue);
    }
});

searchInput.addEventListener('keydown', (event) => {
    let searchValue = searchInput.value;
    if (event.key === 'Enter' && searchValue.trim() !== '') {
        fetchImages(searchValue);
        searchInput.value = '';
        searchInput.blur();
    }
});

const options = {
    headers: {
        Authorization: apiKeyValue
    }
};

async function fetchImages(searchValue) {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${searchValue}`, {
            headers: {
                Authorization: apiKeyValue
            }
        });
        const data = await response.json();
        console.log(data);
        displayImages(data.photos);
    } catch (error) {
        console.log('Error fetching images:', error.message);
    }
}


function displayImages(images) {
    images.forEach(image => {
        console.log(image.src.large);
        const imageContainer = document.querySelector('.image-show-container');
        let div = document.createElement('div');
        imageContainer.appendChild(div);
        let img =  document.createElement('img');
        let tagging = document.createElement('a');
        img.src = image.src.large;
        tagging.textContent = image.photographer;
        tagging.href = image.photographer_url;
        tagging.target = '_blank';
        div.appendChild(img);
        div.appendChild(tagging);
    });
    // const imageContainer = document.querySelector('.image-container');
    // let img =  document.createElement('img');
    // img.src = images[0].src.large;
}
