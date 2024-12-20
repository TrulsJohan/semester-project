import { API_AUCTION_PROFILE } from '../constants';
import { loggedIn } from '../headers';

export async function updateProfile() {
    event.preventDefault();

    const bannerUrl = document.getElementById('bannerUrl').value;
    const avatarUrl = document.getElementById('avatarUrl').value;
    const profileBio = document.getElementById('profileBio').value;

    if (!profileBio || !bannerUrl || !avatarUrl) {
        alert('Please fill in all the fields.');
        return null;
    }

    const name = localStorage.getItem(`user`);
    if (!name) {
        alert('Could not fetch post. No user found.');
        return;
    }

    try {
        const header = await loggedIn();
        const response = await fetch(`${API_AUCTION_PROFILE}/${name}`, {
            method: 'PUT',
            headers: header,
            body: JSON.stringify({
                bio: profileBio,
                banner: { url: bannerUrl },
                avatar: { url: avatarUrl },
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        alert('Failed to fetch update: ' + error.message);
    }
}
