//componentes/d_hook_custom/HookCustom.tsx

import useSelectMoneda from "../hooks/useSelectMoneda";
import {useEffect, useState} from "react";

export default function () {
    const [moneda, UseSelectMonedas] = useSelectMoneda(
        'Moneda',
        [
            {id:'USD', nombre:'Dolar Estado Unidos'},
            {id:'MXN', nombre:'Peso Mexicano'},
            {id:'EUR', nombre:'Euro'},
            {id:'GBP', nombre:'Libra esterlina'}
        ]
    )
    useEffect(
        () =>{
            console.log('Cambio moneda', moneda)
        },
        [moneda]
    )

    return(
        <>
            {UseSelectMonedas}
        </>
    )
}