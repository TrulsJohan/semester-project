import { getAllPosts } from '../../api/post/read';
import { logoutButton } from '../../global/logout';
import { menuToggle } from '../../global/menu';
import { navProfileImage } from '../../global/nav';
import { initializeCountdown } from '../../global/counter';

const searchBar = document.getElementById('searchBar');
const paginationContainer = document.getElementById('paginationContainer');
const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');
const paginationButtons = document.getElementById('paginationButtons');
let searchDebounceTimer;

async function displayPaginatedPosts(page = 1, limit = 10, searchQuery = '') {
    try {
        const data = await getAllPosts(page, limit);
        if (!data) {
            alert(`Could not fetch data`);
        }

        displayPaginatedPosts.currentPage = page;
        paginationContainer.innerHTML = '';

        paginationContainer.innerHTML = data.data
            .filter((post) => {
                if (searchQuery) {
                    return (
                        post.title
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                        post.description
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                    );
                }
                return true;
            })
            .map((post) => {
                const mediaUrl =
                    post.media && post.media.length > 0
                        ? post.media[0].url
                        : 'https://upload.wikimedia.org/wikipedia/commons/f/f9/No-image-available.jpg';
                const mediaAlt =
                    post.media && post.media.length > 0
                        ? post.media[0].alt || 'Post Image'
                        : 'No Image Available';
                const bidsCount =
                    post._count && post._count.bids ? post._count.bids : 0;

                let highestBid = 'No bids yet';
                if (post.bids && post.bids.length > 0) {
                    highestBid = Math.max(
                        ...post.bids.map((bid) => bid.amount)
                    );
                }

                return `
                    <div data-id="${post.id}" 
                         class="post flex flex-col w-full overflow-hidden gap-4 px-4 py-4 border border-slate-300 rounded-lg shadow-lg hover:shadow-2xl transition cursor-pointer">
                        <img src="${mediaUrl}" 
                             alt="${mediaAlt}" 
                             class="w-full h-64 object-cover rounded-lg border border-slate-200">
                        <div class="flex flex-col gap-2">
                            <h1 class="text-xl font-bold text-slate-800">${post.title}</h1>
                            <div class="text-slate-600">
                                <p class="text-sm font-medium">Ends:
                                    <span class="ends-at font-semibold" data-ends-at="${post.endsAt}"></span>
                                </p>
                                <p class="text-sm font-medium">Bids:
                                    <span class="font-semibold">${bidsCount}</span>
                                </p>
                                <p class="text-sm font-medium">Current Bid:
                                    <span class="font-semibold">${highestBid}</span>
                                </p>
                            </div>
                        </div>
                        <button class="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold text-lg py-2 rounded-lg transition">
                            Place Bid
                        </button>
                    </div>
                `;
            })
            .join('');

        const countdownElements = document.querySelectorAll('.ends-at');
        initializeCountdown(countdownElements);

        const postElements = paginationContainer.querySelectorAll('.post');
        postElements.forEach((card) => {
            card.addEventListener('click', () => {
                const postId = card.getAttribute('data-id');
                localStorage.setItem('selectedPostId', postId);
                window.location.href = '/post/post/';
            });
        });

        paginationButtons.innerHTML = '';
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add(
            'flex',
            'flex-row',
            'w-full',
            'justify-center',
            'items-center',
            'gap-4',
            'mt-4'
        );
        paginationButtons.appendChild(buttonContainer);

        if (!data.meta.isFirstPage) {
            const prevButton = document.createElement('button');
            prevButton.classList.add(
                'flex',
                'items-center',
                'justify-center',
                'w-36',
                'gap-2',
                'px-4',
                'py-2',
                'rounded',
                'bg-brand-500',
                'text-white',
                'font-semibold',
                'hover:bg-brand-600',
                'transition'
            );
            prevButton.appendChild(document.createTextNode('Previous'));
            prevButton.addEventListener('click', () =>
                displayPaginatedPosts(page - 1, limit, searchQuery)
            );
            buttonContainer.appendChild(prevButton);
        }

        if (!data.meta.isLastPage) {
            const nextButton = document.createElement('button');
            nextButton.classList.add(
                'flex',
                'items-center',
                'justify-center',
                'w-36',
                'gap-2',
                'px-4',
                'py-2',
                'rounded',
                'bg-brand-500',
                'text-white',
                'font-semibold',
                'hover:bg-brand-600',
                'transition'
            );
            nextButton.appendChild(document.createTextNode('Next'));
            nextButton.addEventListener('click', () =>
                displayPaginatedPosts(page + 1, limit, searchQuery)
            );
            buttonContainer.appendChild(nextButton);
        }
    } catch (error) {
        alert('Failed to display posts: ' + error.message);
    }
}

displayPaginatedPosts.currentPage = 1;

searchBar.addEventListener('input', (event) => {
    const query = event.target.value;
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
        displayPaginatedPosts(1, 10, query);
    }, 300);
});

openMenu.addEventListener('click', () => menuToggle('open'));
closeMenu.addEventListener('click', () => menuToggle('close'));

displayPaginatedPosts(1);
logoutButton();
navProfileImage();
