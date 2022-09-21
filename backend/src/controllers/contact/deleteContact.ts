import { deleteContactService } from "../../services/contact/deleteContact";
import { Request, Response } from "express"

export const deleteContactController = async (req: Request, res: Response) => {
    await deleteContactService(req.params.contact_id, res.locals.user_id)

    return res.status(204).json()
}