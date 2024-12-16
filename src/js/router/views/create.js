import { onCreatePost } from '../../ui/post/create.js';
import { logoutButton } from '../../global/logout.js';
import { menuToggle } from '../../global/menu.js';
import { navProfileImage } from '../../global/nav.js';

const form = document.forms.createPost;
const addMediaButton = document.getElementById('addMediaButton');
const removeMediaButton = document.getElementById('removeMediaButton');
const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');

let mediaCount = 1;

function loggedIn() {
    const loggedInUser = localStorage.getItem('token');
    if (!loggedInUser) {
        window.location.href = '/auth/login.html';
    }
}

addMediaButton.addEventListener('click', () => {
    const mediaInputs = document.getElementById('mediaInputs');

    const mediaUrlLabel = document.createElement('label');
    mediaUrlLabel.setAttribute('for', `mediaUrl${mediaCount}`);
    mediaUrlLabel.textContent = 'Media URL';
    mediaUrlLabel.className = 'font-semibold text-lg text-gray-800';
    mediaInputs.appendChild(mediaUrlLabel);

    const mediaUrlInput = document.createElement('input');
    mediaUrlInput.setAttribute('type', 'url');
    mediaUrlInput.setAttribute('id', `mediaUrl${mediaCount}`);
    mediaUrlInput.setAttribute('name', 'mediaUrl');
    mediaUrlInput.setAttribute('required', 'true');
    mediaUrlInput.setAttribute('placeholder', 'https://url.com/image.jpg');
    mediaUrlInput.className =
        'border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300';
    mediaInputs.appendChild(mediaUrlInput);

    const mediaAltLabel = document.createElement('label');
    mediaAltLabel.setAttribute('for', `mediaAlt${mediaCount}`);
    mediaAltLabel.textContent = 'Media Alt';
    mediaAltLabel.className = 'font-semibold text-lg text-gray-800';
    mediaInputs.appendChild(mediaAltLabel);

    const mediaAltInput = document.createElement('input');
    mediaAltInput.setAttribute('type', 'text');
    mediaAltInput.setAttribute('id', `mediaAlt${mediaCount}`);
    mediaAltInput.setAttribute('name', 'mediaAlt');
    mediaAltInput.setAttribute('placeholder', 'Description of the image');
    mediaAltInput.className =
        'border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300';
    mediaInputs.appendChild(mediaAltInput);

    mediaCount++;
});

removeMediaButton.addEventListener('click', () => {
    if (mediaCount > 1) {
        const mediaInputs = document.getElementById('mediaInputs');
        mediaInputs.removeChild(mediaInputs.lastElementChild);
        mediaInputs.removeChild(mediaInputs.lastElementChild);
        mediaInputs.removeChild(mediaInputs.lastElementChild);
        mediaInputs.removeChild(mediaInputs.lastElementChild);

        mediaCount--;
    }
});

form.addEventListener('submit', onCreatePost);
openMenu.addEventListener('click', () => menuToggle('open'));
closeMenu.addEventListener('click', () => menuToggle('close'));

logoutButton();
loggedIn();
navProfileImage();
