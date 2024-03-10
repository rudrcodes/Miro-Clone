"use client"
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";

import { ConvexReactClient, AuthLoading, Authenticated } from "convex/react";
import Loading from "@/components/auth/loading";
interface ConvexClientPrviderProps {
    children: React.ReactNode
}

// This is a wrapper which will protect all of the children , which is the App with Authentication

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

//convex instance
const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({ children }: ConvexClientPrviderProps) => {
    return (

        <ClerkProvider>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <Authenticated>
                    {children}
                </Authenticated>

                <AuthLoading>
                    <Loading />
                </AuthLoading>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}
