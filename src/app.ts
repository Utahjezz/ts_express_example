import 'reflect-metadata';
import {useExpressServer, useContainer} from 'routing-controllers';
import {Container} from 'typedi';

import * as express from "express";
import * as bodyParser from "body-parser";

useContainer(Container);

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config() : void {
        this.app.use(bodyParser.json);
        this.app.use(bodyParser.urlencoded({extended: false}));
    }
}

const app = express();

useExpressServer(app, {

});
export default app;