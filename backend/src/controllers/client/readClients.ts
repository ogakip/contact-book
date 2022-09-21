import { readClientsService } from "../../services/client/readClients";
import { Request, Response } from "express"

export const readClientsController = async (req: Request, res: Response) => {
    const resultService = await readClientsService(res.locals.user_id)

    return res.json(resultService)
}