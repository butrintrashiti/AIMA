import { IsNotEmpty, IsInt, IsNumber, Min, IsDate, IsOptional, ValidateNested } from 'class-validator';
import { Sale } from '../../entity/Sale';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ProductDto } from './product.dto';
import { Type } from 'class-transformer';

export class SaleDto implements QueryDeepPartialEntity<Sale> {

    @ValidateNested()
    @Type(() => ProductDto)
    @IsOptional()
    product!: ProductDto;

    @IsNumber()
    @IsNotEmpty()
    productId!: number;

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    quantity!: number;

    @IsNumber()
    @IsNotEmpty()
    total_amount!: number;

    @IsDate()
    @IsNotEmpty()
    sale_date!: Date;
}