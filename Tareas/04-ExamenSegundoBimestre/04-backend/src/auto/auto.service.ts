import {Injectable} from "@nestjs/common";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource, FindManyOptions} from "typeorm";
import {AutoCreateDto} from "./dto/auto-create.dto";
import {AutoUpdateDto} from "./dto/auto-update.dto";
import {AutoEntity} from "./auto.entity";

@Injectable()
export class AutoService{
    constructor(
        @InjectDataSource()
        public datasource: DataSource
    ) {}
    public autoRepository = this.datasource.getRepository(AutoEntity)

    find(opciones: FindManyOptions<AutoEntity>) {
        return this.autoRepository.find(opciones)
    }
    findOneById(id: number) {
        return this.autoRepository.findOne({
            // select:{ },
            where: {
                id: id
            },
        })
    }

    create(datosCrear: AutoCreateDto) {
        return this.autoRepository.save(datosCrear);
    }
    update(datosActualizar: AutoUpdateDto, id: number) {
        return this.autoRepository.save(
            {...datosActualizar, id}
        );
    }
    delete(id: number) {
        return this.autoRepository.delete(id);
    }
}