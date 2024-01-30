import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../../entity/User'; // Replace with the actual path to your enum file

export class UpdateUserDto {
    @IsOptional()
    @IsEnum(UserRole)
    role!: UserRole;

    @IsOptional()
    @IsString()
    firstName!: string;

    
    @IsOptional()
    @IsString()
    lastName!: string;

    @IsOptional()
    @IsEmail()
    email!: string;
}