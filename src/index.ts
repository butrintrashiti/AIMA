import 'reflect-metadata';
import dotenv from "dotenv";
import { Container } from 'typedi';
import { useContainer, createExpressServer, getMetadataArgsStorage } from 'routing-controllers';
import { ProductsController } from './controllers/products.controller';
import { AppDataSource } from './data-source';
import { UsersController } from './controllers/users.controller';
import { SalesController } from './controllers/sales.controller';
import { ReportsController } from './controllers/reports.controller';
import { User } from './entity/User';
import { Product } from './entity/Product';
import { Sale } from './entity/Sale';
import { AuthController } from './controllers/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import * as swaggerUi from "swagger-ui-express";
import { spec } from './utils/swagger-config';

dotenv.config();

AppDataSource.initialize()
    .then(() => {

    })
    .catch((error) => console.log(error));

useContainer(Container);
export const UserRepository = AppDataSource.getRepository(User).extend({});
export const ProductRepository = AppDataSource.getRepository(Product).extend({});
export const SaleRepository = AppDataSource.getRepository(Sale).extend({});
Container.set("UserRepository", UserRepository);
Container.set("ProductRepository", ProductRepository);
Container.set("SaleRepository", SaleRepository);

const port = process.env.PORT || 3000;

export const routingControllersOptions = {
  routePrefix: '/api/v1',
  controllers: [ProductsController, UsersController, SalesController, ReportsController, AuthController],
  middlewares: [AuthMiddleware]
};

const app = createExpressServer(routingControllersOptions);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec))

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

