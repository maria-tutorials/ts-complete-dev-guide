import { Request, Response, NextFunction } from 'express';

import { get, controller, use } from './decorators';

function logger(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method}`);
}

@controller('/')
class LoginController {

    @get('login')
    @use(logger)
    getLogin (req: Request, res: Response): void {
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

}
