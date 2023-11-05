const apiKey = '35829162-4638e1e58dac695ba18841589';
const predefinedTags = ["Background", "Wallpaper", "Natural", "Animals", "City", "Travel"];

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
    document.getElementById('results').innerHTML = '';
    document.getElementById('myButton').style.display = 'none';
    document.getElementById('myhead2').style.display = 'none';
}

function createImageCard(image) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card');
    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;
    const title = document.createElement('h3');
    title.textContent = image.tags;
    const author = document.createElement('p');
    author.textContent = `By ${image.user}`;
    const favoriteIcon = document.createElement('i');
    favoriteIcon.classList.add('far', 'fa-heart', 'favorite');
    favoriteIcon.addEventListener('click', () => toggleFavorite(favoriteIcon));
    cardContainer.appendChild(favoriteIcon);
    cardContainer.appendChild(img);
    cardContainer.appendChild(title);
    cardContainer.appendChild(author);
    cardContainer.addEventListener('mouseenter', () => {
        cardContainer.style.transform = 'scale(1.1)';
    });
    cardContainer.addEventListener('mouseleave', () => {
        cardContainer.style.transform = 'scale(1.0)';
    });
    return cardContainer;
}

function fetchImages(url, targetElementId) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const results = document.getElementById(targetElementId);
            results.innerHTML = '';
            data.hits.forEach(image => {
                results.appendChild(createImageCard(image));
            });
            document.getElementById('myButton').style.display = 'block';
            document.getElementById('myhead2').style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function toggleFavorite(favoriteIcon) {
    if (favoriteIcon.classList.contains('favorited')) {
        favoriteIcon.classList.remove('favorited');
        showPopup('Image removed from favorites!');
    } else {
        favoriteIcon.classList.add('favorited');
        showPopup('Image added to favorites!');
    }
}

function showPopup(message) {
    const popup = document.createElement('div');
    popup.textContent = message;
    popup.style.position = 'fixed';
    popup.style.top = '10px';
    popup.style.right = '10px';
    popup.style.background = 'rgba(0, 0, 0, 0.7)';
    popup.style.color = '#fff';
    popup.style.padding = '10px';
    popup.style.borderRadius = '5px';
    popup.style.zIndex = '999';
    document.body.appendChild(popup);
    setTimeout(() => {
        document.body.removeChild(popup);
    }, 3000);
}

function showmorepics() {
    const searchQuery = document.getElementById('search').value.trim();
    const url = `https://pixabay.com/api/?key=35829162-4638e1e58dac695ba18841589&q=dogs&image_type=photo`;
    fetchImages(url, 'Morepics');
}

function populatePredefinedTags() {
    const select = document.getElementById('tags');
    predefinedTags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.text = tag;
        select.insertBefore(option, select.firstChild);
    });
}

window.addEventListener('load', populatePredefinedTags);
document.getElementById('tags').addEventListener