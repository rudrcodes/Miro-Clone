'use client'
import { api } from "@/convex/_generated/api"
import { cn } from "@/lib/utils"
import { useMutation } from "convex/react"
import { Plus } from "lucide-react"
import { toast } from "sonner"

interface NewBoardButtonProps {
    orgId: string,
    disabled?: boolean
}
export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {

    const create = useMutation(api.board.create)

    const onClick = () => {
        create({
            orgId,
            title: "Untitled"
        }).then(() => {
            toast.success("Board created")
            // TODO : Redirect to /board/{id}
        }).catch((err) => {
            toast.error("Failed to create board")
        })
    }

    return (
        <button disabled={disabled} className={cn(
            'col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col justify-center items-center py-6 ',
            disabled && "opacity-75 hover:bg-blue-600"
        )}
            onClick={onClick}
        >
            <div />
            <Plus className="h-12 w-12 text-white stroke-1" />
            <p className="text-xs text-white font-light">New board</p>
        </button>
    )
}