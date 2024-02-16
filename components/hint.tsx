// *Notes : 
/*
The use of asChild suggests that the content inside the TooltipTrigger component will be treated as a child element within the Tooltip component. This setup allows for more flexible composition of the tooltip system. By passing content as children of the TooltipTrigger, it can be integrated seamlessly with the tooltip behavior managed by the Tooltip component.

In summary, asChild likely facilitates the inclusion of content inside the TooltipTrigger as part of the tooltip's structure and behavior, allowing for a more unified and intuitive tooltip system.
*/
import React from 'react'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from './ui/tooltip'

export interface HintProps {
    label: string
    children: React.ReactNode
    side?: "top" | "bottom" | "left" | "right"
    align?: "start" | "center" | "end"
    sideOffset?: number
    alignOffset?: number
}
const Hint = ({
    label, children, side, align, sideOffset, alignOffset

}: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    className='text-white bg-black border-black'
                    side={side}
                    align={align}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                >
                    <p className='font-semibold capitalize'>
                        {label}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default Hint