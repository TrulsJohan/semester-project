import { getPostId } from "../../api/post/read";
import { onPlaceBid } from "../../ui/post/createBids";
import { logoutButton } from "../../global/logout";
import { menuToggle } from "../../global/menu";
import { onDeletePost } from "../../ui/post/deletePost.js";

const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");

async function renderPostId() {
  try {
    const postId = localStorage.getItem("selectedPostId");
    const loggedInUser = localStorage.getItem("user");

    if (!postId) throw new Error("No post ID found in localStorage.");

    const data = await getPostId(postId, true, true);
    if (!data) throw new Error("Error fetching post data");
    console.log(data);

    const { media, title, description, tags, seller, bids, created, endsAt } = data.data;
    const postIdContainer = document.getElementById("postIdContainer");
    const highestBid = bids.length > 0 ? Math.max(...bids.map(bid => bid.amount)) : 0;
    postIdContainer.innerHTML = "";

    // Media Carousel
    const carousel = document.createElement("div");
    carousel.className = "relative w-full max-w-md mx-auto aspect-square overflow-hidden rounded-lg border bg-gray-200";
    if (media.length > 0) {
      let currentIndex = 0;
      const img = document.createElement("img");
      img.src = media[0].url;
      img.alt = media[0].alt || "Post Image";
      img.className = "w-full h-full object-cover";
      carousel.appendChild(img);

      // Navigation Buttons
      const prevButton = document.createElement("button");
      prevButton.className = "absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full";
      prevButton.textContent = "<";
      prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + media.length) % media.length;
        img.src = media[currentIndex].url;
      });
      carousel.appendChild(prevButton);

      const nextButton = document.createElement("button");
      nextButton.className = "absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full";
      nextButton.textContent = ">";
      nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % media.length;
        img.src = media[currentIndex].url;
      });
      carousel.appendChild(nextButton);
    } else {
      const placeholder = document.createElement("img");
      placeholder.src = "https://upload.wikimedia.org/wikipedia/commons/f/f9/No-image-available.jpg";
      placeholder.alt = "No Image Available";
      placeholder.className = "w-full h-full object-cover";
      carousel.appendChild(placeholder);
    }
    postIdContainer.appendChild(carousel);

    // Created At
    const createdDate = new Date(created);
    const createdSection = document.createElement("p");
    createdSection.className = "text-sm text-gray-500";
    createdSection.textContent = `Created on: ${createdDate.toLocaleDateString()} at ${createdDate.toLocaleTimeString()}`;
    postIdContainer.appendChild(createdSection);

    // Title
    const titleSection = document.createElement("h1");
    titleSection.className = "text-2xl font-bold mt-2";
    titleSection.textContent = title;
    postIdContainer.appendChild(titleSection);

    // Ends At
    const endsAtDate = new Date(endsAt);
    const countdownTimer = document.createElement("p");
    countdownTimer.className = "text-sm text-gray-500";
    countdownTimer.textContent = `Ends in: ${getCountdown(endsAtDate)}`;
    setInterval(() => {
      countdownTimer.textContent = `Ends in: ${getCountdown(endsAtDate)}`;
    }, 1000);
    postIdContainer.appendChild(countdownTimer);

    // Highest Bid
    const highestBidSection = document.createElement("div");
    highestBidSection.className = "mt-6";
    highestBidSection.innerHTML = `
      <p class="font-semibold text-lg">Highest Bid: $${highestBid}</p>
    `;
    postIdContainer.appendChild(highestBidSection);

    // Bid Input and Bids Section (Visible only to logged-in users who are not the seller)
    if (loggedInUser && seller.name !== loggedInUser) {
      const bidInputSection = document.createElement("div");
      bidInputSection.className = "mt-6 space-y-4";
      bidInputSection.innerHTML = `
        <label for="bidsInput" class="block text-sm font-medium text-gray-700">Enter your bid amount:</label>
        <input type="number" id="bidsInput" name="bidsInput" min="1" class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-300 focus:border-brand-300 sm:text-sm">
        <button id="submitButton" class="w-full py-2 bg-brand-300 text-white rounded-md hover:bg-brand-400">Place Bid</button>
      `;
      postIdContainer.appendChild(bidInputSection);

      document.getElementById("submitButton").addEventListener("click", () => {
        const bidAmount = document.getElementById("bidsInput").value;
        onPlaceBid(bidAmount);
      });
    }

    // Description
    const descriptionSection = document.createElement("p");
    descriptionSection.className = "text-gray-700 mt-4";
    descriptionSection.textContent = description;
    postIdContainer.appendChild(descriptionSection);

    // Tags
    if (tags?.length) {
      const tagsSection = document.createElement("p");
      tagsSection.className = "text-sm text-gray-500 mt-2";
      tagsSection.textContent = `Tags: ${tags.join(", ")}`;
      postIdContainer.appendChild(tagsSection);
    }

    // Seller Info
    const sellerSection = document.createElement("details");
    sellerSection.className = "border rounded-lg p-4 mt-4";
    sellerSection.innerHTML = `
      <summary class="font-semibold text-lg cursor-pointer">Seller Info</summary>
      <div class="mt-2 space-y-2">
        <p><strong>Name:</strong> ${seller.name}</p>
        <p><strong>Email:</strong> ${seller.email}</p>
        <p><strong>Bio:</strong> ${seller.bio}</p>
      </div>
    `;
    postIdContainer.appendChild(sellerSection);

    // Bids Section
    if (loggedInUser) {
      const bidsSection = document.createElement("details");
      bidsSection.className = "border rounded-lg p-4 mt-4";
      bidsSection.innerHTML = `
        <summary class="font-semibold text-lg cursor-pointer">Bids (${bids.length})</summary>
        <ul class="mt-2 space-y-2">
          ${bids.map(bid => `<li class="flex justify-between">
            <span>${bid.bidder.name}</span>
            <span>$${bid.amount}</span>
          </li>`).join("")}
        </ul>
      `;
      postIdContainer.appendChild(bidsSection);
    }

    // Show Delete Button if logged-in user is the seller
    if (loggedInUser && seller.name === loggedInUser) {
      const deleteButton = document.createElement("button");
      deleteButton.id = "deletePostButton";
      deleteButton.className = "w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600";
      deleteButton.textContent = "Delete Post";
      deleteButton.addEventListener("click", () => onDeletePost(postId));
      postIdContainer.appendChild(deleteButton);
    }

  } catch (error) {
    console.error("Error fetching or displaying posts:", error);
  }
}

function getCountdown(endsAtDate) {
  const now = new Date();
  const timeLeft = endsAtDate - now;
  if (timeLeft <= 0) return "Auction ended";
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

openMenu.addEventListener("click", () => menuToggle("open"));
closeMenu.addEventListener("click", () => menuToggle("close"));

logoutButton();
renderPostId();
