import { getRepository, Repository } from "typeorm";
import { CreateDogDTO } from "../../dtos/CreateDogDTO";
import { Dog } from "../../entities/Dog";
import { IDogsRepository } from "./IDogsRepository";

export class DogsRepository implements IDogsRepository {
  private repository: Repository<Dog>;

  constructor() {
    this.repository = getRepository(Dog);
  }

  async create({
    dogname,
    breed,
    birth_day,
    birth_month,
    birth_year,
    user_id,
  }: CreateDogDTO): Promise<Dog> {
    const dog = this.repository.create({
      dogname,
      breed,
      birth_day,
      birth_month,
      birth_year,
      user_id,
    });

    return this.repository.save(dog);
  }
}
