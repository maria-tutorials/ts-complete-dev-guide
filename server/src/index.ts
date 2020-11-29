import express, { Request, Response, NextFunction} from "express";
import { urlencoded } from 'body-parser';
import cookieSession from 'cookie-session';

import { AppRouter } from './AppRouter';
import './controllers/login';
import './controllers/root';

const app = express();
const PORT = 3001;

app.use(urlencoded({extended: true}));
app.use(cookieSession({keys: ['shinjigetintherobot']}))
app.use(AppRouter.getInstance());

//error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});
