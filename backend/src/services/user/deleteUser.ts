import { appDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";

export const deleteUserService = async (user_id: string) => {
    const getUserRepo = appDataSource.getRepository(User)

    const userExists = await getUserRepo.findOneBy({ id: user_id });

    if (!userExists) {
        throw new AppError("User not found");
    }

    await getUserRepo.delete(userExists)

    return "OK"
}