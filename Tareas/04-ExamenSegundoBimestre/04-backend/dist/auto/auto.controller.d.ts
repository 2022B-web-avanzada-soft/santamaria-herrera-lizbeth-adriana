import { AutoService } from "./auto.service";
import { AutoEntity } from "./auto.entity";
import { AutoCreateDto } from "./dto/auto-create.dto";
export declare class AutoController {
    private readonly autoService;
    constructor(autoService: AutoService);
    findOneById(params: any): Promise<AutoEntity>;
    delete(params: any): Promise<import("typeorm").DeleteResult>;
    update(params: any, bodyParams: any): Promise<{
        id: number;
        auto_marca: string;
        auto_modelo: string;
        auto_num_puertas: number;
        auto_ultima_fecha_servicio: string;
        auto_precio_dia: number;
        esta_rentado: boolean;
        auto_imagen: string;
    } & AutoEntity>;
    create(bodyParams: any): Promise<AutoCreateDto & AutoEntity>;
    find(queryParams: any): Promise<AutoEntity[]>;
}
