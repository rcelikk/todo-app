const API_URL = import.meta.env.VITE_API_URL;

export type Todo = {
    id: number;
    title: string;
    isDone: boolean;
};

export async function getTodos(): Promise<Todo[]> {
    const res = await fetch(`${API_URL}/api/todos`);
    if (!res.ok) throw new Error("Todo'lar alınamadı");
    return res.json();
}

export async function createTodo(title: string): Promise<Todo> {
    const res = await fetch(`${API_URL}/api/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error("Todo eklenemedi");
    return res.json();
}

export async function updateTodo(todo: Todo): Promise<void> {
    const res = await fetch(`${API_URL}/api/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
    });
    if (!res.ok) throw new Error("Todo güncellenemedi");
}

export async function deleteTodo(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/api/todos/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Todo silinemedi");
}