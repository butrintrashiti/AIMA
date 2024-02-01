
import { Body, JsonController, Post, Get, Put, Delete, Param, HttpError } from 'routing-controllers';
import { CreateSaleDto } from '../models/dtos/create-sale.dto';
import {  Service } from 'typedi';
import { SaleService } from '../services/sale.service';
import { UpdateSaleDto } from '../models/dtos/update-sale.dto';
import { SaleDto } from '../models/dtos/sale.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@JsonController('/sales')
@Service()
export class SalesController {
    constructor(private saleService: SaleService) {}

    @Get()
    @OpenAPI({
        summary: 'Returns a list of sales',
    })
    @ResponseSchema(SaleDto, {
        contentType: 'application/json',
        description: 'A list of sales',
        isArray: true,
        statusCode: '200'
    })
    async getAll(): Promise<SaleDto[] | HttpError> {
        return this.saleService.getAll();
    }

    @Get('/:id')
    @OpenAPI({
        summary: 'Returns a sale by id',
    })
    @ResponseSchema(SaleDto, {
        contentType: 'application/json',
        description: 'A sale by id',
        statusCode: '200'
    })
    async getById(@Param('id') id: number) {
        return this.saleService.getById(id);
    }

    @Post()
    @OpenAPI({
        summary: 'Returns created sale',
    })
    @ResponseSchema(SaleDto, {
        contentType: 'application/json',
        description: 'A sale',
        statusCode: '200'
    })
    async create(@Body() createSaleDto: CreateSaleDto): Promise<SaleDto | HttpError> {
        return this.saleService.create(createSaleDto);
    }

    @Put('/:id')
    @OpenAPI({
        summary: 'Return repository generated response for update',
    })
    async update(@Body() updateSaleDto: UpdateSaleDto, @Param('id') id: number): Promise<UpdateResult | HttpError> {
        return this.saleService.update(id, updateSaleDto);
    }

    @Delete('/:id')
    @OpenAPI({
        summary: 'Return repository generated response for delete',
    })
    async delete(@Param('id') id: number): Promise<DeleteResult | HttpError> {
        return this.saleService.delete(id);
    }
}