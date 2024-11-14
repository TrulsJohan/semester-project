import { getProfile } from "../../api/profile/profile";
import { getProfileBids } from "../../api/profile/profile";

const name = localStorage.getItem(`user`);

async function renderProfile(){
    const profileData = await getProfile(name, true, true);
    console.log(profileData);
}

async function renderProfileBids(){
    const bidsData = await getProfileBids(name);
    console.log(bidsData);
}

renderProfile();
renderProfileBids();
