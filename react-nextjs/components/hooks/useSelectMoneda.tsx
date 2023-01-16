//hooks/useSelectMoneda.tsx

import {MonedasInterface} from "../../interfaces/moneda";
import {useState} from "react";

export default function (label:string, opciones: MonedasInterface[]) {
    //select del arreglo de monedas (html – jsx element) --> seria la parte renderizada para que se utilice donde sea necesario usar
    //valor de esa moneda que se esta seleccionando
    const[moneda, setMoneda] = useState('');
    const generarJSXElementMonedas: () => JSX.Element[] =()=>{
        return opciones.map(
            (moneda:MonedasInterface)=>
                (//Iteracion (KEY ES REQUERIDO SIEMPRE)
                //opciones de la moneda
                <option key={moneda.id} id={moneda.id} value={moneda.id}>
                    {moneda.nombre}
                </option>
            )
        )
    }

    const UseSelectMonedas = (
        <>
            <label className="form-label" htmlFor={label}>{label}</label>
            <select className="form-select"
                    name={label}
                    id={label}
                    value={moneda}
                    onChange={e =>{
                        e.preventDefault();
                        setMoneda(e.target.value)
                    }
            }
            >
                <option value="">Seleccione opcion</option>
                {generarJSXElementMonedas()}
            </select>
        </>
    )
    return [moneda, UseSelectMonedas];
}