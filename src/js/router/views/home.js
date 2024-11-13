import { getAllPosts } from "../../api/post/read";

async function displayPaginatedPosts(page = 1, limit = 10) {
    try {
        const data = await getAllPosts(page, limit);

        console.log("Posts on current page:", data.data);
        console.log("Pagination meta:", data.meta);

        displayPaginatedPosts.currentPage = page;

        const paginationContainer = document.getElementById("paginationContainer");
        
        paginationContainer.innerHTML = data.data.map((post) => {
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
            prevButton.addEventListener("click", () => displayPaginatedPosts(page - 1, limit));
            paginationContainer.appendChild(prevButton);
        }

        // Next Page Button
        if (!data.meta.isLastPage) {
            const nextButton = document.createElement("button");
            nextButton.textContent = "Next";
            nextButton.addEventListener("click", () => displayPaginatedPosts(page + 1, limit));
            paginationContainer.appendChild(nextButton);
        }

    } catch (error) {
        console.error("Error fetching or displaying posts:", error);
    }
}

displayPaginatedPosts.currentPage = 1;

displayPaginatedPosts(1);
