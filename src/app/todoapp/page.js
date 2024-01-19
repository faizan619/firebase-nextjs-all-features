"use client";
import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

async function addTodoToFirebase(title, details, dueDate) {
  try {
    const docRef = await addDoc(collection(db, "todos"), {
      title: title,
      details: details,
      dueDate: dueDate,
      createdAt: serverTimestamp(),
    });
    console.log("todos added with ID: ", docRef.id);
    return true;
  } catch (e) {
    console.error("Errr adding todo: ", e);
    return false;
  }
}

async function fetchTodosFromFirestore() {
  const todosCollection = collection(db, "todos");
  const querySnapshot = await getDocs(
    query(todosCollection, orderBy("createdAt", "desc"))
  );
  const todos = [];
  querySnapshot.forEach((doc) => {
    const todoData = doc.data();
    todos.push({ id: doc.id, ...todoData });
  });
  return todos;
}

// delete todos
async function deleteTodoFromFirestore(todoId) {
  try {
    console.log("Attempting to delete todo with ID: ", todoId);
    await deleteDoc(doc(db, "todos", todoId));
    return todoId;
  } catch (e) {
    console.error("Error deleting the todoId: ", e);
    return null;
  }
}

export default function Page() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [todos, setTodos] = useState([]);

  const [selectedTodo, setSelectedTodo] = useState(null);

  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdateMode) {
      if (selectedTodo) {
        try {
          const updateTodo = {
            title,
            details,
            dueDate,
          };

          const todoRef = doc(db, "todos", selectedTodo.id);
          await updateDoc(todoRef, updateTodo);

          setTitle("");
          setDetails("");
          setDueDate("");
          setSelectedTodo("");
          setIsUpdateMode("");

          alert("Todo Updated Successfully!");
        } catch (e) {
          console.error("Error updating todo: ", e);
        }
      }
    } else {
      const added = await addTodoToFirebase(title, details, dueDate);
      if (added) {
        setTitle("");
        setDetails("");
        setDueDate("");

        alert("Todo added to firestore successfully!!");
      }
    }
  };

  // fetch todos from firestore on component mount

  useEffect(() => {
    async function fetchTodos() {
      const todos = await fetchTodosFromFirestore();
      setTodos(todos);
    }
    fetchTodos();
  }, []);

  // function to hundle "update button click"
  const handleUpdateClick = (todo) => {
    // set the selected todo's values to the form fields
    setTitle(todo.title || "");
    setDetails(todo.details || "");
    setDueDate(todo.dueDate || "");

    setSelectedTodo(todo);
    setIsUpdateMode(true);
  };

  // fetch todos from firestore on component mount
  useEffect(() => {
    async function fetchTodos() {
      const todos = await fetchTodosFromFirestore();
      setTodos(todos);
    }
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <h1>Todo app</h1>
      <section>
        <div>
          <h2>{isUpdateMode ? "Update your Todo" : "Create a Todo"}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title</label>
              <div>
                <input
                  id="title"
                  className="text-black"
                  name="title"
                  type="text"
                  autoComplete="off"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="details">Details</label>
              <div>
                <input
                  id="details"
                  className="text-black"
                  name="details"
                  type="text"
                  autoComplete="off"
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="title">DueDate</label>
              <div>
                <input
                  id="dueDate"
                  className="text-black"
                  name="dueDate"
                  type="date"
                  autoComplete="off"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
              type="submit">{isUpdateMode? "Update Todo":"Create Todo"}</button>
            </div>

          </form>
        </div>
      </section>
      <section>
        <div>
          <h2>Todo List</h2>
          <div>
            {
              todos.map((todo)=>(
                <div key={todo.id}>
                  <h3>Title: {todo.title}
                  </h3>
                    <p>
                      Due Date: {todo.dueDate}
                    </p>
                    <p>
                      {todo.details}
                    </p>
                    <div>
                      <button
                        type="button"
                        onClick={()=> handleUpdateClick(todo)}
                      >Update</button>
                      <button type="button" onClick={async ()=>{
                        const deleteTodoId = await deleteTodoFromFirestore(todo.id);
                        if(deleteTodoId){
                          const updateTodos = todos.filter((t)=> t.id !== deleteTodoId);
                          setTodos(updateTodos);
                        }
                      }}>Delete</button>
                    </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
}
