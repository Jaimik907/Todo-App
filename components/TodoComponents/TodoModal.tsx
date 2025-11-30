import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

interface Props {
    open: boolean;
    component: React.ReactElement;
    headerTitle?: string | React.ReactElement;
    footer?: React.ReactElement;
    isModalOpen: () => void;
    headerDescription?: string | React.ReactElement;
    dialogSize: string;
}

export const TodoModal = ({ open, component, headerTitle, footer, isModalOpen, headerDescription, dialogSize }: Props) => {
    return (
        <Dialog open={open} onOpenChange={isModalOpen}>
            <DialogContent className={dialogSize}>
                <DialogTitle>{headerTitle ? headerTitle : ""}</DialogTitle>
                <DialogHeader>
                    <DialogDescription>{headerDescription}</DialogDescription>
                </DialogHeader>
                {component}
                {footer ?? <DialogFooter>
                    {footer}
                </DialogFooter>}
            </DialogContent>
        </Dialog >
    )
}