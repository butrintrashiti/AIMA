import { Response } from "express";
import { verify } from "jsonwebtoken";
import { Service } from "typedi";
import { ExpressMiddlewareInterface, Middleware, UnauthorizedError } from "routing-controllers";

export const SECRET_KEY = "aima_secret"; // we need to move this to .env file

@Middleware({ type: 'before' })
@Service()
export class AuthMiddleware implements ExpressMiddlewareInterface {
    use (request: any, response: Response, next: (err?: any) => any) {
        const token = request.headers.authorization?.split('Bearer ')[1];
        const isLoggingIn = request.url.includes('login');

        if (isLoggingIn) {
            next();
            return;
        }

        if (!token) {
            response.status(401).json("Authorization token is missing");
            return;
        }

        try {
            const decodedToken = verify(token, SECRET_KEY);
            request.user = decodedToken;
        } catch (error) {
            response.status(401).json({ message: 'Invalid token' });
            return;
        }

        next(); 
    }   
}
