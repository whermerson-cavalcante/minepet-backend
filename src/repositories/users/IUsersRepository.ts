import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { User } from "../../entities/User";

export interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  create(data: CreateUserDTO): Promise<User>;
}