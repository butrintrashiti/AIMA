import { IsNotEmpty, IsString, IsNumber, Min, IsOptional } from 'class-validator';
import { Product } from '../../entity/Product';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class CreateProductDto implements QueryDeepPartialEntity<Product> {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
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
    supplierId?: number;
}