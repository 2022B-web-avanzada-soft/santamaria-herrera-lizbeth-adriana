import {useContext} from "react";
import {ContenedorContext} from "./ContenedorContext";
import EComponenteC from "./EComponenteC";

export default function () {
    const contenedorContexto = useContext(ContenedorContext); //debe estar automaticamente tipado
    return (
        <>
            Componente B
            <p>{contenedorContexto.nombreUsuario}</p>
            <button className={"bg-blue-500 m-2"} onClick={e => {
                e.preventDefault();
                contenedorContexto.setNombreUsuario('COMPB')
            }}>
                Actualizar
            </button>
            <br/>
            <EComponenteC></EComponenteC>
        </>
    )
}