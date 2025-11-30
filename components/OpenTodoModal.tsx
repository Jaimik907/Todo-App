'use client'
import AddNewTask from "./AddNewTask";
import { TodoModal } from "./TodoComponents/TodoModal";

interface Props {
    children: React.ReactElement;
    open: boolean;
    isModalOpen: () => void;
    headerTitle?: string | React.ReactElement;
}

const OpenTodoModal = ({ children, open, isModalOpen, headerTitle }: Props) => {
    return (
        <TodoModal
            open={open}
            component={children}
            headerTitle={headerTitle}
            isModalOpen={isModalOpen}
            dialogSize={"max-w-400"}
        />
    )
}

export default OpenTodoModal;