import { createNextApiHandler } from "@trpc/server/adapters/next";
import { createPostSchema, getSinglePostSchema } from "../../schema/post.schema";
import * as trpc from '@trpc/server'
import { createRouter } from "../createRouter";

export const postRouter = createRouter()
.mutation('create-post', {
    input: createPostSchema,
    resolve: async ({ ctx, input }) => {
        if(!ctx.user) {
            new trpc.TRPCError({
                code: 'FORBIDDEN',
                message: 'Can not create post while logged out'
            })
        }
        const post = await ctx.prisma.post.create({
            data: {
                ...input,
                user: {
                    connect: {
                        id: ctx.user?.id,
                    }
                }
            }
        })

        return post
    }
})
.query('posts', {
    resolve: ({ctx}) => {
        return ctx.prisma.post.findMany()
    }
})
.query('single-post', {
    input: getSinglePostSchema,
    resolve: ({ctx, input}) => {
        return ctx.prisma.post.findUnique({
            where: {
                id: input.postId
            }
        })
    }
})