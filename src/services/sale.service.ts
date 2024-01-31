import { Service } from "typedi";
import { CreateSaleDto } from "../models/dtos/create-sale.dto";
import { Sale } from "../entity/Sale";
import { HttpError } from "routing-controllers";
import { AppDataSource } from "../data-source";
import { QueryFailedError } from "typeorm";
import { UpdateSaleDto } from "../models/dtos/update-sale.dto";
import { Product } from "../entity/Product";

@Service()
export class SaleService {
    private readonly Sale = AppDataSource.getRepository(Sale);
    private readonly Product = AppDataSource.getRepository(Product);

    async getAll() {
        try {
            const allSales = await this.Sale.find();

            return allSales;
        } catch(e: QueryFailedError | any) {
            return new HttpError(500, e.message);
        }
    }

    async get(id: number) {
        try {
            const sale = await this.Sale.findOneByOrFail({ id });

            if (!sale) {
                return new HttpError(404, "Sale not found!");
            }

            return sale;
        } catch(e: QueryFailedError | any) {
            return new HttpError(500, e.message);
        }
    }

    async create(createSaleDto: CreateSaleDto) {
        try {
            const currProduct = await this.Product.findOneByOrFail({ id: createSaleDto.productId });
            const total_amount = currProduct.price * createSaleDto.quantity;
            const saleToBeSaved = { ...createSaleDto, total_amount: total_amount };

            const newSale = await this.Sale.save(saleToBeSaved);

            await this.Product.save({ ...currProduct, stock_quantity: currProduct.stock_quantity - createSaleDto.quantity });

            return newSale;
        } catch(e: QueryFailedError | any) {
            return new HttpError(500, e.message);
        }
    }

    async update(id: number, updateSaleDto: UpdateSaleDto) {
        try {
            const currentSale = await this.Sale.findOneByOrFail({id});
            const currProduct = await this.Product.findOneByOrFail({ id: currentSale.productId });
            const total_amount = currProduct.price * updateSaleDto.quantity;
            const saleToBeSaved = { ...updateSaleDto, total_amount: total_amount };
            const updatedResult = await this.Sale.update({ id }, saleToBeSaved );

            if (updatedResult?.affected && updateSaleDto.quantity != currentSale.quantity) {
                const diffQuantity = updateSaleDto.quantity - currentSale.quantity;

                await this.Product.save({ ...currProduct, stock_quantity: currProduct.stock_quantity - diffQuantity });
            }

            return updatedResult;
        } catch(e: QueryFailedError | any) {
            return new HttpError(500, e.message);
        }
    }

    async delete(id: number) {
        try {
            const deletedResult = await this.Sale.delete({ id });

            return deletedResult;
        } catch (e: QueryFailedError | any) {
            return new HttpError(500, e.message);
        }
    }
}