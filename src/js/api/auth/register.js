import { API_AUTH_REGISTER } from '../constants.js';

export async function register(requestBody) {
    try {
        const response = await fetch(API_AUTH_REGISTER, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        if (!data) {
            throw new Error(`Error: ${response.status}`);
        }
        return data;
    } catch (error) {
        alert('Failed to fetch register: ' + error.message);
    }
}
