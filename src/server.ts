import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";
import "dotenv";

import { routes } from "./routes";
import { AppError } from "./app/errors/AppError";
import cors from "./app/middlewares/cors";

const app = express();

app.use(express.json());
app.use(cors)
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: err.message
        });
    }

    console.log(err);

    return res.status(500).json({
        error: 'Internal server error'
    });
});

const port = process.env.SERVER_PORT || 3333;

app.listen(port, () => console.log(`Server started at http://localhost:${port}. 🔥`));