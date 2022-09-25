import { appDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { iCreateClient, iReturnCreateClient } from "../../interfaces/client";

export const createClientService = async ({ name, email, telephone }: iCreateClient, user_id: string): Promise<iReturnCreateClient> => {
    const getClientRepo = appDataSource.getRepository(Client)
    const getUserRepo = appDataSource.getRepository(User)

    const getUserInfo = await getUserRepo.findOneBy({ id: user_id })

    if (!getUserInfo) {
        throw new AppError("User not found")
    }

    const userAlreadyHaveClient = await getClientRepo.findOne({
        where: [{ user: getUserInfo, email }]
    })

    if (userAlreadyHaveClient) {
        throw new AppError("You already have this client")
    }

    if (email) {
        const clientAlreadyExists = await getClientRepo.findOne({ 
            where: [{ email, user: getUserInfo }]
        })

        if (clientAlreadyExists) {
            throw new AppError("You already have a customer with this registered email")
        }
    }
    if (telephone) {
        const clientAlreadyExists = await getClientRepo.findOne({ 
            where: [{ telephone, user: getUserInfo }]
        })

        if (clientAlreadyExists) {
            throw new AppError("You already have a customer with this registered telephone")
        }
    }

    const returnClient = await getClientRepo.save({
        name,
        email,
        telephone,
        user: getUserInfo
    })

    return {
        id: returnClient.id,
        name: returnClient.name,
        email: returnClient.email,
        telephone: returnClient.telephone,
        created_at: returnClient.created_at,
        user_id
    }
}