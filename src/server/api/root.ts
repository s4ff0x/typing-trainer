import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { categoryRouter } from "@/src/server/api/routers/category";
import { fragmentRouter } from "@/src/server/api/routers/fragment";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  category: categoryRouter,
  fragment: fragmentRouter,
});

// export ty  pe definition of API
export type AppRouter = typeof appRouter;
