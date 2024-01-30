import { IsNotEmpty, IsString, IsNumber, Min, IsOptional } from 'class-validator';
import { Product } from '../../entity/Product';

export class CreateProductDto implements Partial<Product> {
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
    supplierId?: number;
}