import { getPostId } from '../../api/post/read';
import { onPlaceBid } from '../../ui/post/bids.js';
import { logoutButton } from '../../global/logout';
import { menuToggle } from '../../global/menu';
import { onDeletePost } from '../../ui/post/delete.js';
import { navProfileImage } from '../../global/nav';
import { initializeCountdown } from '../../global/counter.js';

const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');

async function renderPostId() {
    try {
        const postId = localStorage.getItem('selectedPostId');
        const loggedInUser = localStorage.getItem('user');

        if (!postId) throw new Error('No post ID found in localStorage.');

        const data = await getPostId(postId, true, true);
        if (!data) throw new Error('Error fetching post data');

        const { media, title, description, tags, seller, bids, created, endsAt } = data.data;
        const postIdContainer = document.getElementById('postIdContainer');
        const highestBid = bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : 0;
        postIdContainer.innerHTML = '';

        const carouselContainer = document.createElement('div');
        carouselContainer.className = 'flex justify-center align-middle w-full bg-slate-200 rounded-lg border bg-gray-400 shadow-md';
        const carousel = document.createElement('div');
        carousel.className = 'relative w-full max-w-md mx-auto aspect-square overflow-hidden rounded-lg border bg-gray-400 shadow-md sm:max-w-lg md:max-w-2xl';
        if (media.length > 0) {
            let currentIndex = 0;
            const img = document.createElement('img');
            img.src = media[0].url;
            img.alt = media[0].alt || 'Post Image';
            img.className = 'w-full h-full object-cover transition-transform duration-300 ease-in-out';
            carousel.appendChild(img);

            const prevButton = document.createElement('button');
            prevButton.className = 'absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75';
            prevButton.textContent = '<';
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + media.length) % media.length;
                img.src = media[currentIndex].url;
            });
            carousel.appendChild(prevButton);

            const nextButton = document.createElement('button');
            nextButton.className = 'absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75';
            nextButton.textContent = '>';
            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % media.length;
                img.src = media[currentIndex].url;
            });
            carousel.appendChild(nextButton);
        } else {
            const placeholder = document.createElement('img');
            placeholder.src = 'https://upload.wikimedia.org/wikipedia/commons/f/f9/No-image-available.jpg';
            placeholder.alt = 'No Image Available';
            placeholder.className = 'w-full h-full object-cover';
            carousel.appendChild(placeholder);
        }
        carouselContainer.appendChild(carousel);
        postIdContainer.appendChild(carouselContainer);

        const createdDate = new Date(created);
        const createdSection = document.createElement('p');
        createdSection.className = 'text-sm text-gray-500 mt-4';
        createdSection.textContent = `Created on: ${createdDate.toLocaleDateString()} at ${createdDate.toLocaleTimeString()}`;
        postIdContainer.appendChild(createdSection);

        const titleSection = document.createElement('h1');
        titleSection.className = 'text-2xl font-bold text-gray-800 mt-2 sm:text-3xl';
        titleSection.textContent = title;
        postIdContainer.appendChild(titleSection);

        const countdownTimer = document.createElement('p');
        countdownTimer.className = 'text-md font-bold text-gray-500 mt-2';
        countdownTimer.dataset.endsAt = endsAt;
        postIdContainer.appendChild(countdownTimer);

        initializeCountdown([countdownTimer]);

        const highestBidSection = document.createElement('div');
        highestBidSection.className = 'mt-8 mb-4';
        highestBidSection.innerHTML = `<p class="font-semibold text-lg text-gray-800">Current bid: $${highestBid}</p>`;
        postIdContainer.appendChild(highestBidSection);

        if (loggedInUser && seller.name !== loggedInUser) {
            const bidInputSection = document.createElement('div');
            bidInputSection.className = 'space-y-4 mb-10';
            bidInputSection.innerHTML = `
                <input type="number" id="bidsInput" name="bidsInput" min="1" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-brand-300 focus:border-brand-300 sm:text-sm p-2">
                <button id="submitButton" class="w-full py-2 bg-brand-300 text-white rounded-md hover:bg-brand-400 transition-colors">Place Bid</button>
            `;
            postIdContainer.appendChild(bidInputSection);

            document
                .getElementById('submitButton')
                .addEventListener('click', () => {
                    const bidAmount =
                        document.getElementById('bidsInput').value;
                    onPlaceBid(bidAmount);
                });
        }

        const descriptionSection = document.createElement('p');
        descriptionSection.className = 'text-gray-700 mt-4 leading-relaxed sm:text-lg';
        descriptionSection.textContent = description;
        postIdContainer.appendChild(descriptionSection);

        if (tags?.length) {
            const tagsSection = document.createElement('p');
            tagsSection.className = 'text-sm text-gray-500 mt-2 mb-10';
            tagsSection.textContent = `Tags: ${tags.join(', ')}`;
            postIdContainer.appendChild(tagsSection);
        }

        const sellerSection = document.createElement('details');
        sellerSection.className = 'border rounded-lg p-4 mt-4 bg-gray-50 shadow-md sm:p-6';
        sellerSection.innerHTML = `
            <summary class="font-semibold text-lg cursor-pointer text-gray-800">Seller Info</summary>
            <div class="mt-2 space-y-2">
                <p><strong>Name:</strong> ${seller.name}</p>
                <p><strong>Email:</strong> ${seller.email}</p>
                <p><strong>Bio:</strong> ${seller.bio}</p>
            </div>
        `;
        postIdContainer.appendChild(sellerSection);

        if (loggedInUser) {
            const bidsSection = document.createElement('details');
            bidsSection.className = 'border rounded-lg p-4 mt-4 bg-gray-50 shadow-md sm:p-6';
            bidsSection.innerHTML = `
                <summary class="font-semibold text-lg cursor-pointer text-gray-800">Bids (${bids.length})</summary>
                <ul class="mt-2 space-y-2">${bids.map((bid) => `
                    <li class="flex justify-between">
                        <span class="text-gray-600">${bid.bidder.name}</span>
                        <span class="text-gray-800 font-medium">$${bid.amount}</span>
                    </li>`).join('')}
                </ul>
            `;
            postIdContainer.appendChild(bidsSection);
        }

        if (loggedInUser && seller.name === loggedInUser) {
            const deleteButton = document.createElement('button');
            deleteButton.id = 'deletePostButton';
            deleteButton.className = 'w-full mt-10 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors';
            deleteButton.textContent = 'Delete Post';
            deleteButton.addEventListener('click', () => onDeletePost(postId));
            postIdContainer.appendChild(deleteButton);
        }
    } catch (error) {
        alert('Failed to display post: ' + error.message);
    }
}

openMenu.addEventListener('click', () => menuToggle('open'));
closeMenu.addEventListener('click', () => menuToggle('close'));

logoutButton();
renderPostId();
navProfileImage();
