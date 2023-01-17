import {useContext} from "react";
import {ContenedorContext} from "./ContenedorContext";

export default function () {
    const contenedorContexto = useContext(ContenedorContext); //debe estar automaticamente tipado
    return (
        <>
            Componente C
            <p>{contenedorContexto.nombreUsuario}</p>
            <button className={"bg-blue-500 m-2"} onClick={e => {
                e.preventDefault();
                contenedorContexto.setNombreUsuario('COMPC')
            }}>
                Actualizar
            </button>
            <br/>
        </>
    )
}