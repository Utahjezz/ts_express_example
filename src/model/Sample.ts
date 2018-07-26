import {Entity, ObjectIdColumn, ObjectID, Column, BaseEntity} from 'typeorm';

@Entity()
export class Sample {
    
    @ObjectIdColumn()
    id: ObjectID

    @Column()
    text: string;

    @Column()
    extra: string;

}