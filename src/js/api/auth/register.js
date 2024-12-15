import { API_AUTH_REGISTER } from '../constants.js';

export async function register({ name, email, password }) {
    try {
        const response = await fetch(API_AUTH_REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        } else {
            window.location.href = 'login.html';
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}
