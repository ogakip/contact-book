import { appDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { Client } from "../../entities/client.entity";
import { User } from "../../entities/user.entity";
import { iReturnCreateClient } from "../../interfaces/client";

export const readClientsService = async (user_id: string) => {
    const getClientRepo = appDataSource.getRepository(Client)
    const getUserRepo = appDataSource.getRepository(User)

    const userExists = await getUserRepo.findOneBy({ id: user_id });

    if (!userExists) {
        throw new AppError("User not found");
    }

    const getAllUserClients = await getClientRepo.find()

    if (!getAllUserClients) {
        throw new AppError("Customers not found")
    }

    return getAllUserClients.map((client) => {
        return {
            id: client.id,
            name: client.name,
            email: client.email,
            telephone: client.telephone
        }  
    })
}