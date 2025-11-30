'use client';
import { useTodo } from "@/app/network/hooks/useTodo";
import { Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import AddEditTask from "../AddNewTask";
import OpenTodoModal from "../OpenTodoModal";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { toast } from "sonner";


const TodoList = () => {

    const [open, setOpen] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number>(0);

    const { fetchList, deleteTodo, updateCompleteStatus } = useTodo();
    const { data: todoListData, isLoading } = fetchList;

    const onClickOfSelectButton = useCallback(async (id: string) => {
        const task = todoListData?.find((data) => data.id === id);

        let isTaskCompleted = !task?.isComplete;
        await updateCompleteStatus.mutateAsync({ id: id, taskStatus: isTaskCompleted })

    }, [todoListData]);

    const isModalOpen = () => {
        setOpen(!open)
    }

    const isDeleteModalOpen = (id?: string) => {
        setOpenDeleteModal(!openDeleteModal)
        setSelectedId(Number(id))
    }

    const isEditModalOpen = (id?: string) => {
        setOpen(!open)
        setSelectedId(Number(id))
    }

    const onClickOfSubmit = async () => {
        const res = await deleteTodo.mutateAsync({ id: selectedId });
        if (res.success) {
            toast(res.message);
        }
        isDeleteModalOpen();
    }

    if (isLoading) {
        return <div className="flex justify-center"><Loader2 /></div>
    }

    return (
        <>
            <div className="w-full mx-auto rounded-t-sm border border-gray-200 shadow-sm bg-white">
                <div className="w-full items-center flex justify-between bg-gray-100 px-4 py-2 rounded-t-sm">
                    <span className="text-sm font-medium text-gray-700 uppercase">Tasks</span>
                    <span className="text-sm font-medium text-gray-700 uppercase">Actions</span>
                </div>
                <div className="w-full flex flex-col px-4 py-2 divide-y divide-gray-100">

                    {todoListData?.map((todo) => (
                        <div className="flex justify-between" key={todo.id}>
                            <div className="flex items-center gap-2 py-4 w-64">
                                <Checkbox
                                    onCheckedChange={() => onClickOfSelectButton(todo.id)}
                                    id={todo.id}
                                    checked={todo.isComplete}
                                />
                                <Label
                                    htmlFor={todo.id}
                                    className={`${todo.isComplete ? "line-through" : ""} truncate w-40`}
                                >
                                    {todo.task}
                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button disabled={todo.isComplete} variant={'outline'} size={'sm'} onClick={() => isEditModalOpen(todo.id)}>Edit</Button>
                                <Button disabled={todo.isComplete} variant={'destructive'} size={'sm'} onClick={() => isDeleteModalOpen(todo.id)}>Delete</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <OpenTodoModal open={open} isModalOpen={isModalOpen} headerTitle={<p className="text-center font-bold">Edit Todo Title</p>}>
                <AddEditTask isModalOpen={isModalOpen} isEditMode selectedTask={selectedId} />
            </OpenTodoModal>
            <OpenTodoModal open={openDeleteModal} isModalOpen={isDeleteModalOpen} headerTitle={
                <p>Are you sure you want to delete this Todo?</p>
            }>
                <div className="flex justify-end items-center">
                    <Button type="submit" onClick={() => onClickOfSubmit()}>Submit</Button>
                </div>
            </OpenTodoModal>
        </>
    )
}

export default TodoList;