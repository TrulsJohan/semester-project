import { API_KEY } from "../constants";
import { API_AUCTION_LISTINGS } from "../constants";

export async function makeBids(postId, requestBody){
    try {
        const response = await fetch(`${API_AUCTION_LISTINGS}/${postId}/bids`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                "X-Noroff-API-Key": API_KEY,
            },
            body: JSON.stringify(requestBody),
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
