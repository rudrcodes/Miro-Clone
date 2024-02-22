// This API end point is for : querying and performing functions on multiple boards
import { v } from "convex/values";
import { query } from "./_generated/server";

// Define a query in this Convex app's public API.
// This function will be allowed to read your Convex database and will be accessible from the client.
export const get = query({
    args: {
        orgId: v.string(),
    },
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity();
        console.log("identity :", identity);

        if (!identity) {
            // Basically if the user is authenticated then only allow them to call the mutation (API end point)
            throw new Error("Unauthorised")
        }

        const boards = await ctx.db.query("boards").withIndex("by_org", (q) => q.eq("orgId", args.orgId)).order("desc").collect();

        return boards;
    }

})