import { Router } from "express";

import { createContactController } from "../controllers/contact/createContact";

import { verifyToken } from "../middlewares/tokenAuth";

import { schemaValidation } from "../middlewares/schemaValidation";

import { createClientSchema } from "../validations/client";

export const ContactRoutes = Router()
ContactRoutes.post("/:client_id", schemaValidation(createClientSchema), verifyToken, createContactController)