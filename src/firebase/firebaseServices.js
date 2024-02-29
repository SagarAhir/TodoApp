import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { FirestoreDB } from "./firebaseConfig";

export const TODOS_COLLECTION = "todos";

export const GetAllTodos = () => {
  return new Promise((resolve, reject) => {
    getDocs(collection(FirestoreDB, TODOS_COLLECTION))
      .then((querySnapshot) => {
        const todoList = [];
        querySnapshot.forEach((doc) => {
          todoList.push({
            refId: doc.id,
            ...doc.data(),
          });
        });
        resolve(todoList);
      })
      .catch((error) => {
        console.error("Error getting documents -> ", error);
        reject(error);
      });
  });
};

export const AddTodo = (data) => {
  return new Promise((resolve, reject) => {
    addDoc(collection(FirestoreDB, TODOS_COLLECTION), data)
      .then((docRef) => {
        resolve(docRef);
      })
      .catch((err) => {
        reject(err);
        console.log("AddTodo::err ->", err);
      });
  });
};

export const DeleteTodo = (refId) => {
  return new Promise((resolve, reject) => {
    deleteDoc(doc(collection(FirestoreDB, TODOS_COLLECTION), refId))
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
        console.log("DeleteTodo::err -> ", err);
      });
  });
};

export const UpdateTodo = (todoItem) => {
  return new Promise((resolve, reject) => {
    updateDoc(
      doc(collection(FirestoreDB, TODOS_COLLECTION), todoItem.refId),
      todoItem
    )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
        console.log("UpdateTodo::err -> ", err);
      });
  });
};

export const FirebaseServices = {
  GetAllTodos,
  AddTodo,
  DeleteTodo,
  UpdateTodo,
};
