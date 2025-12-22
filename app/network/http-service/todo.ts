export interface Todo {
  id: string;
  task: string;
  isComplete: boolean;
}

export interface IResponse<T> {
  message: string;
  success: boolean;
  status: number;
  data: T;
}

export interface ITodo {
  tasks: Todo[];
}

export type ITodoData = Todo[];

export interface ITodoPayload {
  task: string;
}

export interface IAddTodoResponse {
  id: number;
  task: string;
  isComplete: boolean;
}

export type status = 'complete' | 'incomplete' | 'all';

export async function fetchTodoList(status: status): Promise<IResponse<ITodo>> {
  const res = await fetch(`/api/todo?sortBy=${status}`, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
    cache: 'no-store',
  });
  return res.json();
}

export async function addTodo(payload: ITodoPayload) {
  const res = await fetch('/api/todo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function deleteTodos(id: string) {
  const res = await fetch(`/api/todo/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  return res.json();
}

export async function updateCompleteTodoStatus(
  id: string,
  taskStatus: boolean
) {
  const res = await fetch(`/api/todo/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: taskStatus }),
  });
  return res.json();
}

export async function updateTask(id: string, task: string) {
  const res = await fetch(`/api/todo/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task: task }),
  });
  return res.json();
}

export async function getTaskById(id: number) {
  const res = await fetch(`/api/todo/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return res.json();
}
