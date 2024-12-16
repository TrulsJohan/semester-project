export function logoutButton() {
    const loginButton = document.getElementById('loginButton');
    if (localStorage.token) {
        loginButton.innerText = 'logout';
        loginButton.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = '/';
        });
    } else {
        loginButton.addEventListener('click', () => {
            window.location.href = '../../../auth/login/';
        });
    }
}
