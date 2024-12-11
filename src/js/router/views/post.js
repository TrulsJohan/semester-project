import { getPostId } from "../../api/post/read";
import { onPlaceBid } from "../../ui/post/createBids";

async function renderPostId() {
    try {
        const postId = localStorage.getItem("selectedPostId");

        const data = await getPostId(postId, true, true);
        if (!data) {
            throw new Error(`Error: ${response.status}`);
        }

        const postIdData = data.data;
        const postIdSeller = postIdData.seller;
        const postIdBids = postIdData.bids;
        console.log(postIdBids);
        console.log(postIdSeller);
        console.log(postIdData);

        const postIdContainer = document.getElementById("postIdContainer");
        postIdContainer.innerHTML = "";

        const mediaUrl = postIdData.media && postIdData.media.length > 0 ? postIdData.media[0].url : "https://upload.wikimedia.org/wikipedia/commons/f/f9/No-image-available.jpg";
        const mediaAlt = postIdData.media && postIdData.media.length > 0 ? postIdData.media[0].alt : "Post Image";
        const tags = postIdData.tags && postIdData.tags.length > 0 ? `<p class="text-xs text-gray-500 mt-1">${postIdData.tags.join(", ")}</p>` : "";

        postIdContainer.innerHTML = `
            <div class="post" data-id="${postIdData.id}">
                <h1>${postIdData.title}</h1>
                <img src="${mediaUrl}" alt="${mediaAlt}" style="width: 100px; height: 100px;">
                <p>${postIdData.description}</p>
                ${tags}
            </div>
            <label for="bidsInput">Enter your bid amount:</label>
            <input type="number" id="bidsInput" name="bidsInput" min="1" required>
            <button id="submitButton">Place Bid</button>
        `;

        const submitButton = document.getElementById("submitButton");
        submitButton.addEventListener("click", ()=> {
            const bidAmount = document.getElementById("bidsInput").value;
            onPlaceBid(bidAmount);
        });

    } catch (error) {
        console.error("Error fetching or displaying posts:", error);
    }
}

renderPostId()
