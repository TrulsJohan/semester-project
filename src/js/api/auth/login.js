import { API_AUTH_LOGIN } from '../constants.js';
import { headers } from '../headers.js';

export async function login({ email, password }) {
    try {
        const header = await headers();
        const response = await fetch(API_AUTH_LOGIN, {
            method: 'POST',
            headers: header,
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (!data) {
            throw new Error(`Error: ${data.status}`);
        }

        const token = data.data.accessToken;
        const user = data.data.name;
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        return data;
    } catch (error) {
        console.error(error);
        alert('Failed to fetch login: ' + error.message);
    }
}
