//import polyfill
import '@babel/polyfill';

//import login.js code
import { login, logout } from './logout-logout';

//import updateSettings
import { updateData } from './updateSettings';

//import polyfill
import { displayMap } from './mapbox';

//DOM ELEMENT
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');



//DELEGATION
if (mapBox) {
    //Get the locations from the supplied data on the front end
    const locations = JSON.parse(mapBox.dataset.locations);
    displayMap(locations);
};

//Login
if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        //VALUES
        //get the email and password
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    });
};

//logout
if (logoutBtn) logoutBtn.addEventListener('click', logout);


//submit data
if (userDataForm) userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    //VALUES
    //get the email and name
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    updateData(name, email);
});
