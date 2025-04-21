import {NextFunction, Request, Response} from "express";

export const currentDateOfExecution = (req: Request, res: Response, next: NextFunction) => {
    const date = new Date().toLocaleDateString();
    console.log(`The current date of execution of api ${req.path} is: ${date}`);
    next();
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(`Error occurred: ${err.message}`);
    res.status(500).json({
        success: false,
        message: err.message || 'An unexpected error occurred'
    });
};