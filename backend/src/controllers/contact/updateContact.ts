import { updateContactService } from "../../services/contact/updateContact";
import { Request, Response } from "express"

export const updateContactController = async (req: Request, res: Response) => {
    const resultService = await updateContactService(req.body, req.params.contact_id, res.locals.user_id)

    return res.json(resultService)
}