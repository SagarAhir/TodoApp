import {
  ADD_TODO,
  DELETE_TODO,
  SET_TODO_LIST,
  UPDATE_TODO,
} from "./actionTypes";

let nextTodoId = 0;

export const addTodo = ({ task, status, refId }) => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    task,
    status,
    refId,
  },
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: {
    id,
  },
});

export const updateTodo = ({ id, task, status }) => ({
  type: UPDATE_TODO,
  payload: {
    id,
    task,
    status,
  },
});

export const setTodoList = ({ todoList }) => ({
  type: SET_TODO_LIST,
  payload: {
    todoList,
  },
});
