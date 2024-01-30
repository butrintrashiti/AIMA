import { IsNotEmpty, IsInt, IsNumber, Min, IsDate } from 'class-validator';

export class CreateSaleDto {

    @IsNotEmpty()
    productId!: number;

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