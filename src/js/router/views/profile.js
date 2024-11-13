import { getProfile } from "../../api/profile/profile";

async function renderProfile(){
    const data = await getProfile();
    console.log(data);
}

renderProfile();
