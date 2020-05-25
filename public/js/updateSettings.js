//import axios
import axios from 'axios';

//import alert
import { showAlert } from './alert';

export const updateData = async (name, email) => {
    try {
        const result = await axios({
            method: 'PATCH',
            url: 'http://localhost:3000/api/v1/users/updateMe',
            data: {
                name,
                email
            }
        });
        
        if (result.data.status === 'success 🙌') {
            showAlert('success', 'Your data updated successfully!');
        }

    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}