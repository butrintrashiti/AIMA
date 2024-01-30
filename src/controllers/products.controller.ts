import { Body, Delete, Get, HttpCode, HttpError, JsonController, Param, Post, Put } from "routing-controllers";
import { Inject, Service } from "typedi";
import { CreateProductDto } from "../models/dtos/create-product.dto";
import { ProductService } from "../services/product.service";
import { ProductDto } from "../models/dtos/product.dto";
import { DeleteResult, UpdateResult } from "typeorm";
import { UpdateProductDto } from "../models/dtos/update-product.dto";

@JsonController('/products')
@Service()
export class ProductsController {
    @Inject() productsService!: ProductService;

    constructor() {}

    @Get()
    async getAll(): Promise<ProductDto[] | HttpError> {
        return this.productsService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id') id: number) {
        return this.productsService.get(id);
    }

    @Post()
    async create(@Body() createProductDto: CreateProductDto): Promise<ProductDto | HttpError> {
        return this.productsService.create(createProductDto);
    }

    @Put('/:id')
    async update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: number): Promise<UpdateResult | HttpError> {
        return this.productsService.update(id, updateProductDto);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number): Promise<DeleteResult | HttpError> {
        return this.productsService.delete(id);
    }
}