import 'reflect-metadata';
import * as routingControllers from 'routing-controllers';
import {Container} from 'typedi';

import * as express from "express";
import * as bodyParser from "body-parser";
import {SampleController} from './controllers/SampleController';
import * as typeorm from 'typeorm';
import {Sample} from './model/Sample'

routingControllers.useContainer(Container);


typeorm.useContainer(Container);

typeorm.createConnection({
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "test",
    entities: [
        `${__dirname}/model/*.*`,
    ]
});

let app = express();
//app.use(bodyParser.json);
//app.use(bodyParser.urlencoded({extended: false}));
routingControllers.useExpressServer(app, {
    controllers: [SampleController]
});
export default app;