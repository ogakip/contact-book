import { appDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { Contact } from "../../entities/contact.entity";
import { Client } from "../../entities/client.entity";
import { User } from "../../entities/user.entity";

export const readContactsService = async (client_id: string, user_id: string) => {
    const getContactRepo = appDataSource.getRepository(Contact)
    const getClientRepo = appDataSource.getRepository(Client)

    const clientExists = await getClientRepo.findOneBy({ id: client_id })

    if (!clientExists) {
        throw new AppError("Client not found")
    }

    const getClient = {
        id: clientExists.id,
        name: clientExists.name,
        email: clientExists.email,
        telephone: clientExists.telephone,
        user: clientExists.user
    }

    if (clientExists.user.id !== user_id) {
        throw new AppError("You don't have permission to read this", 401);
    }

    const getClientContacts = await getContactRepo.find({
        where: [{ client: getClient }]
    })

    return getClientContacts.map(({ id, name, email, telephone, client }) => {
        return {
            id,
            name,
            email,
            telephone,
            client_id: client.id
        }
    })
}