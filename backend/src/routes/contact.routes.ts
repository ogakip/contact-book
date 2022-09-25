import { Router } from "express";

import { createContactController } from "../controllers/contact/createContact";
import { readContactsController } from "../controllers/contact/readContacts";
import { updateContactController } from "../controllers/contact/updateContact";

import { verifyToken } from "../middlewares/tokenAuth";

import { schemaValidation } from "../middlewares/schemaValidation";

import { createClientSchema, updateClientSchema } from "../validations/client";
import { deleteContactController } from "../controllers/contact/deleteContact";

export const ContactRoutes = Router()
ContactRoutes.post("/:client_id", schemaValidation(createClientSchema), verifyToken, createContactController)
ContactRoutes.get("/:client_id", verifyToken, readContactsController)
ContactRoutes.patch("/:contact_id", schemaValidation(updateClientSchema), verifyToken, updateContactController)
ContactRoutes.delete("/:contact_id", verifyToken, deleteContactController)