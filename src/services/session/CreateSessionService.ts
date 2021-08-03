import { User } from "../../entities/User";
import { UsersRepository } from "../../repositories/users/UsersRepository";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import auth from "../../config/auth";
import { AppError } from "../../utils/AppError";

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export class CreateSessionService {
  async execute({ username, password }: IRequest): Promise<IResponse> {
    const usersRepository = new UsersRepository()

    const user = await usersRepository.findByUsername(username)
    if (!user) throw new AppError('Invalid username/password')

    const comparePassword = await compare(password, user.password);
    if (!comparePassword) throw new AppError('Invalid username/password');

    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn
    })

    return {
      user,
      token
    }

  }
}