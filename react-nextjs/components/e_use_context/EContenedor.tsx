import {ContenedorContext, ContenedorContextObject} from "./ContenedorContext";
import {useEffect, useState} from "react";
import EComponenteA from "./EComponenteA";

export default function (){
    const [nombreUsuario, setNombreUsuario] = useState("Lizbeth")
    const objetoContenedorContext: ContenedorContextObject = {nombreUsuario,setNombreUsuario}

    useEffect(
        ()=>{
            console.log('Cambio en Contenedor')
        },
        [objetoContenedorContext.nombreUsuario]
    )

    return(
        <>
            <ContenedorContext.Provider value ={objetoContenedorContext}>
                <EComponenteA></EComponenteA>
            </ContenedorContext.Provider>
        </>
    )
}