import { Service } from "typedi";
import { CreateSaleDto } from "../models/dtos/create-sale.dto";
import { Sale } from "../entity/Sale";
import { HttpError } from "routing-controllers";
import { AppDataSource } from "../data-source";
import { QueryFailedError } from "typeorm";
import { UpdateSaleDto } from "../models/dtos/update-sale.dto";

@Service()
export class SaleService {
    private readonly Sale = AppDataSource.getRepository(Sale);

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
            const sale = await this.Sale.findOneBy({ id });

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
            const newSale = await this.Sale.save(createSaleDto);

            return newSale;
        } catch(e: QueryFailedError | any) {
            return new HttpError(500, e.message);
        }
    }

    async update(id: number, updateSaleDto: UpdateSaleDto) {
        try {
            const updatedResult = await this.Sale.update({ id }, updateSaleDto);

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