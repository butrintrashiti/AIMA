import { IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { User, UserRole } from '../../entity/User';

export class CreateUserDto implements Partial<User> {

    @IsNotEmpty()
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