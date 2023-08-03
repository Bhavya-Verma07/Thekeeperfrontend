import React, { useState, useEffect } from "react";
import "./todos.css";

import axios from "axios";
import { MdDelete } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  //getting todos
  const GetTodos = () => {
    axios
      .get("/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error: ", error));
  };

  // adding new todo
  const addTodo = async () => {
    const response = await axios.post("/todo/new", {
      newTodo: newTodo,
    });
    alert("Task saved successfully");

    setTodos([...todos, response.data]);
    setPopupActive(false);
    setNewTodo("");
  };

  //check uncheck
  const completeTodo = async (id, type) => {
    const response = await axios.get(`/todo/complete/${id}/${type}`);
    GetTodos();
  };

  //deleting todos
  const deleteTodo = async (id) => {
    const response = await axios.delete(`/todo/delete/${id}`);
    alert("Task Deleted");
    GetTodos();
    console.log(response.data);
  };

  useEffect(() => {
    GetTodos();
  }, []);

  return (
    <>
      <div className="App">
        <h1 style={{ textShadow: "0 0 5px grey" }}>Welcome!</h1>
        <h2
          style={{
            color: " yellow",
            textShadow: "0 0 10px black",
            marginBottom: "10px",
          }}
        >
          Your Tasks here
        </h2>

        <div className="todos">
          {todos.map((todo) => (
            <div
              className={todo.complete ? "todo is-complete" : "todo"}
              key={todo._id}
            >
              <div
                className="checkbox"
                onClick={() => completeTodo(todo._id, !todo.complete)}
              ></div>

              <div className="text">{todo.newTodo}</div>

              <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
                <MdDelete />
              </div>
            </div>
          ))}
        </div>
        <Tooltip title="Add new task" placement="top-end">
          <div className="addPopup" onClick={() => setPopupActive(true)}>
            +
          </div>
        </Tooltip>

        {popupActive ? (
          <div className="popup">
            <div className="closePopup" onClick={() => setPopupActive(false)}>
              X
            </div>
            <div className="content">
              <h3>Add Task</h3>
              <input
                type="text"
                className="add-todo-input"
                onChange={(e) => setNewTodo(e.target.value)}
                value={newTodo}
              />
              <div className="button" onClick={addTodo}>
                Create Task
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Todos;
