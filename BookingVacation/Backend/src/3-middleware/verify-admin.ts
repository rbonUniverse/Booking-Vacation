import { ForbiddenError, UnauthorizedError } from "../4-models/client-errors";
import { NextFunction, Request, Response } from "express";
import RoleModel from "../4-models/role-model";
import auth from "../2-utils/auth";
import UserModel from "../4-models/user-model";

async function verifyAdmin(request: Request, response: Response, next: NextFunction): Promise<void> {
    
    const authHeader = request.header("authorization");
    
    const isValid = await auth.verifyToken(authHeader);
    if (!isValid) {
        next(new UnauthorizedError("You are not logged in"));
        return;
    }

    const role = auth.getUserRoleFromToken(authHeader);
    console.log(role);
    if (role !== RoleModel.Admin) {
        next(new ForbiddenError("You are not authorized"));
        return;
    }

    next();

};


export default verifyAdmin;