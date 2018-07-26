import {ExpressMiddlewareInterface, Middleware} from 'routing-controllers';
import {Request, Response} from 'express';

@Middleware({type: 'before'})
export class LoggerInMiddleware implements ExpressMiddlewareInterface {

    use(request: Request, response: Response, next?: Function) : any {
        console.log("logging request " + request.url);
        console.log(request.headers);
        if (request.body)
            console.log(request.body);
        next();
        //console.log("logging response " + response);
    }
}

@Middleware({type : 'after'})
export class LoggerOutMiddleware implements ExpressMiddlewareInterface {

    use(request: Request, response: Response, next?: Function) : any {
        console.log("logging response to " + request.url);
        console.log("status " + response.statusCode);
        next();
        //console.log("logging response " + response);
    }
}