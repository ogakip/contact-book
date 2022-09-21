import { AppError } from "../../errors/appError";
import { appDataSource } from "../../data-source";
import { compare } from "bcrypt";
import { User } from "../../entities/user.entity";
import jwt from "jsonwebtoken";
import { iLoginUser, iReturnLoginUser } from "../../interfaces/user";

export const loginUserService = async ({ email, password }: iLoginUser): Promise<iReturnLoginUser> => {
    const getUserRepo = appDataSource.getRepository(User)

    const userExists = await getUserRepo.findOneBy({ email });

    if (!userExists) {
        throw new AppError("User not found");
    }

    const comparePassword = compare(password, userExists.password);

    if (!comparePassword) {
        throw new AppError("E-mail or password don't match");
    }

    const accessToken = jwt.sign({ user_id: userExists.id }, 'SECRET_KEY', {
        expiresIn: "24h"
    });

    return {
        accessToken
    }
}