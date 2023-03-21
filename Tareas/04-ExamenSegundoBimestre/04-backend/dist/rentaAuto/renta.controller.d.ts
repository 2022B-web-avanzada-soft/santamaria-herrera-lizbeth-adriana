import { RentaService } from "./renta.service";
import { RentaCreateDto } from "./dto/renta-create.dto";
import { RentaEntity } from "./renta.entity";
export declare class RentaController {
    private readonly rentaService;
    constructor(rentaService: RentaService);
    findOneById(params: any): Promise<RentaEntity>;
    delete(params: any): Promise<import("typeorm").DeleteResult>;
    update(params: any, bodyParams: any): Promise<{
        id: number;
        numeroDiasAlquiler: number;
        encargadoDelServicio: string;
        nombreDelRentador: string;
        metodoPago: string;
        totalPagar: import("typeorm").Double;
    } & RentaEntity>;
    create(bodyParams: any): Promise<RentaCreateDto & RentaEntity>;
    find(queryParams: any): Promise<RentaEntity[]>;
}
