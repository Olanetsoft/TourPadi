//import polyfill
import '@babel/polyfill';

//import login.js code
import { login } from './login';

//import polyfill
import { displayMap } from './mapbox';

//DOM ELEMENT
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form');



//DELEGATION
if (mapBox) {
    //Get the locations from the supplied data on the front end
    const locations = JSON.parse(mapBox.dataset.locations);
    displayMap(locations);
};

if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        //VALUES
        //get the email and password
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    });
}
