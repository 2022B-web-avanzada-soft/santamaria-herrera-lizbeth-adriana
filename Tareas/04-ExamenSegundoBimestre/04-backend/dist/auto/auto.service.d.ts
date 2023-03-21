import { DataSource, FindManyOptions } from "typeorm";
import { AutoCreateDto } from "./dto/auto-create.dto";
import { AutoUpdateDto } from "./dto/auto-update.dto";
import { AutoEntity } from "./auto.entity";
export declare class AutoService {
    datasource: DataSource;
    constructor(datasource: DataSource);
    autoRepository: import("typeorm").Repository<AutoEntity>;
    find(opciones: FindManyOptions<AutoEntity>): Promise<AutoEntity[]>;
    findOneById(id: number): Promise<AutoEntity>;
    create(datosCrear: AutoCreateDto): Promise<AutoCreateDto & AutoEntity>;
    update(datosActualizar: AutoUpdateDto, id: number): Promise<{
        id: number;
        auto_marca: string;
        auto_modelo: string;
        auto_num_puertas: number;
        auto_ultima_fecha_servicio: string;
        auto_precio_dia: number;
        esta_rentado: boolean;
        auto_imagen: string;
    } & AutoEntity>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
