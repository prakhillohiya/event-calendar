
import { Router } from "express";
import { createUser } from "../controller/userController";

const router=Router()

router.post('/google',createUser)

export default router