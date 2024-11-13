import { getAllPosts } from "../../api/post/read";

const searchBar = document.getElementById("searchBar");
const paginationContainer = document.getElementById("paginationContainer");
let searchDebounceTimer;

async function displayPaginatedPosts(page = 1, limit = 10, searchQuery = "") {
    try {
        const data = await getAllPosts(page, limit);

        console.log("Posts on current page:", data.data);
        console.log("Pagination meta:", data.meta);

        displayPaginatedPosts.currentPage = page;
        
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
                const mediaAlt = post.media && post.media.length > 0 ? post.media[0].alt : "Post Image";
                const tags = post.tags && post.tags.length > 0 ? `<p class="text-xs text-gray-500 mt-1">${post.tags.join(", ")}</p>` : "";

                return `
                    <div class="post">
                        <h1>${post.title}</h1>
                        <img src="${mediaUrl}" alt="${mediaAlt}" style="width: 100px; height: 100px;">
                        <p>${post.description}</p>
                        ${tags}
                    </div>
                `;
            }).join("");

        if (!data.meta.isFirstPage) {
            const prevButton = document.createElement("button");
            prevButton.textContent = "Previous";
            prevButton.addEventListener("click", () => displayPaginatedPosts(page - 1, limit, searchQuery));
            paginationContainer.appendChild(prevButton);
        }

        if (!data.meta.isLastPage) {
            const nextButton = document.createElement("button");
            nextButton.textContent = "Next";
            nextButton.addEventListener("click", () => displayPaginatedPosts(page + 1, limit, searchQuery));
            paginationContainer.appendChild(nextButton);
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

displayPaginatedPosts(1);
