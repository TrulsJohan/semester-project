import { login } from "../../api/auth/login.js";

export async function onLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await login({ email, password });

        if (response && response.data && response.data.accessToken) {
            window.location.href = "/";
        } else {
            alert("Login failed");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login.");
    }
}
