import { API_AUCTION_LISTINGS } from "../constants";

export async function getAllPosts(page, limit) {
    try {
        const response = await fetch(`${API_AUCTION_LISTINGS}?_bids=true&_active=true&page=${page}&limit=${limit}`, {
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

export async function getPostId(postId, includeSeller = false, includeBids = false) {
    try {
        const queryParams = new URLSearchParams({
            _seller: includeSeller,
            _bids: includeBids,
          });
          
        const response = await fetch(`${API_AUCTION_LISTINGS}/${postId}?${queryParams}`, {
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
