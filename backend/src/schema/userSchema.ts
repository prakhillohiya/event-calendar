import { Schema, Types } from "mongoose";
import { z } from "zod";

export const ZUser = z.object({
  _id: z.string().optional(),
  userId: z.string(),
  refreshToken: z.string()
})

type UserType = z.infer<typeof ZUser>;

export interface IUser extends UserType { }


export const userSchema = new Schema<UserType>({
  refreshToken: { type: String, required: true },
  userId: { type: String, required: true },
}, { timestamps: true });
