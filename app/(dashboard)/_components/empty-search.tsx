import React from 'react'
import Image from "next/image"
export const EmptySearch = () => {
    return (
    <div className='h-full flex flex-col items-center justify-center'>
            <Image
                alt="Empty Search Image"
                height={140}
                width={140}
                src="/emptysearch.svg"
            />
            <h2 className='text-2xl font-semibold mt-6'>No results found!</h2>

        <p className='text-muted-foreground text-sm mt-2'>Try searching for somehthing else</p>
        </div>
    )
}

