'use client';
import { useTodo } from "@/app/network/hooks/useTodo";
import { status, Todo } from "@/app/network/http-service/todo";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import React, { ComponentProps, useCallback, useState } from "react";
import { toast } from "sonner";
import AddEditTask from "../AddNewTask";
import OpenTodoModal from "../OpenTodoModal";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import TodoSelect from "./TodoSelect";
import TodoTable from "./TodoTable";
import TodoSort from "./TodoSort";

const TodoList = () => {

    const [open, setOpen] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [rowSelection, setRowSelection] = React.useState({});
    const [selectedStatus, setSelectedStatus] = useState<status>('all');


    const getSelectedValue = (selectedStatus: status) => {
        return setSelectedStatus(selectedStatus);
    }

    const { fetchList, deleteTodo, updateCompleteStatus } = useTodo(selectedStatus);
    const { data: todoListData, isLoading } = fetchList;

    function IndeterminateCheckbox({
        indeterminate, className = '', checked, ...rest
    }: { indeterminate?: boolean } & Omit<ComponentProps<typeof Checkbox>, 'ref'>) {
        const ref = React.useRef<HTMLButtonElement>(null);

        React.useEffect(() => {
            if (ref.current) {
                if (indeterminate) {
                    ref.current.setAttribute('data-state', 'indeterminate')
                    ref.current.setAttribute('aria-checked', 'mixed')
                } else {
                    ref.current.removeAttribute('data-state')
                    ref.current.setAttribute(
                        'aria-checked',
                        checked ? "true" : "false"
                    )
                }
            }
        }, [indeterminate, checked])

        return (
            <Checkbox
                ref={ref}
                checked={checked}
                className={className}
                {...rest}
            />
        )
    }

    const handleToggleStatus = useCallback(async (task: Todo, value: boolean) => {
        await updateCompleteStatus.mutateAsync({
            id: task.id,
            taskStatus: value
        });
    }, [updateCompleteStatus])


    const columns = React.useMemo<ColumnDef<Todo>[]>(
        () => [
            {
                id: 'select',
                cell: ({ row }) => {
                    return <IndeterminateCheckbox
                        checked={row.original.isComplete}
                        indeterminate={row.getIsSomeSelected()}
                        onCheckedChange={(value) => handleToggleStatus(row.original, !!value)}
                    />
                }
            },
            {
                accessorKey: 'task',
                id: 'task',
                header: 'Tasks',
                enableResizing: false,
                size: 600,
                cell: ({ row }) => (
                    <div className={`${row.original.isComplete ? "line-through" : ''} cursor-pointer`}>
                        {row.original.task}
                    </div>
                )
            },
            {
                accessorKey: 'action',
                id: 'action',
                enableResizing: false,
                header: 'Actions',
                cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <Button disabled={row.original.isComplete} variant={'outline'} size={'sm'} onClick={() => isEditModalOpen(row.original.id)}>Edit</Button>
                        <Button disabled={row.original.isComplete} variant={'destructive'} size={'sm'} onClick={() => isDeleteModalOpen(row.original.id)}>Delete</Button>
                    </div>
                )
            }
        ],
        []
    )

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
            <TodoSort
                selectedStatus={selectedStatus}
                getSelectedStatusValue={getSelectedValue}
            />
            <div className="w-full mx-auto rounded-t-sm border border-gray-200 shadow-sm bg-white">
                <TodoTable
                    data={todoListData!}
                    columns={columns}
                    setRowSelection={setRowSelection}
                    rowSelection={rowSelection}
                />

            </div>
            <OpenTodoModal
                open={open}
                isModalOpen={isModalOpen}
                headerTitle={<p className="text-center font-bold">Edit Task</p>}
            >
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