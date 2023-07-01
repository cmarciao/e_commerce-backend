import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { errorListFormatter } from "../utils/formatter";
import { emptyPropertyList } from "../utils/validator";

export function areFilledFields(req: Request, res: Response, next: NextFunction) {
    const { ...rest } = req.body;
    const errorsList = emptyPropertyList({ ...rest });

    if(errorsList.length) {
        const commentError = errorListFormatter(errorsList);

        throw new AppError(commentError);
    }

    next();
}