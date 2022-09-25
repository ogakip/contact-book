import { appDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { Client } from "../../entities/client.entity";
import { User } from "../../entities/user.entity";

export const deleteClientService = async (client_id: string, user_id: string) => {
    const getUserRepo = appDataSource.getRepository(User)
    const getClientRepo = appDataSource.getRepository(Client)

    const findUser = await getUserRepo.findOneBy({ id: user_id })

    if (!findUser) {
        throw new AppError("User not found")
    }

    const clientExists = await getClientRepo.findOneBy({ id: client_id })

    if (!clientExists) {
        throw new AppError("Client not found")
    }

    if (clientExists.user.id !== user_id) {
        throw new AppError("You don't have permission to delete this", 401);
    }

    await getClientRepo.delete(client_id)

    return "OK"
}