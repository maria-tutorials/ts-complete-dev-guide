import { Router, Request, Response } from 'express';

interface RequestWithBody extends Request {
    body : { [key: string]: string | undefined}
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

router.get('/login', (req: Request, res: Response) => {
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
});

router.post('/login', (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body;

    // there's no signup
    if (email && password && email === 'e@mail.com' && password === 'pass') {
        req.session = { loggedIn: true };
        res.redirect('/');
    } else {
        res.status(401).send('Invalid email or password');
    }
});

router.get('/logout', (req: Request, res: Response) => {
    req.session = null;
    res.redirect('/');
});

//export { router };
export default router;
