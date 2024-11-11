// Array of images with additional information
const imageCollection = [
    { small: 'flowers-pink-small.jpg', large: 'flowers-pink-large.jpg', title: 'Pink Flowers', details: 'A lovely view of pink flowers', place: 'Münster, Germany' },
    { small: 'flowers-purple-small.jpg', large: 'flowers-purple-large.jpg', title: 'Purple Flowers', details: 'Purple flowers, beautifully fragrant', place: 'Münster, Germany' },
    { small: 'flowers-red-small.jpg', large: 'flowers-red-large.jpg', title: 'Red Flowers', details: 'Bright red flowers soaking the sun', place: 'Dülmen, Germany' },
    { small: 'flowers-white-small.jpg', large: 'flowers-white-large.jpg', title: 'White Flowers', details: 'Elegant white flowers in bloom', place: 'Münster, Germany' },
    { small: 'flowers-yellow-small.jpg', large: 'flowers-yellow-large.jpg', title: 'Yellow Flowers', details: 'Sunny yellow flowers shining', place: 'Dülmen, Germany' }
];

let activeImageIndex = 0;

// Initialize event listeners on load
document.addEventListener("DOMContentLoaded", () => {
    setupSearch();
    setupSlideshow();
    setupClearSearch();
    displayThumbnails(imageCollection);
    updateMainImage(activeImageIndex);
});

// Setup search functionality
function setupSearch() {
    const searchField = document.getElementById('search-input');
    searchField.addEventListener('input', () => {
        const searchTerm = searchField.value.toLowerCase();
        const filteredImages = imageCollection.filter(img =>
            img.title.toLowerCase().includes(searchTerm) || img.details.toLowerCase().includes(searchTerm)
        );
        displayThumbnails(filteredImages);
    });
}

// Setup slideshow functionality
function setupSlideshow() {
    document.getElementById('next').addEventListener('click', () => {
        activeImageIndex = (activeImageIndex + 1) % imageCollection.length;
        updateMainImage(activeImageIndex);
    });

    document.getElementById('prev').addEventListener('click', () => {
        activeImageIndex = (activeImageIndex - 1 + imageCollection.length) % imageCollection.length;
        updateMainImage(activeImageIndex);
    });
}

// Setup clear search functionality
function setupClearSearch() {
    const clearButton = document.getElementById('clear-search');
    clearButton.addEventListener('click', () => {
        document.getElementById('search-input').value = '';
        displayThumbnails(imageCollection);
    });
}

// Display thumbnails dynamically
function displayThumbnails(images) {
    const thumbnailContainer = document.getElementById('thumbnail-list');
    thumbnailContainer.innerHTML = ''; // Clear previous thumbnails

    images.forEach((img, idx) => {
        const thumbnail = document.createElement('li');
        thumbnail.classList.add('thumbnail-item');
        if (idx === activeImageIndex) thumbnail.classList.add('highlighted'); // Highlight active thumbnail

        const imgElement = document.createElement('img');
        imgElement.src = `images/${img.small}`;
        imgElement.alt = img.title;
        thumbnail.appendChild(imgElement);

        const imgTitle = document.createElement('p');
        imgTitle.textContent = img.title;
        thumbnail.appendChild(imgTitle);

        thumbnail.addEventListener('click', () => updateMainImage(idx));
        thumbnailContainer.appendChild(thumbnail);
    });
}

// Update the main featured image
function updateMainImage(index) {
    activeImageIndex = index;
    const mainImage = document.querySelector('figure img');
    const mainCaption = document.querySelector('figcaption');

    // Fade-in effect
    mainImage.style.opacity = 0;
    setTimeout(() => {
        mainImage.src = `images/${imageCollection[activeImageIndex].large}`;
        mainImage.style.opacity = 1;
    }, 300);

    mainCaption.innerHTML = `
        <strong>${imageCollection[activeImageIndex].title}</strong><br/>
        ${imageCollection[activeImageIndex].details}<br/>
        <em>Location: ${imageCollection[activeImageIndex].place}</em>
    `;
    displayThumbnails(imageCollection); // Refresh to update highlighted thumbnail
}
