import { getRepository, Repository } from "typeorm";

import { User } from "../../entities/User";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { IUsersRepository } from "./IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ where: { username } });

    return user;
  }

  async create({ username, password }: CreateUserDTO): Promise<User> {
    const user = this.repository.create({
      username,
      password,
    });

    return this.repository.save(user);
  }
}
