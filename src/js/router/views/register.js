import { onRegister } from '../../ui/auth/register.js';

const form = document.forms.register;

form.addEventListener('submit', onRegister);
