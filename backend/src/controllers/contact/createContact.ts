import { createContactService } from "../../services/contact/createContact";
import { Request, Response } from "express"

export const createContactController = async (req: Request, res: Response) => {
    const resultService = await createContactService(req.body, res.locals.user_id, req.params.client_id)

    return res.status(201).json(resultService)
}