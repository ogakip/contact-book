import { deleteUserService } from "../../services/user/deleteUser";
import { Request, Response } from "express"

export const deleteUserController = async (req: Request, res: Response) => {
    const resultService = await deleteUserService(res.locals.user_id)

    return res.status(204).json()
}