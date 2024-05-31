import { OAuth2Client } from "google-auth-library";
import { NextFunction, Request, Response } from "express";
import { oAuth2Client } from "../config/auth";
import { getUserDetails } from "../utils/utils";


export const authMiddleware =async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const { accessToken } = req.cookies;


    if (!accessToken) {
      return res
        .status(401)
        .send({ message: "Access Token Not Provided", status: 401 });
    }

    oAuth2Client.setCredentials({ access_token: accessToken })

    req.body.reqUser = await getUserDetails()


    next();
  } catch (error: any) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
