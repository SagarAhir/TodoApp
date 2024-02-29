import {
  ADD_TODO,
  DELETE_TODO,
  SET_TODO_LIST,
  UPDATE_TODO,
} from "../actionTypes";

const initialState = {
  todo_list: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { id, task, status } = action.payload;
      return {
        ...state,
        todo_list: [...state.todo_list, { id, task, status }],
      };
    }
    case DELETE_TODO: {
      const { id } = action.payload;
      return {
        ...state,
        todo_list: state.todo_list.filter((todo) => todo.id != id),
      };
    }
    case UPDATE_TODO: {
      const { id, task, status } = action.payload;
      const tempList = state.todo_list.map((item) => {
        if (item?.id === id) return { ...item, task, status };
        return item;
      });
      return {
        ...state,
        todo_list: tempList,
      };
    }
    case SET_TODO_LIST: {
      return {
        ...state,
        todo_list: action.payload.todoList,
      };
    }
    default:
      return state;
  }
}
