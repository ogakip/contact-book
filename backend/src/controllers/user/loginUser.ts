import { loginUserService } from "../../services/user/loginUser";
import { Request, Response } from "express"

export const loginUserController = async (req: Request, res: Response) => {
    const resultService = await loginUserService(req.body)

    return res.json(resultService)
}