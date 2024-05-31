import { Express, Request, Response } from "express";
import authRoute from "./authRoute";
import { authMiddleware } from "../middleware/authMiddleware";
import eventRoute from "./eventRoute";


const routes = (app: Express) => {
  app.use('/auth', authRoute)
  app.use('/event', authMiddleware,eventRoute)
}

export default routes