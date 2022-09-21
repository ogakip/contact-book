import { Router } from "express";

import { createClientController } from "../controllers/client/createClient";
import { readClientsController } from "../controllers/client/readClients";
import { updateClientController } from "../controllers/client/updateClient";

import { verifyToken } from "../middlewares/tokenAuth";

import { schemaValidation } from "../middlewares/schemaValidation";

import { createClientSchema, updateClientSchema } from "../validations/client";

export const ClientRoutes = Router()
ClientRoutes.post("/", schemaValidation(createClientSchema), verifyToken, createClientController)
ClientRoutes.get("/", verifyToken, readClientsController)
ClientRoutes.patch("/:client_id", schemaValidation(updateClientSchema), verifyToken, updateClientController)