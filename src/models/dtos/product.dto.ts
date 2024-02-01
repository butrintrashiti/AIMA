import { IsNotEmpty, IsNumber, Min, IsString, IsOptional } from 'class-validator';
import { UserDto } from './user.dto';

export class ProductDto {
    @IsNotEmpty()
    @IsNumber()
    id!: number;

    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    description!: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price!: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    stock_quantity!: number;

    @IsOptional()
    supplier?: UserDto;

    @IsOptional()
    supplierId?: number;
}
