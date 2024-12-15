import { API_KEY } from './constants';

export async function loggedIn() {
    const accessToken = localStorage.getItem('token');
    const headers = new Headers();

    if (API_KEY) {
        headers.append('Content-Type', 'application/json');
        headers.append('X-Noroff-API-Key', API_KEY);
    }

    if (accessToken) {
        headers.append('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
}

export async function headers() {
    const headers = new Headers();

    if (API_KEY) {
        headers.append('Content-Type', 'application/json');
        headers.append('X-Noroff-API-Key', API_KEY);
    }

    return headers;
}
