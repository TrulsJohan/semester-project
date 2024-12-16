import { register } from '../../api/auth/register.js';

export async function onRegister(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let requestBody = { name, email, password };

    try {
        const data = await register(requestBody);
        if (!data) {
            alert(`Registration failed`);
        } else {
            alert('Registered successfully');
        }
        window.location.href = '/auth/login.html';
    } catch (error) {
        alert(`An error occurred during registration`);
    }
}
