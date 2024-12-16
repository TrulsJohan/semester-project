import { updateProfile } from '../../api/profile/update';

export async function onUpdateProfile() {
    const response = await updateProfile();
    if (!response) {
        alert('Could not fetch user data');
        return;
    }
    window.location.reload();
}
