import { Inject, Service } from "typedi";
import { CreateProductDto } from "../models/dtos/create-product.dto";
import { Product } from "../entity/Product";
import { HttpError } from "routing-controllers";
import { QueryFailedError, Repository } from "typeorm";
import { UpdateProductDto } from "../models/dtos/update-product.dto";
import { ProductDto } from "../models/dtos/product.dto";

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

    async getById(id: number): Promise<ProductDto | HttpError> {
        try {
            const product = await this.productRepository.findOneByOrFail({ id });

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