import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTodos,
  toggleCompletedTodo,
  removeTodo,
  addTodo,
} from "./reducers/todo.reducer";
import {
  getTodos,
  deleteTodo,
  updateTodo,
  storeTodo,
  TodoSyncException,
} from "./services/todo.service";
import "./App.css";

function App() {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [synchorinized, setSynchorinized] = useState(false);
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    getTodos()
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        }
      })
      .then((syncTodos) => {
        dispatch(setTodos(syncTodos));
        setSynchorinized(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch]);

  const handleOnToggleCompletedToto = (id, completed) => {
    setSynchorinized(false);
    completed = completed ? false : true;
    updateTodo(id, { completed: completed })
      .then((result) => {
        return result.status === 200;
      })
      .then((success) => {
        if (success) {
          dispatch(toggleCompletedTodo({ id: id, completed: completed }));
          setSynchorinized(true);
        } else {
          throw new TodoSyncException("Unable to update todo!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOnDeleteTodo = (id) => {
    setSynchorinized(false);
    deleteTodo(id)
      .then((result) => {
        return result.status === 200;
      })
      .then((success) => {
        if (success) {
          dispatch(removeTodo(id));
          setSynchorinized(true);
        } else {
          throw new TodoSyncException("Unable to remove todo!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleOnAddTodo = (e) => {
    e.preventDefault();
    if (title) {
      setSynchorinized(false);
      let todo = {
        userId: 1,
        title: title,
        completed: false,
      };
      storeTodo(todo)
        .then((result) => {
          return {
            success: result.status === 201 || result.status === 200,
            todo: result.data,
          };
        })
        .then((result) => {
          if (result.success) {
            dispatch(addTodo(result.todo));
            setTitle("");
            setSynchorinized(true);
          } else {
            throw new TodoSyncException("Unable to create new Todo!");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const countUndoneTask = () => {
    if (!todos) return 0;
    return todos.filter((todo) => {
      return todo.completed === false;
    }).length;
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header-info">
          <div>
            <h1>Todos</h1>
            <p>
              {synchorinized
                ? "You have " + countUndoneTask() + " task to do."
                : "Loading, please wait !"}
            </p>
          </div>
          <div className="App-header-sync-loader">
            <small>
              <i>{synchorinized ? "Syncronized !" : "Synchronization..."}</i>
            </small>
          </div>
        </div>
        <form className="App-header-form" onSubmit={handleOnAddTodo}>
          <input
            type="text"
            placeholder="Add new task to do..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">
            <i className="fas fa-plus"></i>
          </button>
        </form>
      </header>
      <div className={`App-todos ${expanded ? "App-todos--expanded" : ""}`}>
        {todos &&
          todos.length > 0 &&
          todos.map((todo, index) => {
            return (
              <div
                className={`App-todo ${
                  todo.completed ? "App-todo--completed" : ""
                }`}
                key={`todo--${index}`}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() =>
                      handleOnToggleCompletedToto(todo.id, todo.completed)
                    }
                  />{" "}
                  {todo.title}
                </label>
                <button
                  type="button"
                  onClick={() => handleOnDeleteTodo(todo.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            );
          })}
      </div>
      {todos && todos.length > 0 && (
        <footer className="App-footer">
          <button
            type="button"
            className="App-footer-expand-todos"
            onClick={() => setExpanded(expanded === true ? false : true)}
          >
            <i
              className={`fas ${
                expanded ? "fa-chevron-up" : "fa-chevron-down"
              }`}
            ></i>{" "}
            {expanded ? "Hide some todos" : "Show all todos"}
          </button>
        </footer>
      )}
      <div className="App-copyright">
        <small>
          Made with <i className="fas fa-heart"></i> by Mendrika Rabeh.
        </small>
        <small>
          Powered by <a href="https://jsonplaceholder.typicode.com/" target="_blank">Typicode JSONPlaceholder</a>
        </small>
      </div>
    </div>
  );
}

export default App;
