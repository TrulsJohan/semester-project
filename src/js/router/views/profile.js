import { getProfile } from "../../api/profile/profile";
import { getProfileBids } from "../../api/profile/profile";

const name = localStorage.getItem(`user`);

async function renderProfile(){
    const profileData = await getProfile(name, true, true);

    const data = profileData.data;

    const avatarUrl = data.avatar && data.avatar.url ? data.avatar.url : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
    const bannerUrl = data.banner && data.banner.url ? data.banner.url : "https://upload.wikimedia.org/wikipedia/commons/4/47/Blue_sky_banner.jpg";

    const profileContainer = document.getElementById("profileContainer");
    profileContainer.innerHTML = `
        <div class="profile-header">
            <img src="${bannerUrl}" alt="${data.banner.alt || 'Banner Image'}" class="profile-banner" style="width: 100%; height: 200px;">
            <img src="${avatarUrl}" alt="${data.avatar.alt || 'Avatar Image'}" class="profile-avatar" style="width: 100px; height: 100px; border-radius: 50%; margin-top: -50px;">
        </div>
        <div class="profile-details">
            <h1>${data.name}</h1>
            <p>${data.bio || "This user has no bio."}</p>
            <p>Email: ${data.email}</p>
            <p>Credits: ${data.credits}</p>
            <p>Listings: ${data._count.listings}</p>
            <p>Wins: ${data._count.wins}</p>
        </div>
    `;

    const profileListings = profileData.data.listings;
    const profileWins = profileData.data.wins;
}

async function renderProfileBids(){
    const profileBids = await getProfileBids(name);
}

renderProfile();
renderProfileBids();
