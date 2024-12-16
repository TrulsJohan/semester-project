import { create } from '../../api/post/create';

export async function onCreatePost(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const tags = document
        .getElementById('tags')
        .value.split(',')
        .map((tag) => tag.trim());
    const endsAt = new Date(
        document.getElementById('endsAt').value
    ).toISOString();

    const mediaInputs = document.querySelectorAll('[id^=mediaUrl]');
    const mediaAltInputs = document.querySelectorAll('[id^=mediaAlt]');

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
        endsAt: endsAt,
    };

    try {
        const response = await create(requestBody);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        alert('Failed to create post: ' + error.message);
    }
    window.location.href = '/';
}
