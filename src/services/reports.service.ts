import { Inject, Service } from "typedi";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { HttpError } from "routing-controllers";
import { Sale } from "../entity/Sale";
import { Repository } from "typeorm";

@Service()
export class ReportsService {

    constructor(@Inject("ProductRepository") private productRepository: Repository<Product>) {}

    async getProductsToRestock(): Promise<Product[] | HttpError> {
        try {
            const endDate = new Date();
            const startDate = new Date(endDate);
            startDate.setMonth(startDate.getMonth() - 1);
            
            const productsNeedingRestock = await this.productRepository
                .createQueryBuilder('product')
                .leftJoinAndSelect('product.supplier', 'supplier')
                .leftJoin(Sale, 'sale', 'sale.productId = product.id')
                .where('(sale.sale_date BETWEEN :startDate AND :endDate) OR product.stock_quantity < 10', { startDate, endDate })
                .select([
                    'product.id',
                    'product.name',
                    'product.description',
                    'product.price',
                    'product.stock_quantity',
                    'AVG(sale.quantity) AS avgMonthlySales',
                ])
                .having('product.stock_quantity < :threshold OR AVG(sale.quantity) > product.stock_quantity', { threshold: 50 })
                .groupBy('product.id')
                .getRawMany();
        
          return productsNeedingRestock;
        } catch (e: any) {
            return new HttpError(500, e.message);
        }
    }
}