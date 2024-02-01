import { ProductService } from "./product.service";
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

describe("ProductService", () => {
    let productService: ProductService;
    let productRepository: Repository<Product>;

    beforeEach(() => {
        productRepository = AppDataSource.getRepository(Product).extend({});;
        productService = new ProductService(productRepository);
    });

    it("should be defined", () => {
        expect(productService).toBeDefined();
    });

    describe("getAll", () => {
        it("should return all products", async () => {
            const mockFind = jest.spyOn(productRepository, 'find').mockResolvedValueOnce(productsMockData as Product[]);

            const result = await productService.getAll();

            expect(mockFind).toHaveBeenCalled();
            expect(result).toHaveLength(3);
            expect(result).toEqual(productsMockData);
        });
    });

    describe("getById", () => {
        it("should return product by id", async () => {
            const id = 1;
            const expectedResult = productsMockData[0];

            const mockFind = jest.spyOn(productRepository, 'findOneByOrFail').mockResolvedValue(productsMockData[0] as Product);

            const result = await productService.getById(id);

            expect(mockFind).toHaveBeenCalled();
            expect(result).toEqual(expectedResult);
        });

        it("should return 500 on product not found", async () => {
            const id = productsMockData.length;

            const mockFind = jest.spyOn(productRepository, 'findOneByOrFail').mockRejectedValue(new HttpError(500, "Product not found!"));

            const result = await productService.getById(id);

            expect(mockFind).toHaveBeenCalled();
            expect((result as HttpError).httpCode).toEqual(500);
            expect((result as HttpError).message).toEqual('Product not found!');
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
