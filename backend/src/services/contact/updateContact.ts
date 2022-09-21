import { appDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { Contact } from "../../entities/contact.entity";
import { iUpdateContact } from "../../interfaces/contact";

export const updateContactService = async (data: iUpdateContact, contact_id: string, user_id: string) => {
    const getContactRepo = appDataSource.getRepository(Contact)

    const contactExists = await getContactRepo.findOneBy({ id: contact_id })

    if (!contactExists) {
        throw new AppError("Contact not found")
    }

    if (contactExists.client.user.id !== user_id) {
        throw new AppError("You don't have permission to update this", 401);
    }

    await getContactRepo.update(contact_id, data)

    const getContactAfterUpdate = await getContactRepo.findOneBy({ id: contact_id })

    if (!getContactAfterUpdate) {
        throw new AppError("Contact not found")
    }

    return {
        id: getContactAfterUpdate.id,
        name: getContactAfterUpdate.name,
        email: getContactAfterUpdate.email,
        telephone: getContactAfterUpdate.telephone,
        client_id: getContactAfterUpdate.client.id
    }
}