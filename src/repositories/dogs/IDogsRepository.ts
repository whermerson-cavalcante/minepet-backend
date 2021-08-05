import { Dog } from "../../entities/Dog";
import { CreateDogDTO } from '../../dtos/CreateDogDTO'

export interface IDogsRepository {
  create(data: CreateDogDTO): Promise<Dog>;
  save(dog: Dog): Promise<Dog>;
  findById(id: string): Promise<Dog | undefined>;
}