import { readContactsService } from "../../services/contact/readContacts";
import { Request, Response } from "express"

export const readContactsController = async (req: Request, res: Response) => {
    const resultService = await readContactsService(req.params.client_id, res.locals.user_id)

    return res.json(resultService)
}