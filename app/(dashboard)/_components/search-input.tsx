"use client"
import qs from "query-string"
import { Search } from "lucide-react"
import { useDebounceValue, useDebounceCallback } from "usehooks-ts"
import { useRouter } from "next/navigation"

import {
    ChangeEvent,
    useEffect,
    useState
} from "react"
import { Input } from "@/components/ui/input"

export const SearchInput = () => {
    return <div className="w-full relative">
        <Search
            className="absolute top-1/2 transform -translate-y-1/2 left-3 text-muted-foreground h-4 w-4"
        />
        <Input className="w-full max-w-[516px] pl-9" placeholder="Search boards" />
    </div>
}