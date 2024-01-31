import { IsNotEmpty, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { User, UserRole } from '../../entity/User';

export class CreateUserDto implements Partial<User> {

    @IsOptional()
    @IsEnum(UserRole)
    role!: UserRole;

    @IsNotEmpty()
    firstName!: string;

    @IsNotEmpty()
    lastName!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;
}