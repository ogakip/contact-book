import { Request, Response } from "express"
import { createUserService } from "../../services/user/createUser"

export const createUserController = async (req: Request, res: Response) => {
    const resultService = await createUserService(req.body)
    
    return res.status(201).json(resultService)
}