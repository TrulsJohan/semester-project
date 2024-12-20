import { API_AUCTION_LISTINGS } from '../constants';
import { loggedIn } from '../headers';

export async function placeBid(requestBody, selectedPostId) {
    try {
        const header = await loggedIn();
        const url = `${API_AUCTION_LISTINGS}/${selectedPostId}/bids`;
        const response = await fetch(url, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        alert('Failed to fetch bid: ' + error.message);
    }
}
