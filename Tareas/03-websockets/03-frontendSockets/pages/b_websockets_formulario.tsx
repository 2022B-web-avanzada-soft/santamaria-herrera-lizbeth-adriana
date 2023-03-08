import Layout from "@/componentes/Layout";
import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import io from "socket.io-client";
import MenuPrincipal from "@/componentes/MenuPrincipal";


const servidorWebsocket = 'http://localhost:11202';
const socket = io(servidorWebsocket);

export interface FormularioModeloDatosNoticia {
    creadorNoticia: string,
    imagenEnlace: string,
    tituloNoticia: string,
    contenidoNoticia?: string
}

export default function (props: FormularioModeloDatosNoticia) {
    const [isConnected, setIsConnected] = useState(socket.connected)
    const [mostrarSeccionComentarios, setMostrarSeccionComentarios] = useState(false)
    const [listaNoticias, setlistaNoticias] = useState([] as FormularioModeloDatosNoticia[]);
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            tituloNoticia: '',
            imagenEnlace: '',
            contenidoNoticia: '',
            creadorNoticia: ''
        },
        mode: 'all'
    })


    useEffect(
        () => {
            socket.on('connect', () => {
                setIsConnected(true);
                console.log('Si esta conectado');
            });
            socket.on('disconnect', () => {
                setIsConnected(false);
                console.log('No esta conectado');
            });
            socket.on('escucharCrearEnVivo', (data: FormularioModeloDatosNoticia) => {
                setlistaNoticias((noticiasAnteriores) => [...noticiasAnteriores, data])
            });
            return () => {
                socket.off('escucharCrearEnVivo')
            }
        },
        []
    )

    //enviarDatosYUnirse
    const crearEnVivo = (data: FormularioModeloDatosNoticia) => {
        socket.emit(
            'crearEnVivo',
            data,
            (unirseEnVivo: { mensaje: string }) => {
                setlistaNoticias((noticiasAnteriores) => [...noticiasAnteriores, data])
            }
        );
    }

    const hayNoticiasEnVivo = () => {
        if (listaNoticias.length === 0 && !mostrarSeccionComentarios) {
            return <span className={"text-dark"}> Actualmente no hay noticias en vivo</span>
        }
    }

    return (
        <>
            <Layout title="Formulario">
                <div className="row bg-white rounded" style={{marginTop: '15px'}}>
                    <div className="col-sm-12">
                        <button onClick={() => setMostrarSeccionComentarios(!mostrarSeccionComentarios)}
                                className={"btn btn-outline-primary mt-4"}
                                style={{width: "190px", float: "right"}}><strong>Crear noticia en vivo!</strong>
                        </button>
                    </div>
                    <p className={"h1 text-center mt-3 mb-2 text-primary"}>NOTICIAS EN VIVO</p>
                    <div className="row  justify-content-center">
                        <p>{hayNoticiasEnVivo()}</p>
                        {mostrarSeccionComentarios && <div className="col-sm-6">
                            <form onSubmit={handleSubmit(crearEnVivo)}>
                                <div className="mb-3">
                                    <label htmlFor="creadorNoticia" className="form-label text-dark"><strong>Creador de la
                                        Noticia</strong></label>
                                    <input type="text"
                                           className="form-control"
                                           placeholder="EJ: Lizbeth S"
                                           id="creadorNoticia"
                                           {...register('creadorNoticia', {required: 'Ingresar nombre del creador de la noticia'})}
                                           aria-describedby="creadorNoticiaHelp"
                                           name={"creadorNoticia"}/>
                                    <div id="creadorNoticiaHelp" className="form-text">
                                        Ingresa tu nombre como creador.
                                    </div>
                                    {errors.creadorNoticia &&
                                        <div className="alert alert-warning" role="alert">
                                            Tiene errores {errors.creadorNoticia.message}
                                        </div>
                                    }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tituloNoticia" className="form-label text-dark"><strong>Titulo de la
                                        Noticia</strong></label>
                                    <input type="text"
                                           className="form-control"
                                           placeholder="EJ: 10 años conectando a Quito"
                                           id="tituloNoticia"
                                           {...register('tituloNoticia', {required: 'Titulo requerido'})}
                                           aria-describedby="tituloNoticiaHelp"
                                           name={"tituloNoticia"}/>
                                    <div id="tituloNoticiaHelp" className="form-text">
                                        Ingresa el titulo de la noticia
                                    </div>
                                    {errors.tituloNoticia &&
                                        <div className="alert alert-warning" role="alert">
                                            Tiene errores {errors.tituloNoticia.message}
                                        </div>
                                    }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="imagenEnlace" className="form-label text-dark"><strong>Enlace imagen</strong></label>
                                    <input type="text"
                                           className="form-control"
                                           id="imagenEnlace"
                                           {...register('imagenEnlace')}
                                           aria-describedby="imagenEnlaceHelp"
                                           name={"imagenEnlace"}/>
                                    <div id="imagenEnlaceHelp" className="form-text">
                                        Ingresa el enlace de la imagen que desee agregar (opcional)
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="contenidoNoticia" className="form-label text-dark"><strong>Contenido de la
                                        Noticia</strong></label>
                                    <textarea rows={5} cols={77}
                                              className="form-control"
                                              id="contenidoNoticia"
                                              {...register('contenidoNoticia', {required: 'Contenido requerido'})}
                                              aria-describedby="contenidoNoticiaHelp"
                                              name={"contenidoNoticia"}/>
                                    <div id="contenidoNoticiaHelp" className="form-text">
                                        Ingresa el contenido de la noticia.
                                    </div>
                                    {errors.contenidoNoticia &&
                                        <div className="alert alert-warning" role="alert">
                                            Tiene errores {errors.contenidoNoticia.message}
                                        </div>
                                    }
                                </div>

                                <button type="submit"
                                        disabled={!isValid}
                                        className="btn btn-outline-success">
                                    <strong>Iniciar transmision en vivo</strong>
                                </button>
                                <div className="ml-3 float-left btn btn-outline-danger" style={{margin: "6px"}}>
                                    <a onClick={() => setMostrarSeccionComentarios(!mostrarSeccionComentarios)}>
                                        Cancelar
                                    </a>
                                </div>
                            </form>
                        </div>}

                        <div className="col-sm-6">
                            <div className={"mt-5 mb-3"}>
                                {listaNoticias.map((noticia, indice) =>
                                    <MenuPrincipal key={indice}
                                                   creadorNoticia={noticia.creadorNoticia}
                                                   tituloNoticia={noticia.tituloNoticia}
                                                   imagenEnlace={noticia.imagenEnlace}
                                                   contenidoNoticia={noticia.contenidoNoticia}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}