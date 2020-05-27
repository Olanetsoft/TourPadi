//import axios
import axios from 'axios';

//import alert
import { showAlert } from './alert';


//type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
    try {
        //find the url and check the type
        const url =
            type === 'password'
                ? '/api/v1/users/updateMyPassword'
                : '/api/v1/users/updateMe';


        const result = await axios({
            method: 'PATCH',
            url,
            data
        });
        //console.log(result)
        if (result.data.status === 'success') {
            showAlert('success', `${type.toUpperCase()} updated successfully!`);
            window.setTimeout(() => {
                location.assign('/me');
            }, 1500)
        };

    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};