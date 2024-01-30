import { IsInt, IsNumber, Min, IsDate, IsOptional } from 'class-validator';

export class UpdateSaleDto {

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
    @IsDate()
    sale_date!: Date;
}