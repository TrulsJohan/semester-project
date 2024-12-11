import { create } from "../../api/post/createPost";

export async function onCreatePost(){
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const tags = document.getElementById("tags").value.split(',').map(tag => tag.trim());
    const mediaUrl = document.getElementById("mediaUrl").value;
    const mediaAlt = document.getElementById("mediaAlt").value;
    const endsAt = new Date(document.getElementById("endsAt").value).toISOString();

    const requestBody = {
        title: title,
        description: description,
        tags: tags,
        media: mediaUrl ? [{ url: mediaUrl, alt: mediaAlt }] : [],
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
}
