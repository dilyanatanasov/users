import { Request, Response, Router, NextFunction } from "express";
import { UserController } from "../controllers";

export const userRoutes = Router();
const userController = new UserController();

type AsyncRouteHandler = (
    req: Request,
    res: Response
) => Promise<any>;

const asyncHandler = (fn: AsyncRouteHandler) => {
    return (req: Request, res: Response) => {
        Promise.resolve(fn(req, res)).catch(error => {
            const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';

            res.status(statusCode).send({
                success: false,
                message: errorMessage
            });
        });
    };
}


userRoutes.get("/user", asyncHandler(async (req: Request, res: Response) => {
    const users = await userController.getAllUsers();
    res.send(users);
}));

userRoutes.get("/user/:id", asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await userController.getUserById(id);

    if (!user) {
        res.status(404);
        throw new Error(`User with id ${id} not found`);
    }

    res.send(user);
}));

userRoutes.post("/user", asyncHandler(async (req: Request, res: Response) => {
    const result = await userController.createUser(req.body);
    res.status(201).send({
        success: true,
        ...result
    });
}));

userRoutes.put("/user/:id", asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await userController.updateUser(id, req.body);

    if (!result.success) {
        res.status(404);
        throw new Error(result.message);
    }

    res.send({
        success: true,
        message: result.message
    });
}));

userRoutes.delete("/user/:id", asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await userController.deleteUser(id);

    if (!result.success) {
        res.status(404);
        throw new Error(result.message);
    }

    res.send({
        success: true,
        message: result.message
    });
}));