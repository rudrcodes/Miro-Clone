// mutations here
// API end point

// Define a mutation in this Convex app's public API.
// This function will be allowed to modify your Convex database and will be accessible from the client.

// This API end point is for : creating , deleting and updating the individual board
import { v } from "convex/values"
import { mutation } from "./_generated/server"

const images = [
    "/placeholders/1.svg",
    "/placeholders/2.svg",
    "/placeholders/3.svg",
    "/placeholders/4.svg",
    "/placeholders/5.svg",
    "/placeholders/6.svg",
    "/placeholders/7.svg",
    "/placeholders/8.svg",
    "/placeholders/9.svg",
    "/placeholders/10.svg",
]


export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        // The mutation context is passed as the first argument to any Convex mutation function run on the server.
        // It contains useful services for interacting with the Convex database and performing authorization checks.


        //auth :  Get details about the currently authenticated user.

        //// Check if the user who is trying to create a board is authenticated or not

        // await ctx.auth.getUserIdentity()  : A promise that resolves to a `UserIdentity` if the Convex client was configured with a valid ID token and null otherwise.


        const identity = await ctx.auth.getUserIdentity();
        console.log("identity from board :", identity);
        if (!identity) {
            // Basically if the user is authenticated then only allow them to call the mutation (API end point)
            throw new Error("Unauthorised")
        }

        const randomImage = images[Math.floor(Math.random() * images.length)];

        const board = await ctx.db.insert("boards", {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage,
        })

        return board

    }

})