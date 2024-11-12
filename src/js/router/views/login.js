import { onLogin } from "../../ui/auth/uiLogin.js";

const form = document.forms.login;

form.addEventListener("submit", onLogin);
