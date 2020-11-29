import { Router, Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
    body : { [key: string]: string | undefined}
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
    if(req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403).send('Not allowed');
}

const router = Router();

router.get('/', (req: Request, res: Response) => {
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
});

router.get('/logout', (req: Request, res: Response) => {
    req.session = null;
    res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
    res.send('Welcome to the protected route, you are logged in');
});

export default router;
