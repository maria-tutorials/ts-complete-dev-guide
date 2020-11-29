import { Request, Response, NextFunction } from 'express';

import { get, controller, use } from './decorators';

function requireAuth(req: Request, res: Response, next: NextFunction): void {
    if(req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403).send('Not allowed');
}

@controller('')
class RouteController {

    @get('/')
    getRoot(req: Request, res: Response) {
        if(req.session && req.session.loggedIn) {
            res.send(`
                <div>
                    <p>You are logged in yey</p>
                    <a href="/logout">Logout</a>
                </div>
            `)
        } else {
            res.send(`
            <div>
                <p>You are NOT logged in m8</p>
                <a href="/login">Login</a>
            </div>
        `)
        }
    }

    @get('/protected')
    @use(requireAuth)
    getProtected(req: Request, res: Response) {
        res.send('Welcome to the protected route, you are logged in');
    }

}
