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
const name = localStorage.getItem(`user`);
const form = document.forms.updateProfile;

async function renderProfile(){
    const profileData = await getProfile(name, true, true);

    const data = profileData.data;

    const avatarUrl = data.avatar && data.avatar.url ? data.avatar.url : "/assets/images/cesar-rincon-XHVpWcr5grQ-unsplash.jpg";
    const bannerUrl = data.banner && data.banner.url ? data.banner.url : "/assets/images/luke-chesser-hQo6Uyo4nBg-unsplash.jpg";
    const avatarAlt = data.avatar?.alt || "Avatar Image";
    const bannerAlt = data.banner?.alt || "Banner Image";

    const renderContainer = document.getElementById("renderContainer");
    renderContainer.innerHTML = `
        <div class="flex flex-col gap-8">
            <div class="profile-header relative flex flex-col items-center">
                <img src="${bannerUrl}" alt="${bannerAlt}" class="profile-banner w-full h-[120px] object-cover bg-slate-500">
                <img src="${avatarUrl}" alt="${avatarAlt}" class="profile-avatar w-24 h-24 rounded-full border-4 border-white absolute bottom-[-48px] bg-slate-900">
            </div>
            <div class="flex flex-col justify-center items-center w-full gap-4">
                <div class="flex flex-col w-full justify-center items-center pt-12">
                    <h1 class="font-bold text-xl">${data.name}</h1>
                    <p class="font-light text-base">${data.email}</p>
                </div>
                <p class="text-base mx-6">Credits:
                    <span class="font-light text-base">${data.credits}</span>
                </p>
            </div>
            <div class="h-px bg-slate-500 mx-6"></div>
        </div>
    `;

    document.getElementById("bannerUrl").value = data.banner.url
    document.getElementById("avatarUrl").value = data.avatar.url
    document.getElementById("profileBio").value = data.bio
}

async function renderProfileBids(){
    const profileBids = await getProfileBids(name);
    if (profileBids.data.length === 0) {
        renderContainer.innerHTML = "";
        renderProfile();
    } else {
        renderContainer.innerHTML = profileBids.data
        .map((post) => {
            const mediaUrl = post.media && post.media.length > 0 ? post.media[0].url : "https://upload.wikimedia.org/wikipedia/commons/f/f9/No-image-available.jpg";
            const mediaAlt = post.media && post.media.length > 0 ? post.media[0].alt || "Post Image" : "No Image Available";
            const bidsCount = post._count && post._count.bids ? post._count.bids : 0;
            const endsAt = new Date(post.endsAt).toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" });
            
            return `
                <div data-id="${post.id}" class="post flex flex-col w-full gap-4 px-2 py-2 border border-slate-500 rounded-lg">
                    <img src="${mediaUrl}" alt="${mediaAlt}" class="w-full h-[256px] object-cover rounded-lg border border-slate-500">
                    <div class="flex flex-col gap-2">
                        <h1 class="w-auto font-bold text-xl">${post.title}</h1>
                        <div>
                            <p class="font-medium text-base">Ends:
                                <span>${endsAt}</span>
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

            renderContainer.querySelectorAll(".post").forEach((card) => {
                card.addEventListener("click", () => {
                    const postId = card.getAttribute("data-id");
                    localStorage.setItem("selectedPostId", postId);
                    window.location.href = "/post/post.html";
                });
            });
    }   
}

async function renderProfileListings() {
    const profileListings = await getProfile(name, true, true);
    if (profileListings.data.listings.length === 0) {
        renderContainer.innerHTML = "";
        renderProfile();
    } else {
        renderContainer.innerHTML = profileListings.data.listings
        .map((post) => {
            const mediaUrl = post.media && post.media.length > 0 ? post.media[0].url : "https://upload.wikimedia.org/wikipedia/commons/f/f9/No-image-available.jpg";
            const mediaAlt = post.media && post.media.length > 0 ? post.media[0].alt || "Post Image" : "No Image Available";
            const bidsCount = post._count && post._count.bids ? post._count.bids : 0;
            const endsAt = new Date(post.endsAt).toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" });
            
            return `
                <div data-id="${post.id}" class="post flex flex-col w-full gap-4 px-2 py-2 border border-slate-500 rounded-lg">
                    <img src="${mediaUrl}" alt="${mediaAlt}" class="w-full h-[256px] object-cover rounded-lg border border-slate-500">
                    <div class="flex flex-col gap-2">
                        <h1 class="w-auto font-bold text-xl">${post.title}</h1>
                        <div>
                            <p class="font-medium text-base">Ends:
                                <span>${endsAt}</span>
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

            renderContainer.querySelectorAll(".post").forEach((card) => {
                card.addEventListener("click", () => {
                    const postId = card.getAttribute("data-id");
                    localStorage.setItem("selectedPostId", postId);
                    window.location.href = "/post/post.html";
                });
            });
    }
}

async function renderProfileWins() {
    const profileWins = await getProfile(name, true, true);
    if (profileWins.data.wins.length === 0) {
        renderContainer.innerHTML = "";
        renderProfile();
    } else {
        renderContainer.innerHTML = profileWins.data.wins
        .map((post) => {
            const mediaUrl = post.media && post.media.length > 0 ? post.media[0].url : "https://upload.wikimedia.org/wikipedia/commons/f/f9/No-image-available.jpg";
            const mediaAlt = post.media && post.media.length > 0 ? post.media[0].alt || "Post Image" : "No Image Available";
            const bidsCount = post._count && post._count.bids ? post._count.bids : 0;
            const endsAt = new Date(post.endsAt).toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" });
            
            return `
                <div data-id="${post.id}" class="post flex flex-col w-full gap-4 px-2 py-2 border border-slate-500 rounded-lg">
                    <img src="${mediaUrl}" alt="${mediaAlt}" class="w-full h-[256px] object-cover rounded-lg border border-slate-500">
                    <div class="flex flex-col gap-2">
                        <h1 class="w-auto font-bold text-xl">${post.title}</h1>
                        <div>
                            <p class="font-medium text-base">Ends:
                                <span>${endsAt}</span>
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

            renderContainer.querySelectorAll(".post").forEach((card) => {
                card.addEventListener("click", () => {
                    const postId = card.getAttribute("data-id");
                    localStorage.setItem("selectedPostId", postId);
                    window.location.href = "/post/post.html";
                });
            });
    }
}

accountButton.addEventListener("click", ()=> {
    renderContainer.innerHTML = "";
    renderProfile();
});

bidsButton.addEventListener("click", ()=> {
    renderContainer.innerHTML = "";
    renderProfileBids();
});

listingsButton.addEventListener("click", ()=> {
    renderContainer.innerHTML = "";
    renderProfileListings();
});

winsButton.addEventListener("click", ()=> {
    renderContainer.innerHTML = "";
    renderProfileWins()
});

form.addEventListener("submit", onUpdateProfile);
openMenu.addEventListener("click", () => menuToggle("open"));
closeMenu.addEventListener("click", () => menuToggle("close"));

renderProfile();
renderProfileBids();
logoutButton();
