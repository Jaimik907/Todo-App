'use client'
import { useTodo } from "@/app/network/hooks/useTodo";
import { ITodoPayload } from "@/app/network/http-service/todo";
import { useModalForm } from "@/hooks/useModalForm";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import TodoInput from "./TodoComponents/TodoInput";
import { Button } from "./ui/button";
import { useEffect } from "react";

interface Props {
    isModalOpen: (id?: string) => void;
    isEditMode?: boolean;
    selectedTask?: number;
}

const AddEditTask = ({ isModalOpen, isEditMode = false, selectedTask }: Props) => {
    const { methods } = useModalForm();
    const { handleSubmit, control, reset } = methods;
    const { insertTodo, updateTodo, getTask } = useTodo();
    const { data: task } = getTask(selectedTask || 0, {
        enabled: isEditMode && Boolean(selectedTask),
    });

    useEffect(() => {
        if (isEditMode && task) {
            reset({ task })
        }
    }, [task, reset])

    const onSubmit = async (data: ITodoPayload) => {
        try {
            if (isEditMode) {
                const res = await updateTodo.mutateAsync({ id: selectedTask, task: data.task })
                if (res.success) {
                    toast(res.message)
                    isModalOpen()
                }
                return;
            }


            const res = await insertTodo.mutateAsync(data);
            if (res.success) {
                toast(res.message);
                isModalOpen();
            }
        }
        catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full flex gap-3">
                        <TodoInput name="task" control={control} placeholder="Type here" />
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddEditTask