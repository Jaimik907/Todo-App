import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { Input } from "../ui/input";


type TodoFormInput<T extends FieldValues, E extends HTMLElement = HTMLInputElement> = Omit<React.InputHTMLAttributes<E>, 'name'> & {
    name: FieldPath<T>
    control: Control<T, unknown>
    placeholder: string

}

function TodoInput<T extends FieldValues>({ name, control, placeholder }: TodoFormInput<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                return (
                    <div className="w-full flex flex-col gap-1">
                        <Input {...field} placeholder={placeholder} />
                        {fieldState.error && (
                            <span className="text-sm text-red-500">
                                {fieldState.error.message || "This field is required"}
                            </span>
                        )}
                    </div>
                )
            }}
            rules={{ required: true }}
        />
    )
}

export default TodoInput;