"use client"

import { formatDistanceToNow } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import { Overlay } from "./Overlay"
import { useAuth } from "@clerk/nextjs"
import { Footer } from "./Footer"

import { Skeleton } from "@/components/ui/skeleton"
import { Actions } from "@/components/actions"
import { MoreHorizontal } from "lucide-react"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"

interface BoardCardProps {
    id: string
    title: string
    imageUrl: string
    authorId: string
    authorName: string
    createdAt: number
    orgId: string
    isFavorite: boolean
}

export const BoardCard = ({
    id,
    title,
    imageUrl,
    authorId,
    authorName,
    createdAt,
    orgId,
    isFavorite
}: BoardCardProps) => {
    const { userId } = useAuth();
    const authorLabel = userId === authorId ? "You" : authorName
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true
    })

    const favorite = useMutation(api.board.favorite);
    const unFavorite = useMutation(api.board.unFavorite);


    const toggleFav = () => {
        if (isFavorite) {
            unFavorite({ id: id as Id<"boards"> }).then(() => toast.success("Board unfavorited"))
                .catch(() => toast.error("Failed to unfavorite board"))
        }
        else {
            favorite({ id: id as Id<"boards">, orgId }).then(() => toast.success("Board favorited")).catch(() => toast.error("Failed to favorite board"))
        }
    }



    return (
        <Link href={`board/${id}`}>
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden ">
                <div className="relative flex-1 bg-amber-50">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-fit"
                    />
                    <Overlay />
                    <Actions
                        id={id as Id<"boards">}
                        title={title}
                        side="right"
                    >
                        <button
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none"
                        >
                            <MoreHorizontal
                                className="text-white opacity-75 hover:opacity-100 transition-opacity" />
                        </button>

                    </Actions>
                </div>
                <Footer
                    isFavorite={isFavorite}
                    title={title}
                    authorLabel={authorLabel}
                    createdAtLabel={createdAtLabel}
                    onClick={toggleFav}
                    disabled={false}

                />

            </div>
        </Link>
    )
}

BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className="aspect-[100/127] rounded-lg overflow-hidden ">
            <Skeleton className="h-full w-full" />
        </div>
    )
}