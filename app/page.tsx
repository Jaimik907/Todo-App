'use client';
import OpenTodoModalButton from "@/components/OpenTodoButton";
import TodoList from "@/components/TodoComponents/TodoList";
import TodoSelect from "@/components/TodoComponents/TodoSelect";
import { useState } from "react";
import { status } from "./network/http-service/todo";

export default function Home() {

  const selectOptions = [
    { label: 'All', value: 'all' },
    { label: 'Complete', value: 'complete' },
    { label: 'Incomplete', value: 'incomplete' },
  ]

  const [selected, setSelected] = useState<status>('all');

  const onValueChange = (value: status) => {
    setSelected(value)
  }

  return (
    <>
      <main className="max-w-4xl mx-auto mt-4">
        <div className="text-center my-5 flex flex-col gap-4">
          <h1>Todo List</h1>
          <OpenTodoModalButton>Add New Task +</OpenTodoModalButton>
        </div>
        <div className="my-5 flex justify-end items-center gap-2">
          Sort By: <TodoSelect onValueChange={onValueChange} value={selected} className={"w-[180px]"} items={selectOptions} placeholder="Select..." />
        </div>
        <TodoList status={selected}/>
      </main>
    </>
  );
}
