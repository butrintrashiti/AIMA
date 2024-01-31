import { IsNotEmpty, IsInt, IsNumber, Min, IsDate, IsOptional } from 'class-validator';
import { Sale } from '../../entity/Sale';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Transform } from 'class-transformer';

export class CreateSaleDto implements QueryDeepPartialEntity<Sale>  {

    @IsNotEmpty()
    productId!: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    quantity!: number;

    @IsNotEmpty()
    @IsNumber()
    total_amount!: number;

    @IsOptional()
    @Transform( ({ value }) => new Date(value))
    @IsDate()
    sale_date!: Date;
}