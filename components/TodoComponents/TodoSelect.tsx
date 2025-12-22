import { status } from "@/app/network/http-service/todo";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface items {
    label: string;
    value: string;

}

interface Props {
    className: string;
    items: items[];
    placeholder: string;
    value: string;
    onValueChange: (value: status) => void;
}

const TodoSelect = ({ className, items, placeholder, value, onValueChange }: Props) => {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default TodoSelect;