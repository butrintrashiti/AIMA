import { Inject, Service } from "typedi";
import { CreateProductDto } from "../models/dtos/create-product.dto";
import { Product } from "../entity/Product";
import { HttpError } from "routing-controllers";
import { AppDataSource } from "../data-source";
import { QueryFailedError, Repository } from "typeorm";
import { UpdateProductDto } from "../models/dtos/update-product.dto";

@Service()
export class ProductService {
    constructor(@Inject("ProductRepository") private productRepository: Repository<Product>) {}

    async getAll() {
        try {
            const allProducts = await this.productRepository.find();

            return allProducts;
        } catch(e: QueryFailedError | any) {
            return new HttpError(500, e.message);
        }
    }

    async getById(id: number) {
        try {
            const product = await this.productRepository.findOneByOrFail({ id });

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
            const newProduct = await this.productRepository.save(createProductDto);

            return newProduct;
        } catch(e: QueryFailedError | any) {
            return new HttpError(500, e.message);
        }
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        try {
            const updatedResult = await this.productRepository.update({ id }, updateProductDto);

            return updatedResult;
        } catch(e: QueryFailedError | any) {
            return new HttpError(500, e.message);
        }
    }

    async delete(id: number) {
        try {
            const deletedResult = await this.productRepository.delete({ id });

            return deletedResult;
        } catch (e: QueryFailedError | any) {
            return new HttpError(500, e.message);
        }
    }
}