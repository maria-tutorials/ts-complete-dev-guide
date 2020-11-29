import express, { Request, Response, NextFunction} from "express";
import { urlencoded } from 'body-parser';

import routes from './routes/login'

const app = express();
const PORT = 3000;

app.use(urlencoded({extended: true}));
app.use('/', routes);

//error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});
