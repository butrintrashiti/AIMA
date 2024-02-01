import { Inject, Service } from "typedi";
import { CreateSaleDto } from "../models/dtos/create-sale.dto";
import { Sale } from "../entity/Sale";
import { HttpError } from "routing-controllers";
import { AppDataSource } from "../data-source";
import { QueryFailedError, Repository } from "typeorm";
import { UpdateSaleDto } from "../models/dtos/update-sale.dto";
import { Product } from "../entity/Product";

@Service()
export class SaleService {
  constructor(
    @Inject("SaleRepository") private saleRepository: Repository<Sale>,
    @Inject("ProductRepository") private productRepository: Repository<Product>
  ) {}

  async getAll() {
    try {
      const allSales = await this.saleRepository.find();

      return allSales;
    } catch (e: QueryFailedError | any) {
      return new HttpError(500, e.message);
    }
  }

  async getById(id: number) {
    try {
      const sale = await this.saleRepository.findOneByOrFail({ id });

      if (!sale) {
        return new HttpError(404, "Sale not found!");
      }

      return sale;
    } catch (e: QueryFailedError | any) {
      return new HttpError(500, e.message);
    }
  }

  async create(createSaleDto: CreateSaleDto) {
    try {
      const currProduct = await this.productRepository.findOneByOrFail({
        id: createSaleDto.productId,
      });
      const total_amount = currProduct.price * createSaleDto.quantity;
      const saleToBeSaved = { ...createSaleDto, total_amount: total_amount };

      if (currProduct.stock_quantity < createSaleDto.quantity) {
        return new HttpError(400, "Not enough products in stock!");
      }

      const newSale = await this.saleRepository.save(saleToBeSaved);

      await this.productRepository.save({
        ...currProduct,
        stock_quantity: currProduct.stock_quantity - createSaleDto.quantity,
      });

      return newSale;
    } catch (e: QueryFailedError | any) {
      return new HttpError(500, e.message);
    }
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    try {
      const currentSale = await this.saleRepository.findOneByOrFail({ id });
      const currProduct = await this.productRepository.findOneByOrFail({
        id: currentSale.productId,
      });
      const total_amount = currProduct.price * updateSaleDto.quantity;
      const saleToBeSaved = { ...updateSaleDto, total_amount: total_amount };
      const updatedResult = await this.saleRepository.update(
        { id },
        saleToBeSaved
      );

      if (currProduct.stock_quantity < updateSaleDto.quantity) {
        return new HttpError(400, "Not enough products in stock!");
      }

      if (
        updatedResult?.affected &&
        updateSaleDto.quantity != currentSale.quantity
      ) {
        const diffQuantity = updateSaleDto.quantity - currentSale.quantity;

        await this.productRepository.save({
          ...currProduct,
          stock_quantity: currProduct.stock_quantity - diffQuantity,
        });
      }

      return updatedResult;
    } catch (e: QueryFailedError | any) {
      return new HttpError(500, e.message);
    }
  }

  async delete(id: number) {
    try {
      const deletedResult = await this.saleRepository.delete({ id });

      return deletedResult;
    } catch (e: QueryFailedError | any) {
      return new HttpError(500, e.message);
    }
  }
}
