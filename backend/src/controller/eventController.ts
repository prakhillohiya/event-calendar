import { oAuth2Client } from "../config/auth";
import { Request, RequestHandler, Response } from "express";
import { google } from 'googleapis'
import { getUserEvents } from "../utils/utils";
import { getUserAndEvents } from "../service/eventService";
import { userModel } from "../model/userModel";
import { IUser } from "../schema/userSchema";


export const getAllEvents = async (req: Request, res: Response) => {
  try {

    const { reqUser } = req.body

    const existingUser = await userModel.findOne<IUser>({
      userId: reqUser.userId
    })

    if (!existingUser) {
      return res.status(400).json({
        message: 'User Not Found',
      });
    }

    const googleEvents = await getUserEvents()

    console.log(googleEvents)

    const userWithEvents = await getUserAndEvents(existingUser._id!)

    return res.status(200).json({
      message: 'Users with associated events fetched successfully',
      data: userWithEvents,
    });

  } catch (error: any) {
    return res.status(500).json({
      message: 'Failed to fetch users with associated events',
      error: error.message,
    });
  }

};