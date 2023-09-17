// Task model attributes are defined in the schema
// This is a better way to define the model attributes
// because it is easier to read and understand
// It also allows us to use the same schema for validation

import {z} from 'zod';

/**
 * CreateUserSchema
 * @typedef {object} CreateUserSchema
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 */
export const createUserSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
});

/**
 * UserSchema
 * @typedef {object} UserSchema
 * @property {string} userUuid
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} deletedAt
 */
export const userSchema = z.object({
    userUuid: z.string().optional(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
});

/**
 * UpdateUserSchema
 * @typedef {object} UpdateUserSchema
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 */
export const updateUserSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
});


export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UserSchema = z.infer<typeof userSchema>;
export type UpdatedUserSchema = z.infer<typeof updateUserSchema>;