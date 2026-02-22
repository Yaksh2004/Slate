import { z } from "zod";

export const createProjectSchema = z
  .object({
    name: z.string().trim().min(1, "Project name cannot be empty"),
  })
  .strict();
