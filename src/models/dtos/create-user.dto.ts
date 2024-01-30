import { IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { UserRole } from '../../entity/User'; // Replace with the actual path to your enum file

export class CreateUserDto {

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