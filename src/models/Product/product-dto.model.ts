import { IsNotEmpty, IsNumber, Min, IsString, IsOptional } from 'class-validator';
import { User } from '../../entity/User'; // Assuming User is your supplier entity

export class ProductDTO {
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
    supplier!: User;
}
