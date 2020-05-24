//import axios
import axios from 'axios';

//import alert
import { showAlert } from './alert';

//exporting a js file is not like node just add export
export const login = async (email, password) => {
    try {
        const result = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/v1/users/login',
            data: {
                email,
                password
            }
        });

        if (result.data.status === 'success') {
            showAlert('success', 'Login Successful');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }

};

//logout
export const logout = async () => {
    try {

        const result = await axios({
            method: 'GET',
            url: 'http://localhost:3000/api/v1/users/logout'

        });
        if((result.data.status ='success')) {
            showAlert('error', 'Logging out user...');
            window.setTimeout(() => {
                location.assign('/')
            }, 1500)
        }
    } catch (err) {
        showAlert('error', 'Error logging out ! Try again')
    };
}


