import { Request, Response, NextFunction } from 'express';

import { get, post, controller, use, bodyValidator } from './decorators';

function logger(req: Request, res: Response, next: NextFunction): void {
    console.log(`${req.method} ${req.path}`);
    next();
    return;
}

@controller('/')
class LoginController {

    @get('login')
    @use(logger)
    getLogin(req: Request, res: Response): void {
        res.send(`<!DOCTYPE html>
            <html>
            <body>
                <form method="POST">
                    <div>
                        <label>Email</label>
                        <input type="email" name="email">
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password">
                    </div>
                <button>Submit</button>
                </form>
            </body>
            </html>
        `);
    };

    @post('login')
    @use(logger)
    @bodyValidator('email', 'password')
    postLogin(req: Request, res: Response) {
        const { email, password } = req.body;

        // there's no signup
        if (email && password && email === 'e@mail.com' && password === 'pass') {
            req.session = { loggedIn: true };
            res.redirect('/');
        } else {
            res.status(400).send('Invalid email or password');
        }
    };

}
