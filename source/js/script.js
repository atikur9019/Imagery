const body = document.querySelector('body');
const apiKeyValue = "qIiu3kGYMAHjQTFbssCsvTpuvHzZ7MBAS4C6FJCMR5dnTcgq8FpnonD8";

const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const imageShowContainer = document.querySelector('.image-show-container');

const moodText = document.querySelector('.mood-text');
const moodIcon = document.querySelector('.mood-icon');
const moodContent = document.querySelector('.mood-content');


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
        searchInput.blur();
    }
});

searchInput.addEventListener('keydown', (event) => {
    let searchValue = searchInput.value;
    if (event.key === 'Enter' && searchValue.trim() !== '') {
        fetchImages(searchValue);
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
        imageShowContainer.classList.remove('error')
        console.log(data);
        if (data.photos.length === 0) {
            imageShowContainer.innerHTML = `
                <h2 class="error-message">${searchValue}-is not Found</h2>
            `;
            imageShowContainer.classList.add('error');
        }else {
            displayImages(data.photos);
            imageShowContainer.classList.remove('error');
        }
    } catch (error) {
        imageShowContainer.innerHTML = `
            <h2 class="error-message">${searchValue}-is not Found</h2>
        `;
        imageShowContainer.classList.add('error');
    }
}


function displayImages(images) {
    imageShowContainer.innerHTML = '';
    images.forEach(image => {
        let div = document.createElement('div');
        div.classList.add('div-container');
        imageShowContainer.appendChild(div);

        let img = document.createElement('img');
        img.classList.add('image-item');
        img.src = image.src.large;
        let downloadBtn = document.createElement('button');
        downloadBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                    <path d="M480-337q-8 0-15-2.5t-13-8.5L308-492q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T365-549l75 75v-286q0-17 11.5-28.5T480-800q17 0 28.5 11.5T520-760v286l75-75q12-12 28.5-11.5T652-548q11 12 11.5 28T652-492L508-348q-6 6-13 8.5t-15 2.5ZM240-160q-33 0-56.5-23.5T160-240v-80q0-17 11.5-28.5T200-360q17 0 28.5 11.5T240-320v80h480v-80q0-17 11.5-28.5T760-360q17 0 28.5 11.5T800-320v80q0 33-23.5 56.5T720-160H240Z"/>
                                 </svg>`;
        downloadBtn.classList.add('download-btn');
        downloadBtn.dataset.value = image.src.large;
        const downloadUrl = image.src.large;
        downloadBtn.addEventListener('click', async (event) => {
            let url = event.currentTarget.dataset.value;
            try {
                const response2 = await fetch(url);
                const file = await response2.blob();
                const a = document.createElement('a');
                a.href = URL.createObjectURL(file);
                a.download = `imagery_photo_${new Date().getTime()}.jpg`;
                a.click();
            } catch (error) {
                    return 'error';
           }
                
        });
    
        div.appendChild(img);
        div.appendChild(downloadBtn);
    });
}

let btns = document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', async (event) => {
      const url = event.currentTarget.dataset.value;
      console.log(url);
    try {
        const response1 = await fetch(url);
        const file = await response1.blob();
        const a = document.createElement('a');
        a.href = URL.createObjectURL(file);
        a.download = `imagery_photo_${new Date().getTime()}.jpg`;
        a.click();
    } catch (error) {
        console.log(error);
    }
    });
});
  