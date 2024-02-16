'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { cn } from "@/lib/utils"
import { OrganizationSwitcher } from '@clerk/nextjs'

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})

const OrgSidebar = () => {
    return (
        <div className='hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5 '>
            <Link href="/">
                <div className='flex items-center gap-x-2'>
                    <Image
                        alt="logo"
                        height={40}
                        width={40}
                        src="/logo.svg"
                    />
                    <span className={cn(
                        "font-semibold text-2xl",
                        font.className
                    )}>Board
                    </span>
                </div>
            </Link>
            <OrganizationSwitcher
                hidePersonal={true}
                appearance={{
                    elements: {
                        rootBox: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%"
                        },
                        organizationSwitcherTrigger: {
                            paddibg: "6px",
                            width: "100%",
                            borderRadius:"8px",
                            border:"1px solid black"
                        }
                    },

                }}
            />
        </div>
    )
}

export default OrgSidebar