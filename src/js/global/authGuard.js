export function authGuard() {
    const loginButton = document.createElement("button");
    loginButton.innerText = "login"
    navbar.appendChild = "loginButton";

    const logoutButton = document.createElement("button");
    logoutButton.innerText = "login"
    navbar.appendChild = "logoutButton";

    if(localStorage.token){
        loginButton.classList.add = "block";
        logoutButton.classList.add = "hidden";
    } else {
        loginButton.classList.add = "hidden";
        logoutButton.classList.add = "block";
    }
  }
