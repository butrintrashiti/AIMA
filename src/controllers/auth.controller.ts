import { Authorized, Get, JsonController, Post } from "routing-controllers";
import { Service } from "typedi";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../middlewares/auth.middleware";

@JsonController("/auth")
@Service()
export class AuthController {
    @Post("/login")
    async login() {
        const payload = {
            username: 'test'
        };

        return jwt.sign(payload, SECRET_KEY);
    }
}
