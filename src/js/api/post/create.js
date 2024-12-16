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

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(
                `Request failed with status ${response.status}: ${errorMessage}`
            );
        }

        return await response.json();
    } catch (error) {
        alert('Failed to fetch create: ' + error.message);
        return { error: error.message }; // Pass error details back to caller
    }
}
