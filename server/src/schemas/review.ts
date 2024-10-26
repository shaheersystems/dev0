import { z } from "zod";

export const reviewSchema = z.object({
  query: z.string(),
});
