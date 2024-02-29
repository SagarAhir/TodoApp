import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import Constants from "expo-constants";

// You can import from local files
import Spacer from "../components/Spacer";
import ButtonIcon from "../components/ButtonIcon";
import AppToggle from "../components/AppToggle";
import AppTextInput from "../components/AppTextInput";

// or any pure javascript modules available in npm
import {
  Paragraph,
  Card,
  Button,
  Modal,
  ActivityIndicator,
} from "react-native-paper";
import { FontAwesome as Icon } from "@expo/vector-icons";

// Import Redux and React Redux Dependencies
import { connect } from "react-redux";
import { addTodo, deleteTodo, updateTodo, setTodoList } from "../redux/actions";
import {
  FirebaseServices,
  TODOS_COLLECTION,
} from "../firebase/firebaseServices";
import { collection, onSnapshot } from "firebase/firestore";
import { FirestoreDB } from "../firebase/firebaseConfig";

// Test Data
// const data = [
//   {id: 1, task: "Do this stuff"},
//   {id: 2, task: "Do another stuff"},
// ]

const TodoApp = ({
  todo_list,
  addTodo,
  deleteTodo,
  updateTodo,
  setTodoList,
}) => {
  const [visible, setVisible] = useState(false);
  const [temp, setTemp] = useState(null);
  const [loader, setLoader] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [todoList, setTodosList] = useState([]);

  useEffect(() => {
    fetchAllTodos();

    const todoCollectionRef = collection(FirestoreDB, TODOS_COLLECTION);
    const subscriber = onSnapshot(todoCollectionRef, {
      next: (snapshot) => {
        const todos = [];
        snapshot.docs.forEach((doc) => {
          todos.push({
            refId: doc.id,
            ...doc.data(),
          });
        });
        // setTodoList({ todoList: todos });
        setTodosList(todos);
      },
    });

    return () => subscriber();
  }, []);

  const fetchAllTodos = async () => {
    setIsDataLoading(true);
    const resTodoList = await FirebaseServices.GetAllTodos();
    // setTodoList({ todoList: resTodoList });
    todoList(resTodoList);
    setIsDataLoading(false);
  };

  const handleAddTodo = async (task) => {
    setLoader(true);
    await FirebaseServices.AddTodo({ task, status: "due" });
    setLoader(false);
  };

  const handleDeleteTodo = async (item) => {
    setLoader(true);
    await FirebaseServices.DeleteTodo(item.refId);
    setLoader(false);
    // deleteTodo(item.id);
  };

  const handleUpdateTodo = (item) => {
    // updateTodo(item);
    setLoader(true);
    FirebaseServices.UpdateTodo(item);
    setLoader(false);
  };

  const onStatusChange = (item, newStatus) => {
    handleUpdateTodo({ ...item, status: newStatus });
  };

  const onTaskChange = (newText) => {
    handleUpdateTodo({ ...temp, task: newText });
    setVisible(false);
    setTemp(null);
  };

  const onPressEdit = (item) => {
    setTemp(item);
    setVisible(true);
  };

  const renderEmptyComponent = () => {
    return isDataLoading && todoList.length ? (
      <View style={styles.emptyContainer}>
        <ActivityIndicator />
      </View>
    ) : (
      <View style={styles.emptyContainer}>
        <Text style={styles.paragraph}>No todo item available</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loader && (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      )}
      <Card title="Card Title">
        <Text style={styles.paragraph}>
          ToDo App with React Native and Redux
        </Text>
      </Card>
      <Spacer />
      <AppTextInput
        title={"Add Todo Here"}
        buttonText={"Add Task"}
        onPress={handleAddTodo}
        value={""}
      />
      <Spacer />
      <FlatList
        data={todoList}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styles.flContainer}
        renderItem={({ item, index }) => {
          const activeColor =
            item?.status === "due"
              ? "yellow"
              : item?.status === "done"
              ? "green"
              : "red";
          return (
            <View key={`TodoItem-${index}`}>
              <Card style={[styles.item, { borderColor: activeColor }]}>
                <Card.Title
                  title={`Task#${item.id ?? item.refId.substring(0, 3)}`}
                  left={(props) => (
                    <Icon name="tasks" size={24} color="black" />
                  )}
                  right={(props) => (
                    <ButtonIcon
                      iconName="close"
                      color="red"
                      onPress={() => handleDeleteTodo(item)}
                    />
                  )}
                />
                <Card.Content>
                  <Paragraph>{item.task}</Paragraph>
                </Card.Content>
                <View style={styles.editBar}>
                  <AppToggle
                    selectedValue={item?.status}
                    activeColor={activeColor}
                    onChangeSelectedValue={(newValue) =>
                      onStatusChange(item, newValue)
                    }
                  />
                  <Button
                    icon="pencil"
                    style={styles.editButton}
                    mode="outlined"
                    onPress={() => onPressEdit(item)}
                  >
                    {"EDIT"}
                  </Button>
                </View>
              </Card>
              <Spacer />
            </View>
          );
        }}
      />
      <Spacer />
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        contentContainerStyle={styles.modalContainer}
      >
        <AppTextInput
          title={"Edit Task"}
          value={temp?.task}
          buttonText={"Submit"}
          onPress={onTaskChange}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  item: {
    borderWidth: 3,
  },
  editBar: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    justifyContent: "space-between",
  },
  editButton: {
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: { backgroundColor: "white", padding: 20 },
  loader: {
    flex: 1,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  flContainer: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = (state, ownProps) => {
  console.log(state.todos.todo_list);
  return {
    todo_list: state.todos.todo_list,
  };
};

const mapDispatchToProps = { addTodo, deleteTodo, updateTodo, setTodoList };

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
