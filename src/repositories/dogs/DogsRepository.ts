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
    birth_date,
    user_id,
  }: CreateDogDTO): Promise<Dog> {
    const dog = this.repository.create({
      dogname,
      breed,
      birth_date,
      user_id,
    });

    return this.repository.save(dog);
  }

  async save(dog: Dog): Promise<Dog> {
    return this.repository.save(dog);
  }

  async findById(id: string): Promise<Dog | undefined> {
    const dog = await this.repository.findOne(id);

    return dog;
  }
}
