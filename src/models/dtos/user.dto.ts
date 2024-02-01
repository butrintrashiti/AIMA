import { IsNotEmpty, IsEmail, IsEnum, IsNumber, IsUUID } from 'class-validator';
import { UserRole } from '../../entity/User';

export class UserDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number


    @IsUUID()
    @IsNotEmpty()
    uuid!: string;

    @IsEnum(UserRole)
    @IsNotEmpty()
    role!: UserRole;

    @IsNotEmpty()
    firstName!: string;

    @IsNotEmpty()
    lastName!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;
}