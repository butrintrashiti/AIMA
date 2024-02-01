import { Body, Delete, Get, HttpError, JsonController, Param, Post, Put } from "routing-controllers";
import { Service } from "typedi";
import { CreateProductDto } from "../models/dtos/create-product.dto";
import { ProductService } from "../services/product.service";
import { ProductDto } from "../models/dtos/product.dto";
import { DeleteResult, UpdateResult } from "typeorm";
import { UpdateProductDto } from "../models/dtos/update-product.dto";

@JsonController('/products')
@Service()
export class ProductsController {
    constructor(private productService: ProductService) {}

    @Get()
    async getAll(): Promise<ProductDto[] | HttpError> {
        return this.productService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id') id: number) {
        return this.productService.getById(id);
    }

    @Post()
    async create(@Body() createProductDto: CreateProductDto): Promise<ProductDto | HttpError> {
        return this.productService.create(createProductDto);
    }

    @Put('/:id')
    async update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: number): Promise<UpdateResult | HttpError> {
        return this.productService.update(id, updateProductDto);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number): Promise<DeleteResult | HttpError> {
        return this.productService.delete(id);
    }
}