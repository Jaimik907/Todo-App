import OpenTodoModalButton from "@/components/OpenTodoButton";
import TodoList from "@/components/TodoComponents/TodoList";

export default function Home() {

  return (
    <>
      <main className="max-w-4xl mx-auto mt-4">
        <div className="text-center my-5 flex flex-col gap-4">
          <h1>Todo List</h1>
          <OpenTodoModalButton>Add New Task +</OpenTodoModalButton>
        </div>
        <TodoList />
      </main>
    </>
  );
}
