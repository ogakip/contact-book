import { deleteClientService } from "../../services/client/deleteClient";
import { Request, Response } from "express"

export const deleteClientController = async (req: Request, res: Response) => {
    const resultService = await deleteClientService(req.params.client_id, res.locals.user_id)

    return res.status(204).json()
}