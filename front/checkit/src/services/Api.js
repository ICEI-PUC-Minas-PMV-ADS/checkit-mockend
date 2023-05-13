import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:5278/api",
  //timeout: 10000,
});

export const login = async (email, pass) => {
  const response = await api.post("/login", { email, pass });
  return response.data;
};

export const register = async (name, email, pass, role = 1) => {
  console.log(pass);
  const response = await api.post("/Users", { name, email, pass, role });
  return response.data;
};

export const getTodos = async (token) => {
  const response = await api.get("/todos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
