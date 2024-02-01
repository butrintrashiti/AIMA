import 'reflect-metadata';
import dotenv from "dotenv";
import { Container } from 'typedi';
import { useContainer, createExpressServer } from 'routing-controllers';
import { ProductsController } from './controllers/products.controller';
import { AppDataSource } from './data-source';
import { UsersController } from './controllers/users.controller';
import { SalesController } from './controllers/sales.controller';
import { ReportsController } from './controllers/reports.controller';

dotenv.config();

AppDataSource.initialize()
    .then(() => {
    })
    .catch((error) => console.log(error))

useContainer(Container);
const port = process.env.PORT || 3000;

const app = createExpressServer({
  controllers: [ProductsController, UsersController, SalesController, ReportsController],
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
