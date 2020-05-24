//import axios
import axios from 'axios';


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

        if(result.data.status === 'success'){
            alert('Logged in Successfully');
            window.setTimeout(()=>{
                location.assign('/');
            }, 1500)
        }
    } catch (err) {
        alert(err.response.data.message);
    }

};


