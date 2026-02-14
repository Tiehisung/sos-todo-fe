import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import type { ITodo } from "./types/todo";
const API_URL =  "http://localhost:3001/api";

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTodos = async () => {
    try {
      const res = await fetch(`${API_URL}/todos`);
      const data = await res.json();
      setTodos(data);
      setLoading(false);
    } catch (error) {
      console.log("Error loading todoes:", error);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async (text: string) => {
    await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    loadTodos();
  };

  const deleteTodo = async (id: string) => {
    await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
    });

    loadTodos();
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 600,
        marginTop: 60,
        padding: 24,
        borderRadius: 12,
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      }}
    >
      <h1>📝 Todo App</h1>

      <TodoInput onAdd={addTodo} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todos={todos} onDelete={deleteTodo} />
      )}
    </div>
  );
}

export default App;
