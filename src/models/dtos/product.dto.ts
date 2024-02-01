import { IsNotEmpty, IsNumber, Min, IsString, IsOptional, ValidateNested, IsDefined, IsObject } from 'class-validator';
import { UserDto } from './user.dto';
import { Type } from 'class-transformer';

export class ProductDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number;

    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    price!: number;

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    stock_quantity!: number;


    @IsOptional()
    @IsDefined()
    @IsObject()
    @ValidateNested()
    @Type(() => UserDto)
    supplier?: UserDto;

    @IsOptional()
    supplierId?: number;
}
