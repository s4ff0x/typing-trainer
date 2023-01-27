import { z } from "zod";

import { publicProcedure, protectedProcedure, createTRPCRouter } from "../trpc";

export const fragmentRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.fragment.findMany({
        where: {
          userId: ctx.session?.user?.id,
        },
        orderBy: {
          id: "asc",
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }),
  create: protectedProcedure
    .input(
      z.object({
        text: z.string(),
        name: z.string(),
        categoryId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return ctx.prisma.fragment.create({
          data: {
            text: input.text,
            name: input.name,
            userId: ctx.session.user.id,
            categoryId: input.categoryId,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),
});
