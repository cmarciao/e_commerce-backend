import UsersRepository from "../repositories/UsersRepository";

import { AppError } from "../errors/AppError";
import { encryptData } from "../utils/crypt";

class UserService {
    async createUser(name: string, email: string, password: string) {
        const userAlreadyExists = await UsersRepository.findByEmail(email);
        
        if(userAlreadyExists) {
            throw new AppError("User already exists.");
        }
        
        const encryptedPassword = await encryptData(password);
        const user = await UsersRepository.create({
            name,
            email,
            password: encryptedPassword
        });

        return user;
    }
}

export default new UserService();