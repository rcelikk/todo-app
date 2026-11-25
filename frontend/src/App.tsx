import { useEffect, useState } from "react";
import {
    createTodo,
    deleteTodo,
    getTodos,
    updateTodo,
    type Todo,
} from "./api";

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        getTodos().then(setTodos);
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!title.trim()) return;

        const created = await createTodo(title.trim());
        setTodos([...todos, created]);
        setTitle("");
    }

    async function handleToggle(todo: Todo) {
        const updated = { ...todo, isDone: !todo.isDone };
        await updateTodo(updated);
        setTodos(todos.map((t) => (t.id === todo.id ? updated : t)));
    }

    async function handleDelete(id: number) {
        await deleteTodo(id);
        setTodos(todos.filter((t) => t.id !== id));
    }

    return (
        <div>
            <h1>Todo'lar</h1>

            <form onSubmit={handleSubmit}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Yeni görev..."
                />
                <button type="submit">Ekle</button>
            </form>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.isDone}
                            onChange={() => handleToggle(todo)}
                        />
                        <span
                            style={{ textDecoration: todo.isDone ? "line-through" : "none" }}
                        >
              {todo.title}
            </span>
                        <button onClick={() => handleDelete(todo.id)}>Sil</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;