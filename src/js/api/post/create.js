import { API_AUCTION_LISTINGS, API_KEY } from '../constants';
import { loggedIn } from '../headers';

export async function create(requestBody) {
    try {
        const header = await loggedIn();
        const response = await fetch(API_AUCTION_LISTINGS, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}
