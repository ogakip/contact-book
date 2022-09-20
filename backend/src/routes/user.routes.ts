import { Router } from "express";

import { CreateUserController } from "../controllers/user/createUser";

export const UserRouter = Router()
UserRouter.post("/register", CreateUserController)