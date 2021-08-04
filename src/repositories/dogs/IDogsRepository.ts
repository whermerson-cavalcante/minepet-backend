import { Dog } from "../../entities/Dog";
import { CreateDogDTO } from '../../dtos/CreateDogDTO'

export interface IDogsRepository {
  create(data: CreateDogDTO): Promise<Dog>
}