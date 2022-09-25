import { updateUserService } from "../../services/user/updateUser";
import { Request, Response } from "express"

export const updateUserController = async (req: Request, res: Response) => {
    const resultService = await updateUserService(req.body, res.locals.user_id)

    return res.json(resultService)
}