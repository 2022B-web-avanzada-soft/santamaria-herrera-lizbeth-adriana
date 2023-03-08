export interface MensajeChatProps {
    nombre: string;
    mensaje: string;
    posicion: 'D' | 'I'
}
export default function (props: MensajeChatProps){
    const {nombre, mensaje, posicion} = props
    return (<>
        {
            posicion === 'D' ?
                <p className='text-right'>
                    <strong>{nombre}:</strong>{mensaje}
                </p> :
                <p className='text-left'>
                    <strong>{nombre}:</strong>{mensaje}
                </p>
        }
    </>)
}