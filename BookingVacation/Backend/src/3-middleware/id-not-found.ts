import { NextFunction, Request, Response } from "express";
import { IdNotFoundError } from "../4-models/client-errors";

function idNotFound(request: Request, response: Response, next: NextFunction): void {

    const err = new IdNotFoundError(+request.body.id);

    next(err);

};


export default idNotFound;