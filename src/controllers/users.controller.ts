
import { Body, JsonController, Post, Get, Put, Delete, Param, HttpError } from 'routing-controllers';
import { CreateUserDto } from '../models/dtos/create-user.dto';
import { Inject, Service } from 'typedi';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../models/dtos/update-user.dto';
import { UserDto } from '../models/dtos/user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@JsonController('/users')
@Service()
export class UsersController {
    @Inject() userService!: UserService;

    constructor() {}

    @Get()
    async getAll(): Promise<UserDto[] | HttpError> {
        return this.userService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id') id: number) {
        return this.userService.get(id);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<UserDto | HttpError> {
        return this.userService.create(createUserDto);
    }

    @Put('/:id')
    async update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: number): Promise<UpdateResult | HttpError> {
        return this.userService.update(id, updateUserDto);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number): Promise<DeleteResult | HttpError> {
        return this.userService.delete(id);
    }
}