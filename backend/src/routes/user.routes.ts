import { Router } from "express";

import { createUserController } from "../controllers/user/createUser";
import { loginUserController } from "../controllers/user/loginUser";
import { deleteUserController } from "../controllers/user/deleteUser";
import { updateUserController } from "../controllers/user/updateUser";

import { schemaValidation } from "../middlewares/schemaValidation";

import { createUserSchema, loginUserSchema, updateUserSchema } from "../validations/user";

import { verifyToken } from "../middlewares/tokenAuth";

export const UserRouter = Router()
UserRouter.post("/register", schemaValidation(createUserSchema), createUserController)
UserRouter.post("/login", schemaValidation(loginUserSchema), loginUserController)
UserRouter.delete("/", verifyToken, deleteUserController)
UserRouter.patch("/", schemaValidation(updateUserSchema), verifyToken, updateUserController)