const api = "https://radiant-crag-38983.herokuapp.com/api/v1";

const checkLogin = results => {
  const incorrect = document.querySelector("p.login-info");
  if (results.status == 200) {
    incorrect.classList.add("correct");
    window.setTimeout(function() {
      window.location = "https://radiant-crag-38983.herokuapp.com/welcome";
    }, 2000);
  } else {
    incorrect.classList.remove("correct");
  }
};

const doSignup = results => {
  const message = document.querySelector("p.signup-message");
  if(results.status == 200) {
    message.value = "";
    window.setTimeout(function() {
      window.location = "https://radiant-crag-38983.herokuapp.com/login";
    }, 2000);
  } else {
    message.value = results.message;
  }
}

const loginUser = async () => {
  const username = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  const loginEndpoint = `${api}/login`;
  await fetch(loginEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username: username, password: password })
  })
    .then(res => res.json())
    .then(data => checkLogin(data))
    .catch(err => console.log(err));
};

const signupUser = async () => {
  const incorrect = document.querySelector("p.login-info");

  const fullname = document.getElementById("name-input").value;
  const username = document.getElementById("username-input").value;
  const password = document.getElementById("password-input").value;
  const password2 = document.getElementById("confirm-password-input").value;
  console.log(fullname, username, password, password2);

  if (password !== password2) {
    incorrect.classList.remove("correct");
  } else {
  const signupEndpoint = `${api}/signup`;
    await fetch(signupEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: fullname, username: username, password: password })
    })
      .then(res => res.json())
      .then(data => doSignup(data))
      .catch(err => console.log(err));
  }
};
