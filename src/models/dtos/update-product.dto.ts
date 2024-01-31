import { IsString, IsNumber, Min, IsOptional } from 'class-validator';
import { Product } from '../../entity/Product';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class UpdateProductDto implements QueryDeepPartialEntity<Product> {
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
    supplierId!: number;
}