import { loginUserService } from "../../services/user/login";
import { Request, Response } from "express"

export const loginUserController = async (req: Request, res: Response) => {
    const resultService = await loginUserService(req.body)

    return res.status(201).json(resultService)
}