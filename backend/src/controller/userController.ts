import { oAuth2Client } from "../config/auth";
import { Request, RequestHandler, Response } from "express";
import { userModel } from "../model/userModel";
import { IUser } from "../schema/userSchema";
import { IExtendedRequest } from "../interface";
import { getUserDetails, getUserEvents } from "../utils/utils";
import { eventModel } from "../model/eventModel";
import { google } from "googleapis";
import { Types, startSession } from "mongoose";
import { getUserAndEvents } from "../service/eventService";


export const createUser = async (req: Request<IExtendedRequest<IUser>>, res: Response) => {
  try {
    const { code } = req.body

    const { tokens } = await oAuth2Client.getToken(code)


    oAuth2Client.setCredentials({ refresh_token: tokens.refresh_token })


    const googleUser = await getUserDetails()


    // const scopes = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com./auth/userinfo.profile'];

    // const authUrl = oAuth2Client.generateAuthUrl({
    //   access_type: 'offline',
    //   scope: scopes,
    // });

    const existingUser = await userModel.findOne<IUser>({
      userId: googleUser.userId
    })



    if (existingUser) {

      res.cookie("accessToken", tokens.access_token, { httpOnly: true, maxAge: 3600000, secure: true, sameSite: "none"})

      return res.status(200).send({
        message: "User Already Authorized"
      });
    }




    const user = await new userModel({
      refreshToken: tokens.refresh_token,
      userId: googleUser.userId
    }).save()

    try {

      const googleEvents = await getUserEvents()

      if (!googleEvents) {
        return res.status(200).send({
          message: "User Created Successfully",
        });
      }

      const formattedEvents = googleEvents.map(event => ({
        ...event,
        userId: user._id,
      }));


      await eventModel.insertMany(formattedEvents)

      res.cookie("accessToken", tokens.access_token, { httpOnly: false, maxAge: 3600000, secure: false, sameSite: "none" })

      return res.status(200).send({
        message: "User Created and Events Synced Successfully"
      });
    } catch (error: any) {

      await userModel.findByIdAndDelete(user._id);

      return res.status(500).json({
        message: 'Failed to create events. User creation rolled back.',
        error: error.message,
      });
    }


  } catch (error: any) {

    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};