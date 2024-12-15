import { API_KEY } from '../constants';
import { API_AUCTION_PROFILE } from '../constants';

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
        console.error('Could not fetch post. No user found.');
        return;
    }

    try {
        const response = await fetch(`${API_AUCTION_PROFILE}/${name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'X-Noroff-API-Key': API_KEY,
            },
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
        console.error('Error fetching data:', error.message);
    }
}
