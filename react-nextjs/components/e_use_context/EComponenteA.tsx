import {useContext, useEffect} from "react";
import {ContenedorContext} from "./ContenedorContext";
import EComponenteB from "./EComponenteB";

export default function () {
    const contenedorContexto = useContext(ContenedorContext); //debe estar automaticamente tipado
    useEffect(
        ()=>{
            console.log('Cambio en algun lado del nombre',contenedorContexto.nombreUsuario)
        },
        [contenedorContexto.nombreUsuario]
    )
    return (
        <>
            Componente A
            <p>{contenedorContexto.nombreUsuario}</p>
            <button className={"bg-blue-500 m-2"} onClick={e => {
                e.preventDefault();
                contenedorContexto.setNombreUsuario('COMPA')
            }}>
                Actualizar
            </button>
            <br/>
            <EComponenteB></EComponenteB>
        </>
    )
}