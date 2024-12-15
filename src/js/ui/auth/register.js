import { register } from '../../api/auth/register.js';

export async function onRegister(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    try {
        const data = await register({ name, email, password });
        console.log('Registration successful', data);
    } catch (error) {
        console.error('Registration failed', error);
    }
}
