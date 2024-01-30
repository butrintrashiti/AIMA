import { IsNotEmpty, IsEmail, IsEnum, IsNumber, IsUUID } from 'class-validator';
import { UserRole } from '../../entity/User';

export class UserDto {
    @IsNotEmpty()
    @IsNumber()
    id!: number


    @IsNotEmpty()
    @IsUUID()
    uuid!: string;

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