
import { Router } from "express";
import { getAllEvents } from "../controller/eventController";

const router=Router()

router.get('/fetchAll',getAllEvents)

export default router