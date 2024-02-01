import "reflect-metadata"
import { DataSource } from "typeorm"
import { Product } from "./entity/Product"
import { User } from "./entity/User"
import { Sale } from "./entity/Sale"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PG_HOST || "localhost",
    port: +process?.env?.DB_PORT! || 5432,
    username: "postgres",
    password: process.env.PG_PASS || "12345",
    database: "aima",
    synchronize: true,
    logging: false,
    entities: [Product, User, Sale],
    migrations: ['src/migrations/*.ts'],
    subscribers: [],
})
