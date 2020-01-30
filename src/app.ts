import express, { Application, Request, Response, NextFunction } from "express";
import * as bodyParser from "body-parser"
import errorMiddleware from "../midlewares/error-handle-midleware";
import AuthRouter from '../routes/auth-router';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        const helmet = require('helmet');
        this.app.use(helmet());

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.get("/", (req: Request, res: Response): object => {
            return res.json({ status: "success", message: "Welcome to API Service" });
        });

        this.app.use('/auth', AuthRouter);

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            const error = new Error("Route Not found");
            next(error);
        });

        this.app.use(errorMiddleware);
        
        const PORT: any = process.env.PORT || 3000;
        this.app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
    }
}

export default new App().app;