import { ProductDto } from "../models/dtos/product.dto"

export const productsMockData: ProductDto[] = [
    {
        id: 1,
        name: "product 1",
        description: "This is a product 1",
        price: 110,
        stock_quantity: 100,
        supplierId: 1
    },
    {
        id: 2,
        name: "product 2",
        description: "This is a product 2",
        price: 110,
        stock_quantity: 40,
        supplierId: 2
    },
    {
        id: 3,
        name: "product 1",
        description: "123",
        price: 110,
        stock_quantity: 0,
        supplierId: 2
    }
]


export const salesMockData = [
    {
        id: 1,
        productId: 1,
        quantity: 90,
        total_amount: 10780,
        sale_date: "2024-01-15T14:03:25.160Z",
        created_at: "2024-01-31T16:10:37.585Z",
        updated_at: "2024-01-31T16:16:02.701Z"
    },
    {
        id: 2,
        productId: 2,
        quantity: 90,
        total_amount: 9900,
        sale_date: "2024-01-18T14:03:25.160Z",
        created_at: "2024-02-01T11:11:20.761Z",
        updated_at: "2024-02-01T14:15:52.036Z"
    }
]

export const usersMockData = [
    {
        id: 1,
        uuid: "22d01356-36fb-4008-8538-592f59a450ea",
        role: "supplier",
        firstName: "Foo",
        lastName: "Bar",
        email: "foo.bar@gmail.com"
    },
    {
        id: 2,
        uuid: "3e32dbba-6537-4805-bd7b-5801f036e28c",
        role: "supplier",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@gmail.com"
    }
]