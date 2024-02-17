"use client"
import qs, { Stringifiable } from "query-string"
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
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedValue, updateDebouncedValue] = useDebounceValue(searchTerm, 500)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
        updateDebouncedValue(event.target.value)
    }

    useEffect(() => {
        // only rerender when the debouncedValue changes 
        const url = qs.stringifyUrl(
            {
                url: '/',
                query: {
                    search: debouncedValue
                }
            },
            {
                skipEmptyString: true,
                skipNull: true
            }
        )
        router.push(url);

    }, [debouncedValue, router])

    return <div className="w-full relative">
        <Search
            className="absolute top-1/2 transform -translate-y-1/2 left-3 text-muted-foreground h-4 w-4"
        />
        <Input className="w-full max-w-[516px] pl-9" placeholder="Search boards" onChange={handleChange} value={searchTerm} />
    </div>
}