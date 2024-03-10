// mutations here
// API end point , These are the API endpoints for creating a board, deleting a board and updating name a board

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

export const remove = mutation({
    args: { id: v.id("boards"), },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        console.log("identity from board :", identity);
        if (!identity) {
            // Basically if the user is authenticated then only allow them to call the mutation (API end point)
            throw new Error("Unauthorised")
        }
        // TODO : Later check to delete the favorite relation as well
        await ctx.db.delete(args.id)

    }
})

export const update = mutation({
    args: { id: v.id("boards"), title: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        console.log("identity from board :", identity);
        if (!identity) {
            // Basically if the user is authenticated then only allow them to call the mutation (API end point)
            throw new Error("Unauthorised")
        }
        // TODO : Later check to delete the favorite relation as well
        const title = args.title.trim()
        if (!title) {
            throw new Error("Title is required");
        }

        if (title.length > 60) {
            throw new Error("Title cannot be longer than 60 characters");
        }
        const board = await ctx.db.patch(args.id, {
            title: args.title
        })

        // Why are we returning the updated board here .. maybe to debug ??
        return board;
    }
})


export const favorite = mutation({
    args: { id: v.id("boards"), orgId: v.string() },
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("Unauthorised")
        }
        // get : Fetch a single document from the database by its values.GenericId .

        const board = await ctx.db.get(args.id);

        if (!board) {
            throw new Error("Board not found")
        }

        const userId = identity.subject

        const existingFavorites = await ctx.db.query("userFavorites").
            withIndex("by_user_board_org", (q) =>
                q
                    .eq("userId", userId)
                    .eq("boardId", board._id)
                    .eq("orgId", args.orgId)
            ).unique()

        if (existingFavorites) {
            throw new Error("Board already favorited")
        }

        // If the board is not favorited , then favorite it
        await ctx.db.insert("userFavorites", {
            userId,
            boardId: board._id,
            orgId: args.orgId
        })

        return board;

    }
})
export const unFavorite = mutation({
    args: { id: v.id("boards") },
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("Unauthorised")
        }
        // get : Fetch a single document from the database by its values.GenericId .

        const board = await ctx.db.get(args.id);

        if (!board) {
            throw new Error("Board not found")
        }

        const userId = identity.subject

        const existingFavorites = await ctx.db.query("userFavorites").
            withIndex("by_user_board", (q) =>
                q
                    .eq("userId", userId)
                    .eq("boardId", board._id)
                    // TODO: check if orgId is needed
            ).unique()

        if (!existingFavorites) {
            throw new Error("Board doesn't exist in your favorited boards")
        }

        // If the board is favorited , then unfavorite it
        await ctx.db.delete(existingFavorites._id)

        return board;

    }
})