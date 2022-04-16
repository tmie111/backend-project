let handleLogin = (event) => {
    event.preventDefault();
    let password = event.target.password.value;
    let email = event.target.email.value;

    let body = {
        password: password,
        email: email
    }

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())
    .then((data) => {
        console.log(data)
        location.href = '/dashboard'
    });
};

let loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', handleLogin);