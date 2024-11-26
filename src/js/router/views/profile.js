import { getProfile } from "../../api/profile/profile";
import { getProfileBids } from "../../api/profile/profile";
import { menuToggle } from "../../global/menu";
import { logoutButton } from "../../global/logout";

const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const name = localStorage.getItem(`user`);

async function renderProfile(){
    const profileData = await getProfile(name, true, true);

    const data = profileData.data;
    console.log(data);

    const avatarUrl = data.avatar && data.avatar.url ? data.avatar.url : "/assets/images/cesar-rincon-XHVpWcr5grQ-unsplash.jpg";
    const bannerUrl = data.banner && data.banner.url ? data.banner.url : "/assets/images/luke-chesser-hQo6Uyo4nBg-unsplash.jpg";
    const avatarAlt = data.avatar?.alt || "Avatar Image";
    const bannerAlt = data.banner?.alt || "Banner Image";

    const profileContainer = document.getElementById("profileContainer");
    profileContainer.innerHTML = `
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

    const profileListings = profileData.data.listings;
    const profileWins = profileData.data.wins;
}

async function renderProfileBids(){
    const profileBids = await getProfileBids(name);
    console.log(profileBids);
}

openMenu.addEventListener("click", () => menuToggle("open"));
closeMenu.addEventListener("click", () => menuToggle("close"));

renderProfile();
renderProfileBids();
logoutButton();
