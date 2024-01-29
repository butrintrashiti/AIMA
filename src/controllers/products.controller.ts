import { Get, JsonController } from "routing-controllers";
import { Service } from "typedi";

@JsonController('/products')
@Service()
export class ProductsController {
    @Get()
    async getAll() {
        return 'Products';
    }
}