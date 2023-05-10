// POST
const formPost = document.querySelector("#form-post");

formPost.addEventListener("submit", (event) => {
  event.preventDefault();

  const projetoId = event.target.querySelector(".projetoid").value;
  const titulo = event.target.querySelector(".titulo").value;
  const descricao = event.target.querySelector(".descricao").value;
  const vencimento = event.target.querySelector("#dateVenc").value;
  const prioridade = event.target.querySelector(".prioridade").value;

  const objTask = {
    projectId: projetoId,
    tituloTarefa: titulo,
    descricao: descricao,
    dataInicio: Date.now,
    dataVencimento: vencimento,
    prioridade: prioridade,
  };

  console.log(objTask);

  postTask(objTask);
});

// PUT
const formPut = document.querySelector("#form-put");

formPut.addEventListener("submit", (event) => {
  event.preventDefault();

  const id = event.target.querySelector(".id").value;
  const projetoId = event.target.querySelector(".projetoid").value;
  const titulo = event.target.querySelector(".titulo").value;
  const descricao = event.target.querySelector(".descricao").value;
  const vencimento = event.target.querySelector("#dateVenc").value;
  const prioridade = event.target.querySelector(".prioridade").value;

  const objTask = {
    id: id,
    projectId: projetoId,
    tituloTarefa: titulo,
    descricao: descricao,
    dataInicio: Date.now,
    dataVencimento: vencimento,
    prioridade: prioridade,
  };

  console.log(objTask);

  putTask(objTask);
});

// GET
const btnGet = document.querySelector(".btnGet");

btnGet.addEventListener("click", (e) => {
  e.preventDefault();

  const getTaskId = document.querySelector(".getTaskId").value;
  //console.log('getTaskId.value: ' + getTaskId);

  getTask(getTaskId);
});

// DELETE
const btnDelete = document.querySelector(".btnDelete");

btnDelete.addEventListener("click", (e) => {
  e.preventDefault();

  const deleteTaskId = document.querySelector(".deleteTaskId").value;
  //console.log('deleteTaskId.value: ' + deleteTaskId);

  deleteTask(deleteTaskId);
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
// https://localhost:5278/api/tarefas/

// POST
const postTask = async (param) => {
  token = validateToken();
  //console.log(token);
  //console.log('param: ' + JSON.stringify(param));
  return await fetch(`https://localhost:5278/api/tarefas/`, {
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
const putTask = async (param) => {
  // console.log('param: ' + JSON.stringify(param));
  return await fetch(`https://localhost:5278/api/tarefas/${param.id}`, {
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
const getTask = async (id) => {
  //console.log('GET: ' + id)
  token = validateToken();
  return await fetch(`https://localhost:5278/api/tarefas/${id}`, {
    method: "GET",
    headers: { Authorization: `${token}` },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};

// DELETE
const deleteTask = async (id) => {
  //console.log('DELETE: ' + id)
  return await fetch(`https://localhost:5278/api/tarefas/${id}`, {
    method: "DELETE",
    headers: { Authorization: `${token}` },
  })
    .then((response) => console.log(response.status))
    .catch((error) => console.error(error));
};

// MODELO SWAGGER POST
// {
//   "links": [],
//   "projectId": "64443d4ab155da62b40d64fd",
//   "tituloTarefa": "Contratar pedreiro",
//   "descricao": "Seu Valdir",
//   "dataInicio": "2023-04-22T18:35:05.334Z",
//   "dataVencimento": "2023-04-22T18:35:05.334Z",
//   "prioridade": 0
// }

// MODELO SWAGGER PUT
//  {
// 	"id": "64443d0709601a8510eb6f5b",
// 	"projectId": "644428cfc20e073f29484587",
// 	"tituloTarefa": "Comprar Placa Mãe",
// 	"descricao": "ASUS",
// 	"dataInicio": "2023-04-22T18:35:05.334Z",
// 	"dataVencimento": "2023-04-22T18:35:05.334Z",
//   "prioridade": 0
//  }
