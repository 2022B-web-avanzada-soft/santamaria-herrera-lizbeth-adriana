import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import io from "socket.io-client";
import {FormularioModeloDatosNoticia} from "@/pages/b_websockets_formulario";
import MensajeChat, {MensajeChatProps} from "@/componentes/MensajeChat";

const servidorWebsocket = 'http://localhost:11202';
const socket = io(servidorWebsocket);

export type formatoListaMenu = FormularioModeloDatosNoticia;

export interface FormularioModeloMensaje {
    tituloNoticia?: string
    nombreUsuario: string
    mensaje: string
}

export default function (props: formatoListaMenu) {
    const {creadorNoticia, tituloNoticia, imagenEnlace, contenidoNoticia} = props
    const [mensajes, setMensajes] = useState([] as MensajeChatProps[]);
    const [mostrarSeccionComentarios, setMostrarSeccionComentarios] = useState(false)

    const {control, register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            nombreUsuario: '',
            mensaje: ''
        },
        mode: 'all'
    })

    useEffect(
        () => {
            socket.on('escucharEventoUnirseEnVivoYEnviarMensaje', (data: FormularioModeloMensaje) => {
                const nuevoMensaje: MensajeChatProps = {
                    mensaje: data.mensaje,
                    nombre: data.nombreUsuario,
                    posicion: 'I'
                };
                setMensajes((mensajesAnteriores) => [...mensajesAnteriores, nuevoMensaje]);
                console.log("Se unieron a la sala")
            });
            return () => {
                socket.off('escucharEventoUnirseEnVivoYEnviarMensaje')
            }
        },
        []
    )

    //enviarDatosYUnirse
    const enviarComentarios = (data: FormularioModeloMensaje) => {
        const enviarMensaje = {
            tituloNoticia: props.tituloNoticia,
            nombreUsuario: data.nombreUsuario,
            mensaje: data.mensaje
        };
        socket.emit(
            'unirseEnVivoYEnviarMensaje',
            enviarMensaje,
            (unirseEnVivo: { mensaje: string }) => {
                const nuevoMensaje: MensajeChatProps = {
                    mensaje: data.mensaje,
                    nombre: data.nombreUsuario,
                    posicion: 'D'
                };
                setMensajes((mensajesAnteriores) => [...mensajesAnteriores, nuevoMensaje]);
            }
        );
    }

    return (<>
        {
            <div className={"row border-bottom border-secondary mt-4"}>
                <div className={"rounded mr-2 col-1"} style={{width: "130px", height: "83px", float: "left"}}>
                    <img className={"img-fluid"}
                         id={"imagenNoticia"}
                         src={imagenEnlace}
                         alt={"imagenNoticia"}/>
                </div>

                <div className={"col-6"} style={{float: "left"}}>
                    <p className={"mt-2 mb-2 text-center text-dark"}><strong>{tituloNoticia}</strong></p>
                    <p className={"text-dark"}>Creado por: {creadorNoticia}</p>
                </div>
                <div className={"col"}>
                    <button type={"submit"}
                            onClick={() => setMostrarSeccionComentarios(!mostrarSeccionComentarios)}
                            className={"btn btn-outline-primary mt-4"}
                            style={{float: "right"}}>Enviar Comentario
                    </button>
                </div>
                <div className={"clearfix"}></div>
                <div className={"text-dark"}>{contenidoNoticia}</div>
                {mostrarSeccionComentarios && <div id={"comentario"}>
                    <div className={"mb-3"}>
                        <div className={"p-0 justify-content-end"}>
                            <form onSubmit={handleSubmit(enviarComentarios)}>
                                <p className="form-label text-secondary text-center mt-5"><strong>Comentarios</strong></p>
                                <input type={"text"} placeholder={"Ingresa tu nombre"} id={'nombreUsuario'}
                                       className={"form-control"}
                                       {...register("nombreUsuario", {required: 'Nombre requerido'})}/>
                                <div className="input-group bg-light">
                                    <input type="text" className="form-control border-success"
                                           id="mensaje"
                                           placeholder={"Comentario"}
                                           {...register('mensaje')}/>
                                    <button disabled={!isValid} type="submit" className="btn btn-outline-success">Enviar
                                    </button>
                                </div>

                                {mensajes.map((mensaje, indice) =>
                                    <MensajeChat key={indice}
                                                 mensaje={mensaje.mensaje}
                                                 nombre={mensaje.nombre}
                                                 posicion={mensaje.posicion}
                                    />)
                                }
                            </form>
                        </div>
                    </div>
                </div>}
            </div>
        }
    </>)
}