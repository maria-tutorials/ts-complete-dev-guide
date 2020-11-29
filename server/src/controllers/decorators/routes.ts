import 'reflect-metadata';

import { Methods, MetadataKeys } from './enums';

function routeBinder(method: string) {
    return function (path: string) {
        return function (target: any, key:string, dec: PropertyDescriptor) {
            Reflect.defineMetadata(MetadataKeys.path, path, target, key);
            Reflect.defineMetadata(MetadataKeys.method, method, target, key);
        }
    }
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
