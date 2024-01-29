import 'reflect-metadata';
import dotenv from "dotenv";
import { Container } from 'typedi';
import { useContainer, createExpressServer } from 'routing-controllers';
import { ProductsController } from './controllers/products.controller';

dotenv.config();
useContainer(Container);
const port = process.env.PORT || 3000;


const app = createExpressServer({
  controllers: [ProductsController],
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
