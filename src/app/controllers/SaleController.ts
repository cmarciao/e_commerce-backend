import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

import SaleService from "../services/SaleService";
import { AppError } from "../errors/AppError";

interface DecodedToken {
    id: string;
    iat: number;
}

class SaleController {
    async index(req: Request, res: Response) {
        const tokenHeader = req.headers.authorization;
        
        try {
            const token = tokenHeader?.split(' ')[1] || '';
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || '') as DecodedToken;
            
            const sales = await SaleService.getSalesByUserId(decoded.id);
    
            return res.status(200).json(sales);
        } catch(err) {
            console.log(err);
            
            if(err instanceof AppError) {
                throw err;
            }

            throw new AppError('Invalid token', 401);
        }
    }

    async store(req: Request, res: Response) {
        const tokenHeader = req.headers.authorization;
        
        try {
            const token = tokenHeader?.split(' ')[1] || '';
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || '') as DecodedToken;
            
            await SaleService.addNewSale(decoded.id);
    
            return res.sendStatus(201);
        } catch(err) {
            console.log(err);
            
            if(err instanceof AppError) {
                throw err;
            }

            throw new AppError('Invalid token', 401);
        }
    }
}

export default new SaleController();