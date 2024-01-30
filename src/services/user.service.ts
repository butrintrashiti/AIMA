import { Service } from "typedi";
import { CreateUserDto } from "../models/dtos/create-user.dto";
import { User } from "../entity/User";
import { HttpError } from "routing-controllers";
import { AppDataSource } from "../data-source";
import { QueryFailedError } from "typeorm";
import { UpdateUserDto } from "../models/dtos/update-user.dto";

@Service()
export class UserService {
    private readonly User = AppDataSource.getRepository(User);

    async getAll() {
        try {
            const allUsers = await this.User.find();

            return allUsers;
        } catch(e: QueryFailedError | any) {
            return new HttpError(500, e.message);
        }
    }

    async get(id: number) {
        try {
            const user = await this.User.findOneBy({ id });

            if (!user) {
                return new HttpError(404, "User not found!");
            }

            return user;
        } catch(e: QueryFailedError | any) {
            return new HttpError(500, e.message);
        }
    }

    async create(createUserDto: CreateUserDto) {
        try {
            const newUser = await this.User.save(createUserDto);

            return newUser;
        } catch(e: QueryFailedError | any) {
            return new HttpError(500, e.message);
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        try {
            const updatedResult = await this.User.update({ id }, updateUserDto);

            return updatedResult;
        } catch(e: QueryFailedError | any) {
            return new HttpError(500, e.message);
        }
    }

    async delete(id: number) {
        try {
            const deletedResult = await this.User.delete({ id });

            return deletedResult;
        } catch (e: QueryFailedError | any) {
            return new HttpError(500, e.message);
        }
    }
}