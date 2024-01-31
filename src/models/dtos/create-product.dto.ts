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