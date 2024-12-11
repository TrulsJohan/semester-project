import { onCreatePost } from "../../ui/post/createPost.js";
import { logoutButton } from "../../global/logout";
import { menuToggle } from "../../global/menu";

const form = document.forms.createPost;
const addMediaButton = document.getElementById("addMediaButton");
const removeMediaButton = document.getElementById("removeMediaButton");
const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");

let mediaCount = 1; // Track the number of media inputs

addMediaButton.addEventListener("click", () => {
    const mediaInputs = document.getElementById("mediaInputs");

    const mediaUrlLabel = document.createElement("label");
    mediaUrlLabel.setAttribute("for", `mediaUrl${mediaCount}`);
    mediaUrlLabel.textContent = "Media URL (Optional)";
    mediaInputs.appendChild(mediaUrlLabel);

    const mediaUrlInput = document.createElement("input");
    mediaUrlInput.setAttribute("type", "url");
    mediaUrlInput.setAttribute("id", `mediaUrl${mediaCount}`);
    mediaUrlInput.setAttribute("name", "mediaUrl");
    mediaUrlInput.setAttribute("placeholder", "https://url.com/image.jpg");
    mediaInputs.appendChild(mediaUrlInput);

    const mediaAltLabel = document.createElement("label");
    mediaAltLabel.setAttribute("for", `mediaAlt${mediaCount}`);
    mediaAltLabel.textContent = "Media Alt Text (Optional)";
    mediaInputs.appendChild(mediaAltLabel);

    const mediaAltInput = document.createElement("input");
    mediaAltInput.setAttribute("type", "text");
    mediaAltInput.setAttribute("id", `mediaAlt${mediaCount}`);
    mediaAltInput.setAttribute("name", "mediaAlt");
    mediaAltInput.setAttribute("placeholder", "Description of the image");
    mediaInputs.appendChild(mediaAltInput);

    mediaCount++;
});

removeMediaButton.addEventListener("click", () => {
    if (mediaCount > 1) {
        const mediaInputs = document.getElementById("mediaInputs");

        // Remove the last mediaAlt input and its label
        mediaInputs.removeChild(mediaInputs.lastElementChild);
        mediaInputs.removeChild(mediaInputs.lastElementChild);

        // Remove the last mediaUrl input and its label
        mediaInputs.removeChild(mediaInputs.lastElementChild);
        mediaInputs.removeChild(mediaInputs.lastElementChild);

        mediaCount--;
    }
});

form.addEventListener("submit", onCreatePost);
openMenu.addEventListener("click", () => menuToggle("open"));
closeMenu.addEventListener("click", () => menuToggle("close"));

logoutButton();
