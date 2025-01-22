import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Buy groceries", completed: false, priority: "High", notes: "" },
    { id: 2, text: "Finish project report", completed: false, priority: "Medium", notes: "" },
    { id: 3, text: "Call the bank", completed: false, priority: "Low", notes: "" },
    { id: 4, text: "Schedule dentist appointment", completed: false, priority: "Medium", notes: "" },
    { id: 5, text: "Plan weekend trip", completed: false, priority: "Low", notes: "" },
  ]);

  const [newTask, setNewTask] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Low");
  const [filterPriority, setFilterPriority] = useState("All");
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [note, setNote] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask, completed: false, priority: newTaskPriority, notes: "" },
      ]);
      setNewTask("");
      setNewTaskPriority("Low");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addNote = () => {
    if (selectedTaskId && note.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === selectedTaskId ? { ...task, notes: note } : task
        )
      );
      setNote("");
    }
  };

  const filteredTasks =
    filterPriority === "All"
      ? tasks
      : tasks.filter((task) => task.priority === filterPriority);

  const completedTasks = filteredTasks.filter((task) => task.completed).length;

  return (
    <div className={`app ${theme}`}>
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>DoIt</h2>
          <div className="sidebar-icons">
            <button onClick={toggleTheme}>
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
        <p>Hey, User</p>
        <ul>
          <li className="active">Today</li>
          <li>Important</li>
          <li>Planned</li>
          <li>Assigned to me</li>
          <li>Add list</li>
        </ul>
        <div className="task-progress">
          <h3>Today Tasks</h3>
          <p>
            {completedTasks} of {filteredTasks.length}
          </p>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${(completedTasks / filteredTasks.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="header">
          <h1>To Do</h1>
          <div className="actions">
            <button>🔔</button>
            <button>♻️</button>
            <button>📅</button>
          </div>
        </header>

        <div className="task-input">
          <input
            type="text"
            placeholder="Add a Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="filter">
          <label>Filter by Priority:</label>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <section className="tasks">
          <h2>Tasks</h2>
          <ul>
            {filteredTasks.map((task) => (
              <li key={task.id} className={task.completed ? "completed" : ""}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompletion(task.id)}
                />
                <span>{task.text}</span>
                <span className={`priority ${task.priority.toLowerCase()}`}>
                  [{task.priority}]
                </span>
                <button onClick={() => deleteTask(task.id)}>❌</button>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <aside className="notes-section">
        <h2>Notes</h2>
        <div className="notes-input">
          <select
            value={selectedTaskId}
            onChange={(e) => setSelectedTaskId(Number(e.target.value))}
          >
            <option value="">Select Task</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.text}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Add a note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
          <button onClick={addNote}>Add Note</button>
        </div>

        <div className="notes-display">
          <h3>Task Notes</h3>
          <ul>
            {tasks
              .filter((task) => task.notes)
              .map((task) => (
                <li key={task.id}>
                  <strong>{task.text}:</strong> {task.notes}
                </li>
              ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default App;
