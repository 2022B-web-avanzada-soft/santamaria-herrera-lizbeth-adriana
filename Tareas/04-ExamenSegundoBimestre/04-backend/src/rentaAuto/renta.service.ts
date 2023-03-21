import {Injectable} from "@nestjs/common";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource, FindManyOptions} from "typeorm";
import {RentaEntity} from "./renta.entity";
import {RentaCreateDto} from "./dto/renta-create.dto";
import {RentaUpdateDto} from "./dto/renta-update.dto";

@Injectable()
export class RentaService{
    constructor(
        @InjectDataSource()
        public datasource: DataSource
    ) {}
    public rentaRepository = this.datasource.getRepository(RentaEntity)

    find(opciones: FindManyOptions<RentaEntity>) {
        return this.rentaRepository.find(opciones)
    }
    findOneById(id: number) {
        return this.rentaRepository.findOne({
            // select:{ },
            where: {
                id: id
            },
            relations: ['auto'],
        })
    }

    create(datosCrear: RentaCreateDto) {
        return this.rentaRepository.save(datosCrear);
    }
    update(datosActualizar: RentaUpdateDto, id: number) {
        return this.rentaRepository.save(
            {...datosActualizar, id}
        );
    }
    delete(id: number) {
        return this.rentaRepository.delete(id);
    }
}