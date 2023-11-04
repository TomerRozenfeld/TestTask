// script.js
const apiKey = 'Y35829162-4638e1e58dac695ba18841589'; // Replace with your actual Pixabay API key

document.getElementById('searchButton').addEventListener('click', searchPixabay);

function searchPixabay() {
    const searchQuery = document.getElementById('search').value;
    const url = `https://pixabay.com/api/?key=35829162-4638e1e58dac695ba18841589&q=yellow+flowers&image_type=photo`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const results = document.getElementById('results');
            results.innerHTML = '';

            data.hits.forEach(image => {
                const card = document.createElement('div');
                card.className = 'card';

                const img = document.createElement('img');
                img.src = image.webformatURL;

                const cardContent = document.createElement('div');
                cardContent.className = 'card-content';

                const cardTitle = document.createElement('div');
                cardTitle.className = 'card-title';
                cardTitle.innerText = image.tags;

                const cardDescription = document.createElement('div');
                cardDescription.className = 'card-description';
                cardDescription.innerText = `By ${image.user}`;

                cardContent.appendChild(cardTitle);
                cardContent.appendChild(cardDescription);

                card.appendChild(img);
                card.appendChild(cardContent);

                results.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
