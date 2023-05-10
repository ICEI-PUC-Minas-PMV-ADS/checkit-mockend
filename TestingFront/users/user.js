// POST AUTH
const formPostAuth = document.querySelector("#form-post-auth");

formPostAuth.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = event.target.querySelector("#email").value;
  const password = event.target.querySelector("#password").value;

  const objUserAuth = {
    email: email,
    password: password,
  };

  // console.log(objUserAuth)

  postUserAuth(objUserAuth);
});

// POST
const formPost = document.querySelector("#form-post");

formPost.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = event.target.querySelector("#name").value;
  const email = event.target.querySelector("#email").value;
  const password = event.target.querySelector("#password").value;
  //const role = event.target.querySelector('#role').value;

  const objUser = {
    name: name,
    email: email,
    password: password,
    role: 1, // default
  };

  console.log(objUser);

  postUser(objUser);
});

// PUT
const formPut = document.querySelector("#form-put");

formPut.addEventListener("submit", (event) => {
  event.preventDefault();

  const id = event.target.querySelector("#id").value;
  const name = event.target.querySelector("#name").value;
  const email = event.target.querySelector("#email").value;
  const password = event.target.querySelector("#password").value;
  //const role = event.target.querySelector('#role').value;

  const objUser = {
    id: id,
    name: name,
    email: email,
    password: password,
    role: 1,
  };

  console.log(objUser);

  putUser(id, objUser);
});

// GET
const btnGet = document.querySelector("#btnGet");

btnGet.addEventListener("click", (e) => {
  e.preventDefault();

  const getUserId = document.querySelector("#getUserId").value;

  getUser(getUserId);
});

// DELETE
const btnDelete = document.querySelector("#btnDelete");

btnDelete.addEventListener("click", (e) => {
  e.preventDefault();

  const deleteUserId = document.querySelector("#deleteUserId").value;

  deleteUser(deleteUserId);
});

// TOKEN -------------------------------------------------
function savingJwtTokenInLocalStorage(token) {
  localStorage.setItem("jwtToken", JSON.stringify(token));
}

function validateToken() {
  const jwtToken = localStorage.getItem("jwtToken");
  let token = "";

  if (jwtToken != null) {
    const jwtHeaderToken = jwtToken.slice(13, jwtToken.length - 2);
    token = `Bearer ${jwtHeaderToken}`;
  }

  return token;
}

//---------------------------------------------------------------
// https://localhost:5278/api/users/

// POST AUTH
const postUserAuth = async (param) => {
  //console.log('param: ' + JSON.stringify(param));
  return await fetch(`https://localhost:5278/api/users/authenticate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(param),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json), savingJwtTokenInLocalStorage(json);
    })
    .catch((e) => console.error(e));
};

// POST
const postUser = async (param) => {
  //console.log('param: ' + JSON.stringify(param));
  return await fetch(`https://localhost:5278/api/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(param),
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((e) => console.error(e));
};

// PUT
const putUser = async (id, param) => {
  token = validateToken();

  return await fetch(`https://localhost:5278/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(param),
  })
    .then((response) => console.log(response.status))
    .catch((error) => console.error(error));
};

// GET
const getUser = async (id, token) => {
  token = validateToken();

  return await fetch(`https://localhost:5278/api/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};

// DELETE
const deleteUser = async (id) => {
  token = validateToken();

  return await fetch(`https://localhost:5278/api/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `${token}`,
    },
  })
    .then((response) => console.log(response.status))
    .catch((error) => console.error(error));
};

// Post User
// {
//   "id": "string",
//   "name": "string",
//   "email": "string",
//   "password": "string",
//   "role": 0
// }
