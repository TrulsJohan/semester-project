import { create } from "../../api/post/createPost";

export async function onCreatePost(event){
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const tags = document.getElementById("tags").value.split(',').map(tag => tag.trim());
    const endsAt = new Date(document.getElementById("endsAt").value).toISOString();

    const mediaInputs = document.querySelectorAll("[id^=mediaUrl]");
    const mediaAltInputs = document.querySelectorAll("[id^=mediaAlt]");

    const media = [];
    mediaInputs.forEach((mediaInput, index) => {
        const url = mediaInput.value;
        const alt = mediaAltInputs[index].value;
        if (url) {
            media.push({ url, alt });
        }
    });

    const requestBody = {
        title: title,
        description: description,
        tags: tags,
        media: media,
        endsAt: endsAt
    }
    try {
        const data = await create(requestBody);
        if (!data){
            throw new Error(`Error: ${response.status}`);
        } else {
            console.log("successfully created a post");
        }
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
    window.location.href = "/";
}
