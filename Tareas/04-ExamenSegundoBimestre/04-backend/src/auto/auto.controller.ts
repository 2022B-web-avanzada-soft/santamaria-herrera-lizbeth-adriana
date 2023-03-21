import {BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query} from "@nestjs/common";
import {validate} from "class-validator";
import {FindManyOptions, FindOptionsWhere, Like} from "typeorm";
import {AutoService} from "./auto.service";
import {AutoEntity} from "./auto.entity";
import {AutoCreateDto} from "./dto/auto-create.dto";
import {AutoUpdateDto} from "./dto/auto-update.dto";


@Controller('auto')
export class AutoController{
    constructor(
        private readonly autoService: AutoService
    ) {
    }
    @Get("/:id") // GET /usuario/1
    @HttpCode(200)
    findOneById(
        @Param() params
    ) {
        return this.autoService.findOneById(+params.id); // +"1" = 1
    }

    @Delete("/:id") // DELETE /usuario/:id
    @HttpCode(200)
    delete(
        @Param() params
    ) {
        return this.autoService.delete(+params.id);
    }

    @Put("/:id") // PUT /usuario/:id
    @HttpCode(200)
    async update(
        @Param() params, // {id:1}
        @Body() bodyParams // {nombres:''....}
    ) {
        const nuevoRegistro = new AutoUpdateDto();
        nuevoRegistro.auto_marca = bodyParams.auto_marca;
        nuevoRegistro.auto_modelo = bodyParams.auto_modelo;
        nuevoRegistro.auto_num_puertas = bodyParams.auto_num_puertas;
        nuevoRegistro.auto_ultima_fecha_servicio = bodyParams.auto_ultima_fecha_servicio;
        nuevoRegistro.auto_precio_dia = bodyParams.auto_precio_dia;
        nuevoRegistro.esta_rentado = bodyParams.esta_rentado;
        nuevoRegistro.auto_imagen = bodyParams.auto_imagen;
        const arregloErrores = await validate(
            nuevoRegistro
        ); // validamos
        if (arregloErrores.length > 0) {
            console.error({arregloErrores});
            throw new BadRequestException({
                mensaje: 'Envio mal datos'
            });
        }
        return this.autoService.update(
            bodyParams,
            +params.id
        );
    }

    @Post("/") // POST /usuario
    @HttpCode(201)
    async create(
        @Body() bodyParams // {nombres:''....}
    ) {
        const nuevoRegistro = new AutoCreateDto();
        nuevoRegistro.auto_marca = bodyParams.auto_marca;
        nuevoRegistro.auto_modelo = bodyParams.auto_modelo;
        nuevoRegistro.auto_num_puertas = bodyParams.auto_num_puertas;
        nuevoRegistro.auto_ultima_fecha_servicio = bodyParams.auto_ultima_fecha_servicio;
        nuevoRegistro.auto_precio_dia = bodyParams.auto_precio_dia;
        nuevoRegistro.esta_rentado = bodyParams.esta_rentado;
        nuevoRegistro.auto_imagen = bodyParams.auto_imagen;
        const arregloErrores = await validate(
            nuevoRegistro
        ); // validamos
        if (arregloErrores.length > 0) {
            console.error({arregloErrores});
            throw new BadRequestException({
                mensaje: 'Envio mal datos'
            });
        }
        return this.autoService.create(nuevoRegistro);
    }

    @Get("/") // GET /usuario/
    @HttpCode(200)
    find(
        @Query() queryParams
    ) {
        const consulta: FindManyOptions<AutoEntity> = {
            skip: queryParams.skip,
            take: queryParams.take
        };
        const consultaWhere = [] as FindOptionsWhere<AutoEntity>[]
        if(queryParams.auto_marca){
            consultaWhere.push({
                auto_marca: Like('%' + queryParams.auto_marca + '%'), // dr
                auto_modelo: queryParams.auto_modelo,
                auto_num_puertas: queryParams.auto_num_puertas,
                auto_ultima_fecha_servicio: queryParams.auto_ultima_fecha_servicio,
                auto_precio_dia: queryParams.auto_precio_dia,
                esta_rentado: queryParams.esta_rentado,
                auto_imagen: queryParams.auto_imagen,
            })
        }
        if(consultaWhere.length > 0){
            consulta.where = consultaWhere
        }
        return this.autoService.find(consulta);
    }
}