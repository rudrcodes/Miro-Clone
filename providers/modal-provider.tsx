// This modal provider will contain all the modals that we have
'use client'
// use client doesn't means CSR,it just means that it's not a server component & server component is not the same thing as SSR(Server Side Rendering)

import { RenameModal } from "@/components/modals/rename-modal"
import { useEffect, useState } from "react"
// To prevent hydration errors we eant the modals to be rendered only when the rendering comes to the client side and we do that by using useEffect as useEffect is only executed on the client side

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null;
    }
    return (
        <>
            <RenameModal />
        </>
    )
}