import { API_AUCTION_LISTINGS, API_KEY } from '../constants';

export async function create(requestBody) {
    try {
        const response = await fetch(API_AUCTION_LISTINGS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'X-Noroff-API-Key': API_KEY,
            },
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
