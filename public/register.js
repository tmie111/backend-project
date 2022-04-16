
 let handleRegister = (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    let email = e.target.email.value;

    let body = {
        username: username,
        password: password,
        email: email
    }

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())
    .then((data) => {
        console.log(data)
        location.href = '/login'
    });
};


let registrationForm = document.getElementById('register-form');
registrationForm.addEventListener('submit', handleRegister);