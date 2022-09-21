import { appDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { Client } from "../../entities/client.entity";
import { User } from "../../entities/user.entity";
import { iUpdateClient } from "../../interfaces/client";

export const updateClientService = async (data: iUpdateClient, user_id: string, client_id: string) => {
    const getClientRepo = appDataSource.getRepository(Client)
    const getUserRepo = appDataSource.getRepository(User)

    const userExists = await getUserRepo.findOneBy({ id: user_id });

    if (!userExists) {
        throw new AppError("User not found");
    }

    const clientExists = await getClientRepo.findOneBy({ id: client_id })

    if (!clientExists) {
        throw new AppError("Client not found");
    }

    if (clientExists.user.id !== user_id) {
        throw new AppError("You don't have permission to edit this", 401);
    }

    await getClientRepo.update(client_id, data)

    const getClientAfterUpdate = await getClientRepo.findOneBy({ id: client_id })

    if (!getClientAfterUpdate) {
        throw new AppError("Client not found");
    }

    return {
        id: getClientAfterUpdate.id,
        name: getClientAfterUpdate.name,
        email: getClientAfterUpdate.email,
        telephone: getClientAfterUpdate.telephone,
        created_at: getClientAfterUpdate.created_at,
        user_id
    }
}