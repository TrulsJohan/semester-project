import { login } from '../../api/auth/login.js';

export async function onLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const requestBody = { email, password };

    try {
        const response = await login(requestBody);

        if (response && response.data && response.data.accessToken) {
            window.location.href = '/';
        } else {
            alert('Login failed');
        }
    } catch (error) {
        alert('An error occurred during login');
    }
}
