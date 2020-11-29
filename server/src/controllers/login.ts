import { Request, Response } from 'express';

import { get, controller } from './decorators';

@controller('/')
class LoginController {

    @get('login')
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
