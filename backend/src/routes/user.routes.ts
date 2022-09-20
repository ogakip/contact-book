import { Router } from "express";

import { createUserController } from "../controllers/user/createUser";

export const UserRouter = Router()
UserRouter.post("/register", createUserController)