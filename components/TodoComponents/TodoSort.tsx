'use client';
import { useState } from "react";
import TodoSelect from "./TodoSelect";
import { status } from "@/app/network/http-service/todo";

interface Props {
    selectedStatus: string
    getSelectedStatusValue: (selected: status) => void
}

const TodoSort = ({ selectedStatus, getSelectedStatusValue }: Props) => {

    const selectOptions = [
        { label: 'All', value: 'all' },
        { label: 'Complete', value: 'complete' },
        { label: 'Incomplete', value: 'incomplete' },
    ]


    const onValueChange = (value: status) => {
        getSelectedStatusValue(value);
    }
    return (
        <div className="my-5 flex justify-end items-center gap-2">
            Sort By: <TodoSelect
                onValueChange={onValueChange}
                value={selectedStatus}
                className={"w-[180px]"}
                items={selectOptions}
                placeholder="Select..." />
        </div>
    )
}

export default TodoSort;