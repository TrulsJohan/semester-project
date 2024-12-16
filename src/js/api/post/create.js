import { API_AUCTION_LISTINGS } from '../constants';
import { loggedIn } from '../headers';

export async function create(requestBody) {
    try {
        const header = await loggedIn();
        const response = await fetch(API_AUCTION_LISTINGS, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        if (!data) {
            throw new Error(`Error: ${response.status}`);
        }
        return data;
    } catch (error) {
        alert('Failed to fetch create: ' + error.message);
    }
}
