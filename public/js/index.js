//import login.js code
import { login } from './login';


document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();

    //get the email and password
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
});