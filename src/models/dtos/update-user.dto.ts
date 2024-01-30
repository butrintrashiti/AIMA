import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../../entity/User';

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