import { UnauthorizedError } from "../4-models/client-errors";
import { NextFunction, Request, Response } from "express";
import auth from "../2-utils/auth";

async function verifyLoggedIn(request: Request, response: Response, next: NextFunction): Promise<void> {

    const authHeader = request.header("authorization");

    const isValid = await auth.verifyToken(authHeader);
    if (!isValid) {
        next(new UnauthorizedError("You are not logged in"))
        return;
    }

    next();

};


export default verifyLoggedIn;