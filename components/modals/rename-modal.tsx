"use client"
import { useRenameModal } from "@/store/use-rename-modal"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle
} from "../ui/dialog"
import { FormEventHandler, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { DialogClose } from "@radix-ui/react-dialog"
import { Button } from "../ui/button"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { toast } from "sonner"

export const RenameModal = () => {


    const {
        isOpen,
        onClose,
        initialValues
    } = useRenameModal();

    const [title, setTitle] = useState(initialValues.title)

    const update = useMutation(api.board.update)
    useEffect(() => {
        setTitle(initialValues.title)
    }, [initialValues.title]);

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        update({ id: initialValues.id as Id<"boards">, title }).then(() => {
            toast.success("Title updated")
            onClose();
        }).catch(() => toast.error("Failed to update title"))
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Board Title
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new title for this board
                </DialogDescription>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                        disabled={false}
                        required
                        maxLength={60}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Board title"

                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button disabled={false} type="submit">Save</Button>
                    </DialogFooter>

                </form>

            </DialogContent>
        </Dialog>
    )
}