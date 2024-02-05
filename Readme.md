## Steps to run this project:

1. Run `npm i` command
2. Run `docker-compose up` or `docker-compose up --build`
3. Open a terminal for getting the container with command `docker ps`
4. docker exec -it <hash> bash (hash is the hash of the process of docker postgress)
5. psql
6. ALTER ROLE postgres WITH PASSWORD '12345' or any other password just make sure to edit docker-compose.yml

## Endpoints:

    First we need to login and get the authorization token

    Note: Need to pass Authentication token for accessing endpoints other than /login

    SWAGGER DOCS - http://localhost:3005/docs
    - GET http://localhost:3005/api/v1/products return array of products without users and sales but we can include that in the future
    - GET http://localhost:3005/api/v1/users return array of users
    - GET http://localhost:3005/api/v1/sales return array of sales
    - PUT http://localhost:3005/api/v1/products/:id Accepts id as number and json body of { "name": string, "description": string, "price": number, "stock_quantity": number, "supplierId": number } returns typeORM UpdateResult
    - POST http://localhost:3005/api/v1/products Accepts { "name": string, "description": string, "price": number, "stock_quantity": number, "supplierId": number }
    - POST http://localhost:3005/api/v1/users Accepts { "firstName": string, "lastName": string, "email": string }
    - PUT http://localhost:3005/api/v1/users/:id Accepts id as number and JSON body { "firstName": string, "lastName": string, "email": string } returns created user
    - PUT http://localhost:3005/api/v1/sales/:id Accepts id as number and JSON body { "productId": number, "quantity": number, "sale_date": date string }
    - POST http://localhost:3005/api/v1/sales Accepts { "productId": number, "quantity": number, "sale_date": date string }
    - GET http://localhost:3005/api/v1/reports/restocking-needs returns a list of products that need to be restocked
    - POST http://localhost:3005/api/v1/auth/login Accepts empty json {} returns JWT token
    IF not using swagger there is a collection included with postman with all endpoints AIMA.postman_collection.json

## Complex query:

    On this query there is 2 main conditions with sub-conditions that we check
        - If product has sales on timeline of 1 month
            - We check if product has more sales for one month than stock_quantity
            - We check if the threshold of that product stock_quantity is less than 50
        - else if product didn't have any sales we check if product has less than 10 stock_quantity
    In these cases we mark product as needed for stocking, we didn't need to check if product has 0 capacity since it always is handled by these two cases

#### Note: I didn't use branches though in real project it makes sense to do it I tried to follow small commits and descriptive messages on commit though not always did that I believe we could have more abstractions and also more unit test
