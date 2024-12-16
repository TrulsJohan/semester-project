import { API_AUTH_LOGIN } from '../constants.js';
import { headers } from '../headers.js';

export async function login(requestBody) {
    try {
        const header = await headers();
        const response = await fetch(API_AUTH_LOGIN, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        if (!data) {
            throw new Error(`Error: ${data.status}`);
        }

        localStorage.setItem('token', data.data.accessToken);
        localStorage.setItem('user', data.data.name);
        return data;
    } catch (error) {
        alert('Failed to fetch login: ' + error.message);
    }
}
