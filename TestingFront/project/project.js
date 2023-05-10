// POST
const formPost = document.querySelector("#form-post");

formPost.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = event.target.querySelector("#title").value;
  const createdBy = event.target.querySelector("#createdBy").value;
  const updatedBy = event.target.querySelector("#updatedBy").value;
  const dueDate = event.target.querySelector("#dueDate").value;
  const member = event.target.querySelector("#member").value;
  const status = event.target.querySelector("#status").value;

  const objProject = {
    title: title,
    createdBy: createdBy,
    updatedBy: updatedBy,
    dueDate: dueDate,
    member: [
      {
        id: "",
        name: "",
        password: "",
      },
    ],
    status: status,
  };

  console.log(objProject);

  postProject(objProject);
});

// PUT
const formPut = document.querySelector("#form-put");

formPut.addEventListener("submit", (event) => {
  event.preventDefault();

  const id = event.target.querySelector("#idProject").value;
  const title = event.target.querySelector("#title").value;
  const createdBy = event.target.querySelector("#createdBy").value;
  const updatedBy = event.target.querySelector("#updatedBy").value;
  const dueDate = event.target.querySelector("#dueDate").value;
  const member = event.target.querySelector("#member").value;
  const status = event.target.querySelector("#status").value;

  const objProject = {
    title: title,
    createdBy: createdBy,
    updatedBy: updatedBy,
    dueDate: dueDate,
    member: [
      {
        id: "",
        name: "",
        password: "",
      },
    ],
    status: status,
  };

  console.log(objProject);

  putProject(id, objProject);
});

// GET
const btnGet = document.querySelector("#btnGet");

btnGet.addEventListener("click", (e) => {
  e.preventDefault();

  const getProjectId = document.querySelector("#getProjectId").value;
  //console.log('getTaskId.value: ' + getTaskId);

  getProject(getProjectId);
});

// DELETE
const btnDelete = document.querySelector("#btnDelete");

btnDelete.addEventListener("click", (e) => {
  e.preventDefault();

  const deleteProjectId = document.querySelector("#deleteProjectId").value;
  //console.log('deleteTaskId.value: ' + deleteTaskId);

  deleteProject(deleteProjectId);
});

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
// https://localhost:5278/api/projects/

// POST
const postProject = async (param) => {
  //console.log('param: ' + JSON.stringify(param));
  token = validateToken();
  return await fetch(`https://localhost:5278/api/projects/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(param),
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((e) => console.error(e));
};

// PUT
const putProject = async (id, param) => {
  //console.log('param: ' + JSON.stringify(param));
  //console.log('param.id: ' + id)
  token = validateToken();
  return await fetch(`https://localhost:5278/api/projects/${id}`, {
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
const getProject = async (id) => {
  //console.log('GET: ' + id)
  token = validateToken();
  return await fetch(`https://localhost:5278/api/projects/${id}`, {
    method: "GET",
    headers: { Authorization: `${token}` },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};

// DELETE
const deleteProject = async (id) => {
  //console.log('DELETE: ' + id)
  token = validateToken();
  return await fetch(`https://localhost:5278/api/projects/${id}`, {
    method: "DELETE",
    headers: { Authorization: `${token}` },
  })
    .then((response) => console.log(response.status))
    .catch((error) => console.error(error));
};

//  PROJECT MODEL
// {
//   "title": "string",
//   "createdBy": "string",
//   "updatedBy": "string",
//   "dueDate": "2023-04-29T12:03:56.968Z",
//   "member": [
//     {
//       "id": "string",
//       "name": "string",
//       "password": "string"
//     }
//   ],
//     "status": "string"
// }
