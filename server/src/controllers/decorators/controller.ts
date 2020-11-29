import 'reflect-metadata';
import { RequestHandler, Request, Response, NextFunction } from 'express';

import { AppRouter } from '../../AppRouter'
import { Methods, MetadataKeys } from './enums';

function bodyValidators(keys: string[]): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
        if(!req.body) {
            res.sendStatus(400);
            return;
        }

        for (const key of keys) {
            if (!req.body[key]) {
                res.sendStatus(400);
                return;
            }
        }
        next();
    };
}

export function controller(prefix: string) {
    return function (target: Function) {
        const router = AppRouter.getInstance();

        for (const key in target.prototype) {
           const routeHandler = target.prototype[key];
           const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
           const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
           const middlewares: [] = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];
           const reqBodyProps: string[] = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key)  || [];

           const validator = bodyValidators(reqBodyProps);

           if(path) {
               router[method](`${prefix}${path}`, ...middlewares, validator, routeHandler);
           }
        }
    }
}
