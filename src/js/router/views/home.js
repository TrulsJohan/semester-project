import { getAllPosts } from "../../api/post/read";
import { logoutButton } from "../../global/logout";
import { menuToggle } from "../../global/menu";

const searchBar = document.getElementById("searchBar");
const paginationContainer = document.getElementById("paginationContainer");
const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
let searchDebounceTimer;

async function displayPaginatedPosts(page = 1, limit = 10, searchQuery = "") {
    try {
        const data = await getAllPosts(page, limit);
        console.log(data);

        displayPaginatedPosts.currentPage = page;
        paginationContainer.innerHTML = "";

        paginationContainer.innerHTML = data.data
            .filter(post => {
                if (searchQuery) {
                    return post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.description.toLowerCase().includes(searchQuery.toLowerCase());
                }
                return true;
            })
            .map((post) => {
                const mediaUrl = post.media && post.media.length > 0 ? post.media[0].url : "https://upload.wikimedia.org/wikipedia/commons/f/f9/No-image-available.jpg";
                const mediaAlt = post.media && post.media.length > 0 ? post.media[0].alt || "Post Image" : "No Image Available";
                const bidsCount = post._count && post._count.bids ? post._count.bids : 0;
            
                return `
                    <div data-id="${post.id}" class="post flex flex-col w-full gap-4 px-2 py-2 border border-slate-500 rounded-lg">
                        <img src="${mediaUrl}" alt="${mediaAlt}" class="w-full h-[256px] object-cover rounded-lg border border-slate-500">
                        <div class="flex flex-col gap-2">
                            <h1 class="w-auto font-bold text-xl">${post.title}</h1>
                            <div>
                                <p class="font-medium text-base">Ends:
                                    <span class="ends-at" data-ends-at="${post.endsAt}"></span>
                                </p>
                                <p class="font-medium text-base">Bids:
                                    <span>${bidsCount}</span>
                                </p>
                            </div>
                        </div>
                        <button class="w-full bg-brand-300 h-10 rounded-lg text-lg text-white">
                            Place Bid
                        </button>
                    </div>
                `;
            }).join("");

        // Set up countdown timers for each post
        const countdownElements = document.querySelectorAll(".ends-at");
        countdownElements.forEach(element => {
            const endsAt = new Date(element.dataset.endsAt);
            const updateCountdown = () => {
                const timeLeft = endsAt - new Date();
                if (timeLeft <= 0) {
                    element.textContent = "Auction ended";
                } else {
                    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                    element.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
                }
            };
            updateCountdown();
            setInterval(updateCountdown, 1000);
        });

        paginationContainer.querySelectorAll(".post").forEach((card) => {
            card.addEventListener("click", () => {
                const postId = card.getAttribute("data-id");
                localStorage.setItem("selectedPostId", postId);
                window.location.href = "/post/post.html";
            });
        });

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("flex", "flex-row", "w-full", "justify-center", "items-center");
        paginationContainer.appendChild(buttonContainer);

        if (!data.meta.isFirstPage) {
            const prevButton = document.createElement("button");
            prevButton.classList.add("flex", "items-center", "gap-2", "p-2", "rounded", "bg-brand-300", "text-slate-100");
            const prevImage = document.createElement("img");
            prevImage.src = "/assets/images/arrow-left.svg";
            prevImage.alt = "Previous";
            prevImage.classList.add("w-4", "h-4");
            prevButton.appendChild(prevImage);
            prevButton.appendChild(document.createTextNode("Previous"));
            prevButton.addEventListener("click", () => displayPaginatedPosts(page - 1, limit, searchQuery));
            buttonContainer.appendChild(prevButton);
        }

        if (!data.meta.isLastPage) {
            const nextButton = document.createElement("button");
            nextButton.classList.add("flex", "items-center", "gap-2", "p-2", "rounded", "bg-brand-300", "text-slate-100");
            const nextImage = document.createElement("img");
            nextImage.src = "/assets/images/arrow-right.svg";
            nextImage.alt = "Next";
            nextImage.classList.add("w-4", "h-4");
            nextButton.appendChild(document.createTextNode("Next"));
            nextButton.appendChild(nextImage);
            nextButton.addEventListener("click", () => displayPaginatedPosts(page + 1, limit, searchQuery));
            buttonContainer.appendChild(nextButton);
        }
    } catch (error) {
        console.error("Error fetching or displaying posts:", error);
    }
}

displayPaginatedPosts.currentPage = 1;

searchBar.addEventListener("input", (event) => {
    const query = event.target.value;
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
        displayPaginatedPosts(1, 10, query);
    }, 300);
});

openMenu.addEventListener("click", () => menuToggle("open"));
closeMenu.addEventListener("click", () => menuToggle("close"));

displayPaginatedPosts(1);
logoutButton();

