import { DataSource, FindManyOptions } from "typeorm";
import { RentaEntity } from "./renta.entity";
import { RentaCreateDto } from "./dto/renta-create.dto";
import { RentaUpdateDto } from "./dto/renta-update.dto";
export declare class RentaService {
    datasource: DataSource;
    constructor(datasource: DataSource);
    rentaRepository: import("typeorm").Repository<RentaEntity>;
    find(opciones: FindManyOptions<RentaEntity>): Promise<RentaEntity[]>;
    findOneById(id: number): Promise<RentaEntity>;
    create(datosCrear: RentaCreateDto): Promise<RentaCreateDto & RentaEntity>;
    update(datosActualizar: RentaUpdateDto, id: number): Promise<{
        id: number;
        numeroDiasAlquiler: number;
        encargadoDelServicio: string;
        nombreDelRentador: string;
        metodoPago: string;
        totalPagar: import("typeorm").Double;
    } & RentaEntity>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
