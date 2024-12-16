import { API_AUCTION_LISTINGS } from '../constants';

export async function getAllPosts(page, limit) {
    try {
        const response = await fetch(`${API_AUCTION_LISTINGS}?_bids=true&_active=true&page=${page}&limit=${limit}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        if (!data) {
            throw new Error(`Error: ${response.status}`);
        }
        return data;
    } catch (error) {
        alert('Failed to fetch posts: ' + error.message);
    }
}

export async function getPostId( postId, includeSeller = false, includeBids = false) {
    try {
        const queryParams = new URLSearchParams({
            _seller: includeSeller,
            _bids: includeBids,
        });

        const response = await fetch(`${API_AUCTION_LISTINGS}/${postId}?${queryParams}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        if (!data) {
            throw new Error(`Error: ${response.status}`);
        }

        return data;
    } catch (error) {
        alert('Failed to fetch post: ' + error.message);
    }
}
