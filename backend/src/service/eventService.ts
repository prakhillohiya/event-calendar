import { IExtendedRequest } from "../interface";
import { userModel } from "../model/userModel";
import { Request, RequestHandler, Response } from "express";
import { IUser } from "../schema/userSchema";

export const getUserAndEvents = async (userId:string) => {
  try {
    const userWithEvents = await userModel.aggregate([
      {
        $match: {
          _id: userId,
        },
      },
      {
        $lookup: {
          from: 'events',
          localField: '_id',
          foreignField: 'userId',
          as: 'events',
        },
      },
    ]);

    return userWithEvents
  } catch (error: any) {
    throw new Error(error.message)
  }
}
