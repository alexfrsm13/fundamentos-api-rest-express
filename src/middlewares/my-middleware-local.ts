import { Request, Response, NextFunction } from 'express'

export function myMiddlewareLocal(req: Request, res: Response, next: NextFunction) {
    req.user_id = '123456'

    console.log('Passou pelo Middleware Local!')

    return next()
}