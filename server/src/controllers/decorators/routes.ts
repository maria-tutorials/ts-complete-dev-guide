import 'reflect-metadata';
import { RequestHandler } from 'express';

import { Methods, MetadataKeys } from './enums';

interface RouteHandleDescriptor extends PropertyDescriptor {
    value?: RequestHandler;
}

function routeBinder(method: string) {
    return function (path: string) {
        return function (target: any, key:string, dec: RouteHandleDescriptor) {
            Reflect.defineMetadata(MetadataKeys.path, path, target, key);
            Reflect.defineMetadata(MetadataKeys.method, method, target, key);
        }
    }
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
