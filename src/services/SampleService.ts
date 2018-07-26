import {Service, Inject} from 'typedi';
import {InjectRepository} from "typeorm-typedi-extensions";
import {Repository} from "typeorm";
import {Sample} from '../model/Sample';

@Service()
export class SampleService {

    @InjectRepository(Sample)
    private sampleRepository : Repository<Sample>;

    public getById(Id : string) {
        this.sampleRepository.findOne(Id)
    }

    public async get(text: string){
        try {
            const sample = await this.sampleRepository.find({text: text});
            return sample;
        } catch(err) {
            console.log("error");
        }
    }

    public putSample(text: string, extra: string) : Sample {
        let sample = new Sample();
        sample.text = text;
        sample.extra = extra;
        this.sampleRepository.insert(sample);
        return sample;
    }

}