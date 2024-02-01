import { ReportsService } from "./reports.service";
import { AppDataSource } from "../data-source";
import { productsMockData } from "../utils/mock-test-data";
import { Product } from "../entity/Product";
import { Repository } from "typeorm";
import { HttpError } from "routing-controllers";

beforeAll(async () => {
    await AppDataSource.initialize();
});

afterAll(async () => {
    await AppDataSource.destroy();
});

describe("ReportsService", () => {
    let reportsService: ReportsService;
    let productRepository: Repository<Product>;

    beforeEach(() => {
        productRepository = AppDataSource.getRepository(Product).extend({});;
        reportsService = new ReportsService(productRepository);
    });

    it("should be defined", () => {
        expect(reportsService).toBeDefined();
    });

    it('should get products to restock', async () => {
        const expectedResult = productsMockData.slice(0, 2);
        const createQueryBuilder: any = {
            leftJoinAndSelect: () => createQueryBuilder,
            leftJoin: () => createQueryBuilder,
            where: () => createQueryBuilder,
            select: () => createQueryBuilder,
            having: () => createQueryBuilder,
            groupBy: () => createQueryBuilder,
            getRawMany: () => expectedResult,
          };

        const mockFind = jest.spyOn(productRepository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);

        const result = await reportsService.getProductsToRestock();

        expect(mockFind).toHaveBeenCalled();
        expect(result).toEqual(expectedResult);
    });

    it('should handle errors', async () => {
        const createQueryBuilder: any = {
            leftJoinAndSelect: () => createQueryBuilder,
            leftJoin: () => createQueryBuilder,
            where: () => createQueryBuilder,
            select: () => createQueryBuilder,
            having: () => createQueryBuilder,
            groupBy: () => createQueryBuilder,
            getRawMany: jest.fn().mockRejectedValue(new Error('Test error')),
          };

        const mockFind = jest.spyOn(productRepository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);

        const result = await reportsService.getProductsToRestock();

        expect(mockFind).toHaveBeenCalled();
        expect((result as HttpError).message).toEqual('Test error');
    });
});