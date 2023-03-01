import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { categoryRouter } from "@/src/server/api/routers/category";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  category: categoryRouter,
});

// export ty  pe definition of API
export type AppRouter = typeof appRouter;
