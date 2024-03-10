'use client'

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "./ui/dropdown-menu"
import { Link2, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
interface ActionProps {
    children: React.ReactNode
    side?: DropdownMenuContentProps['side']
    sideOffset?: DropdownMenuContentProps['sideOffset']
    id: Id<"boards">  // This means string only
    title: string
}

import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
import { Id } from "@/convex/_generated/dataModel"
import { ConfirmModal } from "./confirm-modal"
import { Button } from "./ui/button"
import { useRenameModal } from "@/store/use-rename-modal"
export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title
}: ActionProps) => {


    const { onOpen } = useRenameModal()

    const remove = useMutation(api.board.remove);

    const onCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`).then(() => toast.success("Link Copied!")).catch((err) => toast.error("Failed to copy link!"))
    }

    const onDelete = () => {
        remove({ id }).then(() => toast.success("Board deleted")).catch((err) => toast.error("Failed to deleted board"))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side={side}
                sideOffset={sideOffset}
                // Stopped propagation because we don't want it to trigger the parents event handlers
                onClick={(e) => e.stopPropagation()}
                className="w-60"
            >
                <DropdownMenuItem
                    className="p-3 cursor-pointer"
                    onClick={onCopyLink}
                >
                    <Link2
                        className="h-4 w-4 mr-2"
                    />
                    Copy board link

                </DropdownMenuItem>
                <DropdownMenuItem
                    className="p-3 cursor-pointer"
                    onClick={() => onOpen(id, title)}
                >
                    <Pencil
                        className="h-4 w-4 mr-2"
                    />
                    Rename board

                </DropdownMenuItem>

                <ConfirmModal
                    header="Delete board ?"
                    description="This will delete the board and it's content."
                    onConfirm={onDelete}
                >
                    <Button
                        variant="ghost"
                        className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
                    // onClick={onDelete}
                    >
                        <Trash2
                            className="h-4 w-4 mr-2"
                        />
                        Delete

                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}