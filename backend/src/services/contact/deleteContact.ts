import { appDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { Contact } from "../../entities/contact.entity";

export const deleteContactService = async (contact_id: string, user_id: string) => {
    const getContactRepo = appDataSource.getRepository(Contact)

    const contactExists = await getContactRepo.findOneBy({ id: contact_id })

    if (!contactExists) {
        throw new AppError("Contact not found")
    }

    if (contactExists.client.user.id !== user_id) {
        throw new AppError("You don't have permission to delete this", 401);
    }

    await getContactRepo.delete(contact_id)

    return "OK"
}