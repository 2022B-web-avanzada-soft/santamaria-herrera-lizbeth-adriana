import {BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioUpdateDto} from "./dto/usuario-update.dto";
import {validate} from "class-validator";
import {UsuarioCreateDto} from "./dto/usuario-create.dto";
import {FindManyOptions, FindOptionsWhere, Like} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";


@Controller('usuario')
export class UsuarioController{
    constructor(
        private readonly usuarioService: UsuarioService
    ) {
    }
    @Get("/:id") // GET /usuario/1
    @HttpCode(200)
    findOneById(
        @Param() params
    ) {
        return this.usuarioService.findOneById(+params.id); // +"1" = 1
    }

    @Delete("/:id") // DELETE /usuario/:id
    @HttpCode(200)
    delete(
        @Param() params
    ) {
        return this.usuarioService.delete(+params.id);
    }

    @Put("/:id") // PUT /usuario/:id
    @HttpCode(200)
    async update(
        @Param() params, // {id:1}
        @Body() bodyParams // {nombres:''....}
    ) {
        const nuevoRegistro = new UsuarioUpdateDto();
        nuevoRegistro.nombre_usuario = bodyParams.nombre_usuario;
        nuevoRegistro.contrasena = bodyParams.contrasena;
        nuevoRegistro.rol = bodyParams.rol;
        const arregloErrores = await validate(
            nuevoRegistro
        ); // validamos
        if (arregloErrores.length > 0) {
            console.error({arregloErrores});
            throw new BadRequestException({
                mensaje: 'Envio mal datos'
            });
        }
        return this.usuarioService.update(
            bodyParams,
            +params.id
        );
    }

    @Post("/") // POST /usuario
    @HttpCode(201)
    async create(
        @Body() bodyParams // {nombres:''....}
    ) {
        const nuevoRegistro = new UsuarioCreateDto();
        nuevoRegistro.nombre_usuario = bodyParams.nombre_usuario;
        nuevoRegistro.contrasena = bodyParams.contrasena;
        nuevoRegistro.rol = bodyParams.rol;
        const arregloErrores = await validate(
            nuevoRegistro
        ); // validamos
        if (arregloErrores.length > 0) {
            console.error({arregloErrores});
            throw new BadRequestException({
                mensaje: 'Envio mal datos'
            });
        }
        return this.usuarioService.create(nuevoRegistro);
    }

    @Get("/") // GET /usuario/
    @HttpCode(200)
    find(
        @Query() queryParams
    ) {
        const consulta: FindManyOptions<UsuarioEntity> = {
            relations: ['renta'],
            skip: queryParams.skip ? +queryParams.skip : 0 ,
            take: queryParams.take ? +queryParams.take : 10
        };
        const consultaWhere = [] as FindOptionsWhere<UsuarioEntity>[]
        if(queryParams.nombre_usuario){
            consultaWhere.push({
                nombre_usuario: Like('%' + queryParams.nombre_usuario + '%'), // dr
                contrasena: queryParams.contrasena ? queryParams.contrasena : undefined,
                rol: queryParams.rol ? queryParams.rol : undefined // U
            })
        }
        if(consultaWhere.length > 0){
            consulta.where = consultaWhere
        }
        return this.usuarioService.find(consulta);
    }
}