import { IsNotEmpty, IsInt, IsNumber, Min, IsDate } from 'class-validator';
import { ProductDto } from './product.dto';
import { Sale } from '../../entity/Sale';

export class SaleDto implements Partial<Sale> {

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