import { IsNotEmpty, IsInt, IsNumber, Min, IsDate, IsOptional } from 'class-validator';
import { Sale } from '../../entity/Sale';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Transform } from 'class-transformer';

export class CreateSaleDto implements QueryDeepPartialEntity<Sale>  {

    @IsNumber()
    @IsNotEmpty()
    productId!: number;

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    quantity!: number;

    @IsOptional()
    @Transform( ({ value }) => new Date(value))
    @IsDate()
    sale_date!: Date;
}