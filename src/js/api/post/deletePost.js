import { API_KEY, API_AUCTION_LISTINGS } from "../constants";

export async function deletePost() {
    const postId = localStorage.getItem(`selectedPostId`);

    if(!postId) {
        alert("No postId found")
        return;
    }

    try {
        const response = await fetch(`${API_AUCTION_LISTINGS}/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                "X-Noroff-API-Key": API_KEY,
            }
        });

        return response;

    }catch (error) {
        console.error(`error updating post: `, error)
    }
}
