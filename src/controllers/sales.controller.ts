
import { Body, JsonController, Post, Get, Put, Delete, Param, HttpError } from 'routing-controllers';
import { CreateSaleDto } from '../models/dtos/create-sale.dto';
import {  Service } from 'typedi';
import { SaleService } from '../services/sale.service';
import { UpdateSaleDto } from '../models/dtos/update-sale.dto';
import { SaleDto } from '../models/dtos/sale.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@JsonController('/sales')
@Service()
export class SalesController {
    constructor(private saleService: SaleService) {}

    @Get()
    async getAll(): Promise<SaleDto[] | HttpError> {
        return this.saleService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id') id: number) {
        return this.saleService.getById(id);
    }

    @Post()
    async create(@Body() createSaleDto: CreateSaleDto): Promise<SaleDto | HttpError> {
        return this.saleService.create(createSaleDto);
    }

    @Put('/:id')
    async update(@Body() updateSaleDto: UpdateSaleDto, @Param('id') id: number): Promise<UpdateResult | HttpError> {
        return this.saleService.update(id, updateSaleDto);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number): Promise<DeleteResult | HttpError> {
        return this.saleService.delete(id);
    }
}