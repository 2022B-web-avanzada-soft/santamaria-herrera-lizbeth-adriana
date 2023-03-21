import {BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query} from "@nestjs/common";
import {validate} from "class-validator";
import {FindManyOptions, FindOneOptions, FindOptionsWhere, Like} from "typeorm";
import {RentaService} from "./renta.service";
import {RentaUpdateDto} from "./dto/renta-update.dto";
import {RentaCreateDto} from "./dto/renta-create.dto";
import {RentaEntity} from "./renta.entity";


@Controller('renta')
export class RentaController{
    constructor(
        private readonly rentaService: RentaService
    ) {
    }

    @Get("/:id") // GET /usuario/1
    @HttpCode(200)
    findOneById(
        @Param() params
    ) {
        return this.rentaService.findOneById(+params.id); // +"1" = 1
    }

    @Delete("/:id") // DELETE /usuario/:id
    @HttpCode(200)
    delete(
        @Param() params
    ) {
        return this.rentaService.delete(+params.id);
    }

    @Put("/:id") // PUT /usuario/:id
    @HttpCode(200)
    async update(
        @Param() params, // {id:1}
        @Body() bodyParams // {nombres:''....}
    ) {
        const nuevoRegistro = new RentaUpdateDto();
        nuevoRegistro.numeroDiasAlquiler = bodyParams.numeroDiasAlquiler;
        nuevoRegistro.encargadoDelServicio = bodyParams.encargadoDelServicio;
        nuevoRegistro.nombreDelRentador = bodyParams.nombreDelRentador;
        nuevoRegistro.metodoPago = bodyParams.metodoPago;
        nuevoRegistro.totalPagar = bodyParams.totalPagar;
        const arregloErrores = await validate(
            nuevoRegistro
        ); // validamos
        if (arregloErrores.length > 0) {
            console.error({arregloErrores});
            throw new BadRequestException({
                mensaje: 'Envio mal datos'
            });
        }
        return this.rentaService.update(
            bodyParams,
            +params.id
        );
    }

    @Post("/") // POST /usuario
    @HttpCode(201)
    async create(
        @Body() bodyParams // {nombres:''....}
    ) {
        const nuevoRegistro = new RentaCreateDto();
        nuevoRegistro.numeroDiasAlquiler = bodyParams.numeroDiasAlquiler;
        nuevoRegistro.encargadoDelServicio = bodyParams.encargadoDelServicio;
        nuevoRegistro.nombreDelRentador = bodyParams.nombreDelRentador;
        nuevoRegistro.fecha_inicio_renta = bodyParams.fecha_inicio_renta;
        nuevoRegistro.metodoPago = bodyParams.metodoPago;
        nuevoRegistro.totalPagar = bodyParams.totalPagar;
        const arregloErrores = await validate(
            nuevoRegistro
        ); // validamos
        if (arregloErrores.length > 0) {
            console.error({arregloErrores});
            throw new BadRequestException({
                mensaje: 'Envio mal datos'
            });
        }
        return this.rentaService.create(nuevoRegistro);
    }

    @Get("/") // GET /usuario/
    @HttpCode(200)
    find(
        @Query() queryParams
    ) {
        const consulta: FindManyOptions<RentaEntity> = {
            relations: ['auto']
        };
        const consultaWhere = [] as FindOptionsWhere<RentaEntity>[]
        if(queryParams.nombreDelRentador){
            consultaWhere.push({
                nombreDelRentador: Like('%' + queryParams.nombreDelRentador + '%'), // dr
                numeroDiasAlquiler: queryParams.numeroDiasAlquiler,
                fecha_inicio_renta: queryParams.fecha_inicio_renta,
                metodoPago: queryParams.metodoPago,
                totalPagar: queryParams.totalPagar,
            })
        }
        if(consultaWhere.length > 0){
            consulta.where = consultaWhere
        }
        return this.rentaService.find(consulta);
    }
}