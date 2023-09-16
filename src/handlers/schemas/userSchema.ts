// Task model attributes are defined in the schema
// This is a better way to define the model attributes
// because it is easier to read and understand
// It also allows us to use the same schema for validation

import {z} from 'zod';

export const createUserSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
});

export const userSchema = z.object({
    userUuid: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UserSchema = z.infer<typeof userSchema>;