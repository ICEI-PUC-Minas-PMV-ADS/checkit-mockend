import axios from "axios";
import validateToken from "./ValidateToken";

const api = axios.create({
  baseURL: "https://localhost:5278/api",
  //timeout: 10000,
});

export const login = async (email, password) => {
  //console.log(email, password);
  const response = await api.post("/users/authenticate", { email, password });

  // Salva no local storage
  localStorage.setItem("jwtToken", JSON.stringify(response.data));
  //console.log(response.data);
  return response.data;
};

export const register = async (name, email, password, role = 1) => {
  const response = await api.post("/users", { name, email, password, role });
  return response.data;
};

export const getTodos = async (id) => {
  const token = validateToken();
  console.log(`${token}`);
  const response = await api.get(`/tarefas/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  console.log(response.data);
  return response.data;
};

// export const createTodo = async (todo, token) => {
//   const response = await api.post('/todos', todo, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// };

// export const deleteTodo = async (id, token) => {
//   const response = await api.delete(`/todos/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// };
