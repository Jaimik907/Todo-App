import { useForm } from "react-hook-form"

export const useModalForm = () => {
    const methods = useForm(
        {
            defaultValues: {
                task: '',
            }, mode: 'onChange'
        }
    );
    return { methods }
}