import { updateClientService } from "../../services/client/updateClient";
import { Request, Response } from "express"

export const updateClientController = async (req: Request, res: Response) => {
    const resultService = await updateClientService(req.body, res.locals.user_id, req.params.client_id)

    return res.json(resultService)
}