import { IsInt, IsNumber, Min, IsOptional, IsDate } from 'class-validator';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Sale } from '../../entity/Sale';
import { Transform } from 'class-transformer';

export class UpdateSaleDto implements QueryDeepPartialEntity<Sale>  {

    @IsOptional()
    productId!: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    quantity!: number;

    @IsOptional()
    @IsNumber()
    total_amount!: number;

    @IsOptional()
    @Transform( ({ value }) => new Date(value))
    @IsDate()
    sale_date!: Date;
}