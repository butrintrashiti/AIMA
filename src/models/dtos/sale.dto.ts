import { IsNotEmpty, IsInt, IsNumber, Min, IsDate } from 'class-validator';
import { ProductDto } from './product.dto';
import { Sale } from '../../entity/Sale';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class SaleDto implements QueryDeepPartialEntity<Sale> {

    @IsNotEmpty()
    product!: ProductDto;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    quantity!: number;

    @IsNotEmpty()
    @IsNumber()
    total_amount!: number;

    @IsNotEmpty()
    @IsDate()
    sale_date!: Date;
}