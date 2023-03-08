import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import {Server, Socket} from 'socket.io';

@WebSocketGateway(
    11202, // Puerto donde esta escuchando el servidor de websockets
    {
        cors: {
            origin: '*', // Habilitando la conexion desde cualquier IP
        }
    })

export class EventosGateway {
    @SubscribeMessage('crearEnVivo')
    crearEnVivo(
        @MessageBody()
            message: { creadorNoticia: string, tituloNoticia: string, imagenEnlace: string, contenidoNoticia: string }, // parametros metodo
        @ConnectedSocket()
            socket: Socket
    ) {
        const mensajeEnVivo = {
            creadorNoticia: message.creadorNoticia,
            tituloNoticia: message.tituloNoticia,
            imagenEnlace: message.imagenEnlace,
            contenidoNoticia: message.contenidoNoticia,
        };
        socket.broadcast
            .emit('escucharCrearEnVivo', mensajeEnVivo);
        socket.join(message.tituloNoticia);
        return {mensaje: 'ok'};
    }

    @SubscribeMessage('unirseEnVivoYEnviarMensaje')
    unirseEnVivoYEnviarMensaje(
        @MessageBody()
            message: { tituloNoticia: string, nombreUsuario: string, mensaje: string }, // parametros metodo
        @ConnectedSocket()
            socket: Socket
    ) {
        socket.join(message.tituloNoticia);
        const enviarMensaje = {
            tituloNoticia: message.tituloNoticia,
            nombreUsuario: message.nombreUsuario,
            mensaje: message.mensaje

        };
        socket.broadcast
            .to(message.tituloNoticia)
            .emit('escucharEventoUnirseEnVivoYEnviarMensaje', enviarMensaje);
        return {mensaje: 'ok'};
    }
}
