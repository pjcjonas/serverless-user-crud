// Task model attributes are defined in the schema
// This is a better way to define the model attributes
// because it is easier to read and understand
// It also allows us to use the same schema for validation

import {z} from 'zod';

export const createTaskSchema = z.object({
    userUuid: z.string(),
    taskDescription: z.string().email(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
});

export const taskSchema = z.object({
    taskUuid: z.string(),
    userUuid: z.string(),
    taskDescription: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
export type TaskSchema = z.infer<typeof taskSchema>;