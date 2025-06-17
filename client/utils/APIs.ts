const USER_BASE_URL = `/api/user`;
const TODO_BASE_URL = `/api/todo`;

export const signup = `${USER_BASE_URL}/signup`;
export const login = `${USER_BASE_URL}/login`;
export const verifyToken = `${USER_BASE_URL}/verify-token`;

export const createTodo = `${TODO_BASE_URL}/createTodo`;
export const getTodos = `${TODO_BASE_URL}/getTodos`;
export const deleteTodo = `${TODO_BASE_URL}/deleteTodo`;
export const updateTodo = `${TODO_BASE_URL}/updateTodo`;
