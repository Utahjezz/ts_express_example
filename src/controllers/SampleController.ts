import {JsonController, Req, Res, Get, Param} from 'routing-controllers';
import {Request, Response} from 'express';
import { SampleService } from '../services/SampleService';
import { Inject, Service } from 'typedi';
import { text } from 'body-parser';

@Service()
@JsonController('/')
export class SampleController {

    @Inject()
    private sampleService : SampleService;

    @Get("get/:text")
    public async getSample(@Param("text") text: string, @Res() response: Response) : Promise<Response> {
        console.log("get");
        const res = await this.sampleService.get(text);
        return response.json(res);
    }

    @Get("create")
    public createSample(@Req() request: Request, @Res() response: Response) : Response {
        console.log("creating new sample ");
        const res = this.sampleService.putSample("prova", "text");
        return response.json(res);
    }

}