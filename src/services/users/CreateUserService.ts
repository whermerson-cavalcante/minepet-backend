import { User } from "../../entities/User";
import { UsersRepository } from "../../repositories/users/UsersRepository";

import { hash } from "bcryptjs";

import { AppError } from "../../utils/AppError";

interface IRequest {
  username: string;
  password: string;
}

export class CreateUserService {
  async execute({ username, password }: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();

    const checkedUsername = await usersRepository.findByUsername(username);

    if (checkedUsername) throw new AppError("This username is already in use.");

    const hashedPassword = await hash(password, 10);

    const user = await usersRepository.create({
      username,
      password: hashedPassword,
    });

    return user;
  }
}
