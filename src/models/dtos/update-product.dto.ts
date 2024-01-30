import { IsString, IsNumber, Min, IsOptional } from 'class-validator';
import { Product } from '../../entity/Product';

export class UpdateProductDto implements Partial<Product> {
    @IsOptional()
    @IsString()
    name!: string;

    @IsOptional()
    @IsString()
    description!: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    price!: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    stock_quantity!: number;

    @IsOptional()
    supplierId?: number;
}