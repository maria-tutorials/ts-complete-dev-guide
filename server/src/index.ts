import express, { Request, Response, NextFunction} from "express";

const app = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send(`
        <div>
            <h1> Bom dia alegria </h1>
        </div>
    `);
})

//error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});
