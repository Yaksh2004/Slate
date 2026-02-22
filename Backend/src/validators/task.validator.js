import { z } from "zod";

export const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1, "Task title cannot be empty").optional(),
    description: z.string().optional(),
    status: z.enum(["todo", "in-progress", "done"]).optional(),
  })
  .strict()
  .refine(data => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

export const createTaskSchema = z
  .object({
    title: z.string().trim().min(1, "Task title cannot be empty"),
    description: z.string().optional(),
  })
  .strict();
