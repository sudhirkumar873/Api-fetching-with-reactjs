import React, { useEffect, useState } from 'react';
import './style.css';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch('https://dummyjson.com/todos');
        if (!res.ok) {
          throw new Error('Network having error');
        }
        const result = await res.json();
        setTodos(result.todos);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchTodos();
  }, []);
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <h1>Todo List</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.todo}</td>
              <td>{todo.completed ? 'Completed' : 'Not Completed'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
