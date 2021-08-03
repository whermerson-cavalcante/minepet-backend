import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { User } from "../../entities/User";

export interface IUsersRepository {
  create(data: CreateUserDTO): Promise<User>;
  findByUsername(username: string): Promise<User | undefined>;
}