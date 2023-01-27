import { z } from "zod";

import { publicProcedure, protectedProcedure, createTRPCRouter } from "../trpc";

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.category.findMany({
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
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return ctx.prisma.category.create({
          data: {
            name: input.name,
            userId: ctx.session.user.id,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),
});
