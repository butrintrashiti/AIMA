import 'reflect-metadata';
import dotenv from "dotenv";
import { Container } from 'typedi';
import { useContainer, createExpressServer } from 'routing-controllers';
import { ProductsController } from './controllers/products.controller';
import { AppDataSource } from './data-source';
import { UsersController } from './controllers/users.controller';
import { SalesController } from './controllers/sales.controller';
import { ReportsController } from './controllers/reports.controller';
import { User } from './entity/User';
import { Product } from './entity/Product';
import { Sale } from './entity/Sale';

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

const app = createExpressServer({
  routePrefix: '/api/v1',
  controllers: [ProductsController, UsersController, SalesController, ReportsController],
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

