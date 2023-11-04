const apiKey = '35829162-4638e1e58dac695ba18841589';

// Event listeners
document.getElementById('search').addEventListener('input', clearResults);
document.getElementById('myButton').addEventListener('click', showmorepics);

function searchPixabay() {
    const searchQuery = document.getElementById('search').value.trim();

    if (searchQuery) {
        const queries = searchQuery.split(' ');

        clearResults();

        queries.forEach(query => {
            const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo`;
            fetchImages(url, 'results');
        });
    }
}

function clearResults() {
    const results = document.getElementById('results');
    results.innerHTML = '';

    hideElement('myButton');
    hideElement('myhead2');
}

function fetchImages(url, targetElementId) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const results = document.getElementById(targetElementId);
            results.innerHTML = '';

            data.hits.forEach(image => {
                const cardContainer = createCard(image);
                results.appendChild(cardContainer);
            });

            showElement('myButton');
            showElement('myhead2');
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function createCard(image) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card');

    const img = document.createElement('img');
    img.src = image.webformatURL;

    const title = document.createElement('h3');
    title.textContent = image.tags;

    const author = document.createElement('p');
    author.textContent = `By ${image.user}`;

    cardContainer.appendChild(img);
    cardContainer.appendChild(title);
    cardContainer.appendChild(author);

    return cardContainer;
}

function openModal(title, description) {
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modal = document.getElementById('myModal');

    modalTitle.innerText = title;
    modalDescription.innerText = description;

    showElement('modal');
}

function closeModal() {
    hideElement('modal');
}

function showElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'block';
    }
}

function hideElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'none';
    }
}

function showmorepics() {
    const searchQuery = document.getElementById('search').value.trim();
    const url = `https://pixabay.com/api/?key=${apiKey}&q=dogs&image_type=photo`;

    fetchImages(url, 'Morepics');
}
