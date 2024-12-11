import { updateProfile } from "../../api/profile/updateProfile";

export async function onUpdateProfile() {
    const response = await updateProfile();
    if(!response) {
        alert("Could not fetch user data")
        return;
    }
    window.location.reload();
}
