import { createClientService } from "../../services/client/createClient";
import { Request, Response } from "express"

export const createClientController = async (req: Request, res: Response) => {
    const resultService = await createClientService(req.body, res.locals.user_id)

    return res.status(201).json(resultService)
}