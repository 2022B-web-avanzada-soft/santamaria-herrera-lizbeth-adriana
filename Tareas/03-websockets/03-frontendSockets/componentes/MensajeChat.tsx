export interface MensajeChatProps {
    nombre?: string;
    mensaje?: string ;
    posicion: 'D' | 'I'
}
export default function (props: MensajeChatProps){
    const {nombre, mensaje, posicion} = props
    return (<>
        {
            posicion === "D" ?
                <p style={{textAlign:"right"}}  className={"text-dark"}>
                    <strong>{nombre}: </strong>{mensaje}
                </p> :
                <p style={{textAlign:"left"}} className={"text-dark"}>
                    <strong>{nombre}: </strong>{mensaje}
                </p>
        }
    </>)
}