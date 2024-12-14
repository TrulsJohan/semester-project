import { getProfile } from "../../api/profile/profile";
import { getProfileBids } from "../../api/profile/profile";
import { menuToggle } from "../../global/menu";
import { logoutButton } from "../../global/logout";
import { onUpdateProfile } from "../../ui/profile/updateProfile";

const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const accountButton = document.getElementById("accountButton");
const listingsButton = document.getElementById("listingsButton");
const bidsButton = document.getElementById("bidsButton");
const winsButton = document.getElementById("winsButton");
const formContainer = document.getElementById("formContainer");
const name = localStorage.getItem(`user`);
const form = document.forms.updateProfile;

// Variable to store the interval ID
let countdownInterval;

// Function to render the user's profile
async function renderProfile() {
    renderContainer.className = "";
    formContainer.classList.remove("hidden");
    const loggedInUser = localStorage.getItem("token");
    if (!loggedInUser) {
        window.location.href = "/auth/login.html";
    }

    const profileData = await getProfile(name, true, true);
    const data = profileData.data;

    const avatarUrl = data.avatar && data.avatar.url ? data.avatar.url : "/assets/images/cesar-rincon-XHVpWcr5grQ-unsplash.jpg";
    const bannerUrl = data.banner && data.banner.url ? data.banner.url : "/assets/images/luke-chesser-hQo6Uyo4nBg-unsplash.jpg";
    const avatarAlt = data.avatar?.alt || "Avatar Image";
    const bannerAlt = data.banner?.alt || "Banner Image";

    const renderContainer = document.getElementById("renderContainer");
    renderContainer.innerHTML = `
        <div class="flex flex-col gap-8 pb-8 border border-slate-300 rounded-lg shadow-lg hover:shadow-2xl transition cursor-pointer">
            <div class="profile-header relative flex flex-col items-center bg-slate-50">
                <img src="${bannerUrl}" alt="${bannerAlt}" class="profile-banner w-full h-[120px] object-cover bg-slate-500 rounded-t-lg">
                <img src="${avatarUrl}" alt="${avatarAlt}" class="profile-avatar w-24 h-24 rounded-full border-4 border-white absolute bottom-[-48px] bg-slate-900 shadow-lg">
            </div>
            <div class="flex flex-col justify-center items-center w-full gap-4 px-6">
                <div class="flex flex-col w-full justify-center items-center pt-16">
                    <h1 class="font-bold text-xl text-slate-800">${data.name}</h1>
                    <p class="font-light text-base text-slate-600">${data.email}</p>
                </div>
                <p class="text-base mx-6 text-slate-700">Credits:
                    <span class="font-medium text-slate-900">${data.credits}</span>
                </p>
            </div>
        </div>
    `;

    document.getElementById("bannerUrl").value = data.banner.url;
    document.getElementById("avatarUrl").value = data.avatar.url;
    document.getElementById("profileBio").value = data.bio;
}

// Generalized function to render profile posts (listings, bids, or wins)
async function renderProfilePosts(type) {
    formContainer.classList.add("hidden");

    // Fetching the data based on the provided type
    let profileData;
    if (type === "bids") {
        profileData = await getProfileBids(name); // Bids come from getProfileBids
    } else if (type === "listings" || type === "wins") {
        profileData = await getProfile(name, true, true); // Listings and Wins come from getProfile
    }

    // Extracting the relevant data based on the type
    let posts = [];
    if (type === "bids") {
        posts = profileData.data; // Bids are directly in profileData.data
    } else if (type === "listings" || type === "wins") {
        posts = profileData.data[type]; // Listings or Wins are in profileData.data[type]
    }

    // If no posts are found, show the profile and return
    if (posts.length === 0) {
        renderContainer.innerHTML = "";
        renderProfile();
        return;
    }

    // Function to calculate the remaining time as a countdown
    function formatCountdown(endDate) {
        const now = new Date();
        const timeDiff = endDate - now;

        if (timeDiff <= 0) {
            return "Ended";
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    // Render posts based on the fetched data
    renderContainer.innerHTML = posts
        .map((post) => {
            const mediaUrl = post.media && post.media.length > 0 ? post.media[0].url : "https://upload.wikimedia.org/wikipedia/commons/f/f9/No-image-available.jpg";
            const mediaAlt = post.media && post.media.length > 0 ? post.media[0].alt || "Post Image" : "No Image Available";
            const bidsCount = post._count && post._count.bids ? post._count.bids : 0;
            const endDate = new Date(post.endsAt);

            // Initial countdown display
            const countdownText = formatCountdown(endDate);

            return `
                <div data-id="${post.id}" class="post flex flex-col w-full max-w-md mx-auto gap-4 mb-4 px-4 py-4 border border-gray-300 rounded-lg shadow-lg bg-white">
                    <img src="${mediaUrl}" alt="${mediaAlt}" class="w-full h-64 object-cover rounded-lg border-b border-gray-300">
                    <div class="flex flex-col gap-3 mt-4">
                        <h1 class="font-semibold text-2xl text-gray-800">${post.title}</h1>
                        <div class="flex flex-col gap-1">
                            <p class="font-medium text-lg text-gray-600">Ends in: 
                                <span class="countdown text-gray-800">${countdownText}</span>
                            </p>
                            <p class="font-medium text-lg text-gray-600">Bids: 
                                <span class="text-gray-900">${bidsCount}</span>
                            </p>
                        </div>
                    </div>
                    <button class="mt-4 w-full bg-brand-300 hover:bg-brand-400 text-lg font-semibold text-white py-3 rounded-lg transition-all">
                        Place Bid
                    </button>
                </div>
            `;
        }).join("");            

    renderContainer.querySelectorAll(".post").forEach((card) => {
        card.addEventListener("click", () => {
            const postId = card.getAttribute("data-id");
            localStorage.setItem("selectedPostId", postId);
            window.location.href = "/post/post.html";
        });
    });

    // Clear any existing countdown intervals before starting a new one
    clearInterval(countdownInterval);

    // Update countdown timers every second
    countdownInterval = setInterval(() => {
        const countdownElements = renderContainer.querySelectorAll(".countdown");
        countdownElements.forEach((element, index) => {
            const endDate = new Date(posts[index].endsAt);
            const countdownText = formatCountdown(endDate);
            element.textContent = countdownText;
        });
    }, 1000);
}

// Event listeners for each section
accountButton.addEventListener("click", () => {
    renderContainer.innerHTML = "";
    renderProfile();
});

bidsButton.addEventListener("click", () => {
    renderContainer.innerHTML = "";
    renderProfilePosts("bids");
});

listingsButton.addEventListener("click", () => {
    renderContainer.innerHTML = "";
    renderContainer.className = "grid grid-cols-1 gap-4 px-6 lg:w-2/3 lg:mx-auto sm:grid-cols-2 lg:grid-cols-2";
    renderProfilePosts("listings");
});

winsButton.addEventListener("click", () => {
    renderContainer.innerHTML = "";
    renderContainer.className = "grid grid-cols-1 gap-4 px-6 lg:w-2/3 lg:mx-auto sm:grid-cols-2 lg:grid-cols-2";
    renderProfilePosts("wins");
});

form.addEventListener("submit", onUpdateProfile);
openMenu.addEventListener("click", () => menuToggle("open"));
closeMenu.addEventListener("click", () => menuToggle("close"));

renderProfile();
logoutButton();
