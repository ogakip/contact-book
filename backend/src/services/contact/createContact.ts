import { appDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";
import { Contact } from "../../entities/contact.entity";
import { Client } from "../../entities/client.entity";
import { iCreateContact, iReturnCreateContact } from "../../interfaces/contact";

export const createContactService = async (data: iCreateContact, user_id: string, client_id: string): Promise<iReturnCreateContact> => {
    const getUserRepo = appDataSource.getRepository(User)
    const getClientRepo = appDataSource.getRepository(Client)
    const getContactRepo = appDataSource.getRepository(Contact)

    const userExists = await getUserRepo.findOneBy({ id: user_id })

    if (!userExists) {
        throw new AppError("User not found")
    }

    const clientExists = await getClientRepo.findOneBy({ id: client_id, user: userExists })

    if (!clientExists) {
        throw new AppError("Client not found")
    }

    if (clientExists.user.id !== user_id) {
        throw new AppError("You do not have permission for this client", 401);
    }

    const getClient = {
        id: clientExists.id,
        name: clientExists.name,
        email: clientExists.email,
        telephone: clientExists.telephone,
        user: clientExists.user
    }

    const contactWithEmailAlreadyExists = await getContactRepo.findOne({ 
        where: [{ email: data.email, client: getClient }]
    })
    if (contactWithEmailAlreadyExists) {
        console.log(contactWithEmailAlreadyExists)
        throw new AppError("The customer already has a contact with this email")
    }

    const contactWithTelephoneAlreadyExists = await getContactRepo.findOne({ 
        where: [{ telephone: data.telephone, client: getClient }]
    })
    if (contactWithTelephoneAlreadyExists) {
        throw new AppError("The customer already has a contact with this phone")
    }

    const newContact = await getContactRepo.save({...data, client: clientExists})

    return {
        id: newContact.id,
        name: newContact.name,
        email: newContact.email,
        telephone: newContact.telephone,
        client_id
    }
}