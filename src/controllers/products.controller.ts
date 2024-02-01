import { Body, Delete, Get, HttpError, JsonController, Param, Post, Put } from "routing-controllers";
import { Service } from "typedi";
import { CreateProductDto } from "../models/dtos/create-product.dto";
import { ProductService } from "../services/product.service";
import { ProductDto } from "../models/dtos/product.dto";
import { DeleteResult, UpdateResult } from "typeorm";
import { UpdateProductDto } from "../models/dtos/update-product.dto";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";

@JsonController('/products')
@Service()
@OpenAPI({
    security: [{ basicAuth: [] }],
    responses: {
        '500': {
            description: `{ message: 'Error message' }`,
        }
    }
})
export class ProductsController {
    constructor(private productService: ProductService) { }

    @Get()
    @OpenAPI({
        summary: 'Returns a list of products',
    })
    @ResponseSchema(ProductDto, {
        contentType: 'application/json',
        description: 'A list of products',
        isArray: true,
        statusCode: '200'
    })
    async getAll (): Promise<ProductDto[] | HttpError> {
        return this.productService.getAll();
    }

    @Get('/:id')
    @OpenAPI({
        summary: 'Return one product',
        '404': {
            description: `{ message: 'Not Found!' }`
        }
    })
    @ResponseSchema(ProductDto, {
        contentType: 'application/json',
        description: 'One product',
        statusCode: '200'
    })
    async getById (@Param('id') id: number) {
        return this.productService.getById(id);
    }

    @Post()
    @OpenAPI({
        summary: 'Return one product',
    })
    @ResponseSchema(ProductDto, {
        contentType: 'application/json',
        description: 'One product',
        statusCode: '200'
    })
    async create (@Body() createProductDto: CreateProductDto): Promise<ProductDto | HttpError> {
        return this.productService.create(createProductDto);
    }

    @Put('/:id')
    @OpenAPI({
        summary: 'Return repository generated response for update',
    })
    async update (@Body() updateProductDto: UpdateProductDto, @Param('id') id: number): Promise<UpdateResult | HttpError> {
        return this.productService.update(id, updateProductDto);
    }

    @Delete('/:id')
    @OpenAPI({
        summary: 'Return repository generated response for delete',
    })
    async delete (@Param('id') id: number): Promise<DeleteResult | HttpError> {
        return this.productService.delete(id);
    }
}