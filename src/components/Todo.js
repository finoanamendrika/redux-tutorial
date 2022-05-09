import React from "react";

const Todo = ({ todo, handleOnToggleCompletedToto, handleOnDeleteTodo }) => {
  return (
    <div className={`App-todo ${todo.completed ? "App-todo--completed" : ""}`}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleOnToggleCompletedToto(todo.id, todo.completed)}
        />{" "}
        {todo.title}
      </label>
      <button type="button" onClick={() => handleOnDeleteTodo(todo.id)}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default Todo;
