import {Injectable} from "@nestjs/common";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource} from "typeorm";
import {NotaEntity} from "./nota.entity";

@Injectable()
export class NotaService{
    constructor(
        @InjectDataSource()
        public datasource: DataSource
    ) {}
    public notasRepository = this.datasource
        .getRepository(NotaEntity)
}