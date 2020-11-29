import 'reflect-metadata';

import { AppRouter } from '../../AppRouter'
import { Methods, MetadataKeys } from './enums';

export function controller(prefix: string) {
    return function (target: Function) {
        const router = AppRouter.getInstance();

        for (const key in target.prototype) {
           const routeHandler = target.prototype[key];
           const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
           const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
           
           if(path) {
               router[method](`${prefix}${path}`, routeHandler);
           }
        }
    }
}
