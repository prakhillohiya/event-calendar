import { Model, model } from "mongoose";
import { IUser, userSchema } from "../schema/userSchema";

export const userModel: Model<IUser> = model<IUser>('User', userSchema)