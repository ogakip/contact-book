import { Router } from "express";

import { createUserController } from "../controllers/user/createUser";

import { schemaValidation } from "../middlewares/schemaValidation";

import { createUserSchema } from "../validations/user";

export const UserRouter = Router()
UserRouter.post("/register", schemaValidation(createUserSchema), createUserController)