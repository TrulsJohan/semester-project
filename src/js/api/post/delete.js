import { API_AUCTION_LISTINGS } from '../constants';
import { loggedIn } from '../headers';

export async function deletePost() {
    const postId = localStorage.getItem(`selectedPostId`);

    if (!postId) {
        alert('No postId found');
        return;
    }

    try {
        const header = await loggedIn();
        const response = await fetch(`${API_AUCTION_LISTINGS}/${postId}`, {
            method: 'DELETE',
            headers: header,
        });

        return response;
    } catch (error) {
        console.error(`error updating post: `, error);
    }
}
