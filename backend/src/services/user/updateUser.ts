import { appDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";
import { hash } from "bcrypt";
import { iUpdateUser, iReturnCreateUser } from "../../interfaces/user";

export const updateUserService = async (data: iUpdateUser, user_id: string): Promise<iReturnCreateUser> => {
    const getUserRepo = appDataSource.getRepository(User)

    if (data.password) {
        data.password = await hash(data.password, 10)
    }

    await getUserRepo.update(user_id, data)

    const findUserAfterUpdate = await getUserRepo.findOneBy({ id: user_id })

    if (!findUserAfterUpdate) {
        throw new AppError("User not found")
    }

    return {
        id: findUserAfterUpdate.id,
        name: findUserAfterUpdate.name,
        email: findUserAfterUpdate.email
    }
}