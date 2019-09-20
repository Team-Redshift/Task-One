const checkLogin = (results) => {
    if (results.status == 200) {
        incorrect.classList.add('correct');
        window.setTimeout(function () {
            window.location = "./welcome.html";
        }, 2000);
    } else {
        const incorrect = document.querySelector('p.login-info');
        incorrect.classList.remove('correct');
    }
}
const loginUser = async () => {
    const username = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const api = "http://127.0.0.1:3000/api/v1/login";
    await fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
    }).then(res => res.json())
        .then(data => checkLogin(data))
        .catch((err) => console.log(err));
};
