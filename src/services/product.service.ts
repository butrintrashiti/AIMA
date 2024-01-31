import { Service } from "typedi";
import { CreateProductDto } from "../models/dtos/create-product.dto";
import { Product } from "../entity/Product";
import { HttpError } from "routing-controllers";
import { AppDataSource } from "../data-source";
import { QueryFailedError } from "typeorm";
import { UpdateProductDto } from "../models/dtos/update-product.dto";
import { ProductDto } from "../models/dtos/product.dto";

@Service()
export class ProductService {
    private readonly Product = AppDataSource.getRepository(Product);

    async getAll() {
        try {
            const allProducts = await this.Product.find();

            return allProducts;
        } catch(e: QueryFailedError | any) {
            return new HttpError(500, e.message);
        }
    }

    async get(id: number) {
        try {
            const product = await this.Product.findOneByOrFail({ id });

            if (!product) {
                return new HttpError(404, "Product not found!");
            }

            return product;
        } catch(e: QueryFailedError | any) {
            return new HttpError(500, e.message);
        }
    }

    async create(createProductDto: CreateProductDto) {
        try {
            const newProduct = await this.Product.save(createProductDto);

            return newProduct;
        } catch(e: QueryFailedError | any) {
            return new HttpError(500, e.message);
        }
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        try {
            const updatedResult = await this.Product.update({ id }, updateProductDto);

            return updatedResult;
        } catch(e: QueryFailedError | any) {
            return new HttpError(500, e.message);
        }
    }

    async delete(id: number) {
        try {
            const deletedResult = await this.Product.delete({ id });

            return deletedResult;
        } catch (e: QueryFailedError | any) {
            return new HttpError(500, e.message);
        }
    }
}