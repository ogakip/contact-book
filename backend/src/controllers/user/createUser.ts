import { Request, Response } from "express"
import { CreateUserService } from "../../services/user/createUser"

export const CreateUserController = (req: Request, res: Response) => {
    const resultService = CreateUserService()

    return res.json(resultService)
}