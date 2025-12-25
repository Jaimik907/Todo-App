'use client'
import { useState } from "react";
import AddEditTask from "./AddNewTask";
import OpenTodoModal from "./OpenTodoModal";
import { Button } from "./ui/button";

interface Props {
    children: React.ReactNode;
}
const OpenTodoModalButton = ({ children }: Props) => {
    const [open, setIsOpen] = useState(false);

    const onClickOfAddNewTask = () => {
        setIsOpen(!open)
    }

    return (
        <>
            <Button className="uppercase" onClick={onClickOfAddNewTask}>
                {children}
            </Button>
            <OpenTodoModal
                open={open}
                isModalOpen={onClickOfAddNewTask}
                headerTitle={<p className="text-center font-bold">Add New Task</p>}
            >
                <AddEditTask isModalOpen={onClickOfAddNewTask} />
            </OpenTodoModal>
        </>

    )

}

export default OpenTodoModalButton