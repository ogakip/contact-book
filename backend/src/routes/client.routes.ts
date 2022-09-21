import { Router } from "express";

import { createClientController } from "../controllers/client/createClient";

import { verifyToken } from "../middlewares/tokenAuth";

import { schemaValidation } from "../middlewares/schemaValidation";

import { createClientSchema } from "../validations/client";

export const ClientRoutes = Router()
ClientRoutes.post("/", schemaValidation(createClientSchema), verifyToken, createClientController)