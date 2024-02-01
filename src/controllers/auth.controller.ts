import { JsonController, Post } from "routing-controllers";
import { Service } from "typedi";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../middlewares/auth.middleware";
import { OpenAPI } from "routing-controllers-openapi";

@JsonController("/auth")
@Service()
@OpenAPI({
    security: [{ basicAuth: [] }],
})
export class AuthController {
    @Post("/login")
    @OpenAPI({
        summary: 'Return an authentication token',
    })
    async login () {
        const payload = {
            username: 'test'
        };

        return jwt.sign(payload, SECRET_KEY);
    }
}
