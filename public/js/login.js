
const login = async (email, password) => {
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



document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();

    //get the email and password
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
});