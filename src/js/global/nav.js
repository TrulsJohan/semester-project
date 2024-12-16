import { getProfile } from '../api/profile/profile';

const profileImage = document.getElementById('profileImage');
const name = localStorage.getItem('user');

export async function navProfileImage() {
    try {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            return;
        }

        const data = await getProfile(name, true, true);
        if (!data || !data.data || !data.data.avatar) {
            alert('Could not fetch user data');
            return;
        }

        const navProfileImg = document.createElement('img');
        navProfileImg.src = data.data.avatar.url || 'https://via.placeholder.com/150';
        navProfileImg.alt = data.data.avatar.alt || 'Profile Image';
        navProfileImg.className = 'rounded-full border border-gray-300 object-cover';
        profileImage.innerHTML = '';
        profileImage.appendChild(navProfileImg);
    } catch (error) {
        alert('Failed to fetch profile img: ' + error.message);
    }
}
