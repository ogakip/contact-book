import { Router } from "express";

import { createUserController } from "../controllers/user/createUser";
import { loginUserController } from "../controllers/user/loginUser";

import { schemaValidation } from "../middlewares/schemaValidation";

import { createUserSchema, loginUserSchema } from "../validations/user";

export const UserRouter = Router()
UserRouter.post("/register", schemaValidation(createUserSchema), createUserController)
UserRouter.post("/login", schemaValidation(loginUserSchema), loginUserController)