// Task model attributes are defined in the schema
// This is a better way to define the model attributes
// because it is easier to read and understand
// It also allows us to use the same schema for validation

import {z} from 'zod';

/**
 * CreateTaskSchema
 * @typedef {object} CreateTaskSchema
 * @property {string} userUuid
 * @property {string} taskDescription
 */
export const createTaskSchema = z.object({
    taskDescription: z.string(),
    taskName: z.string(),
    taskDate: z.string(),
});

export const updatedTaskSchema = z.object({
    taskName: z.string().nonempty(),
});

export const deleteTaskSchema = z.object({
    taskUuid: z.string(),
    userUuid: z.string(),
});

export const taskSchema = z.object({
    taskUuid: z.string(),
    userUuid: z.string(),
    taskDescription: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
export type UpdatedTaskSchema = z.infer<typeof updatedTaskSchema>;
export type DeleteTaskSchema = z.infer<typeof deleteTaskSchema>;
export type TaskSchema = z.infer<typeof taskSchema>;