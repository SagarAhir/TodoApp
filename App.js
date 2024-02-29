import * as React from "react";

// Import Redux
import store from "./src/redux/store";
import { Provider } from "react-redux";
import "firebase/firestore";
import TodoApp from "./src/screens/TodoApp";

const App = () => {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
};

export default App;
