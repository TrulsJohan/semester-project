import { getPostId } from "../../api/post/read";
import { onPlaceBid } from "../../ui/post/createBids";
import { logoutButton } from "../../global/logout";
import { menuToggle } from "../../global/menu";

const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");

async function renderPostId() {
    try {
        const postId = localStorage.getItem("selectedPostId");

        const data = await getPostId(postId, true, true);
        if (!data) {
            throw new Error(`Error: ${response.status}`);
        }

        const postIdData = data.data;
        const postIdContainer = document.getElementById("postIdContainer");
        postIdContainer.innerHTML = "";

        // Create carousel for multiple images
        const mediaUrls = postIdData.media || [];
        const carouselContainer = document.createElement("div");
        carouselContainer.id = "carouselContainer";
        carouselContainer.style.position = "relative";
        carouselContainer.style.width = "200px";
        carouselContainer.style.height = "200px";
        carouselContainer.style.overflow = "hidden";

        if (mediaUrls.length > 0) {
            const imgElement = document.createElement("img");
            imgElement.src = mediaUrls[0].url;
            imgElement.alt = mediaUrls[0].alt || "Post Image";
            imgElement.style.width = "100%";
            imgElement.style.height = "100%";
            imgElement.style.objectFit = "cover";
            imgElement.id = "carouselImage";
            carouselContainer.appendChild(imgElement);

            let currentIndex = 0;

            // Previous Button
            const prevButton = document.createElement("button");
            prevButton.textContent = "Previous";
            prevButton.style.position = "absolute";
            prevButton.style.left = "10px";
            prevButton.style.top = "50%";
            prevButton.style.transform = "translateY(-50%)";
            prevButton.style.zIndex = "10";
            prevButton.addEventListener("click", () => {
                currentIndex = (currentIndex - 1 + mediaUrls.length) % mediaUrls.length;
                imgElement.src = mediaUrls[currentIndex].url;
                imgElement.alt = mediaUrls[currentIndex].alt || "Post Image";
            });
            carouselContainer.appendChild(prevButton);

            // Next Button
            const nextButton = document.createElement("button");
            nextButton.textContent = "Next";
            nextButton.style.position = "absolute";
            nextButton.style.right = "10px";
            nextButton.style.top = "50%";
            nextButton.style.transform = "translateY(-50%)";
            nextButton.style.zIndex = "10";
            nextButton.addEventListener("click", () => {
                currentIndex = (currentIndex + 1) % mediaUrls.length;
                imgElement.src = mediaUrls[currentIndex].url;
                imgElement.alt = mediaUrls[currentIndex].alt || "Post Image";
            });
            carouselContainer.appendChild(nextButton);
        } else {
            const placeholderImage = document.createElement("img");
            placeholderImage.src = "https://upload.wikimedia.org/wikipedia/commons/f/f9/No-image-available.jpg";
            placeholderImage.alt = "No Image Available";
            placeholderImage.style.width = "100%";
            placeholderImage.style.height = "100%";
            placeholderImage.style.objectFit = "cover";
            carouselContainer.appendChild(placeholderImage);
        }

        postIdContainer.appendChild(carouselContainer);

        // Render Post Details
        const tags = postIdData.tags && postIdData.tags.length > 0 ? `<p class="text-xs text-gray-500 mt-1">${postIdData.tags.join(", ")}</p>` : "";

        const postDetails = document.createElement("div");
        postDetails.className = "post";
        postDetails.dataset.id = postIdData.id;
        postDetails.innerHTML = `
            <h1>${postIdData.title}</h1>
            <p>${postIdData.description}</p>
            ${tags}
        `;
        postIdContainer.appendChild(postDetails);

        // Bid Section
        const bidSection = document.createElement("div");
        bidSection.innerHTML = `
            <label for="bidsInput">Enter your bid amount:</label>
            <input type="number" id="bidsInput" name="bidsInput" min="1" required>
            <button id="submitButton">Place Bid</button>
        `;
        postIdContainer.appendChild(bidSection);

        const submitButton = document.getElementById("submitButton");
        submitButton.addEventListener("click", () => {
            const bidAmount = document.getElementById("bidsInput").value;
            onPlaceBid(bidAmount);
        });

    } catch (error) {
        console.error("Error fetching or displaying posts:", error);
    }
}

openMenu.addEventListener("click", () => menuToggle("open"));
closeMenu.addEventListener("click", () => menuToggle("close"));

logoutButton();
renderPostId();
