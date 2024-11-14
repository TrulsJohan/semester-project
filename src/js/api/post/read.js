import { API_AUCTION_LISTINGS } from "../constants";

export async function getAllPosts(page, limit) {
    try {
        const response = await fetch(`${API_AUCTION_LISTINGS}?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

export async function getPostId(postId) {
    try {
        const response = await fetch(`${API_AUCTION_LISTINGS}/${postId}`, {  //include seller and bids in url
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}
