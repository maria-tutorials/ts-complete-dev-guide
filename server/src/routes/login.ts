import { Router, Request, Response } from 'express';

interface RequestWithBody extends Request {
    body : { [key: string]: string | undefined}
}

const router = Router();

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

    if (email) {
        res.send(email.toUpperCase())
    } else {
        res.status(400).send('Please provide and email')
    }

});

//export { router };
export default router;
