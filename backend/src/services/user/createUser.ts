import { appDataSource } from "../../data-source"
import { AppError } from "../../errors/appError"
import { hash } from "bcrypt";
import { User } from "../../entities/user.entity"
import { iCreateUser, iReturnCreateUser } from "../../interfaces/user"

export const createUserService = async ({ name, email, password }: iCreateUser): Promise<iReturnCreateUser> => {
    const getUserRepo = appDataSource.getRepository(User)

    const userAlreadyExists = await getUserRepo.findOneBy({ email })

    if (userAlreadyExists) {
        throw new AppError("User already exists")
    }

    const hashedPassword = await hash(password, 10)

    const returnUser = await getUserRepo.save({
        name,
        email,
        password: hashedPassword
    })

    return {
        id: returnUser.id,
        name: returnUser.name,
        email: returnUser.email
    }
}