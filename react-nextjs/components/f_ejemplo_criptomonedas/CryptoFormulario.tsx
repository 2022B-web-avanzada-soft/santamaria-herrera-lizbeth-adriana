import {useEffect, useState} from "react";
import {MONEDAS} from "../d_hook_custom/monedas";
import {MonedasInterface} from "../../interfaces/moneda";
import useSelectMoneda from "../hooks/useSelectMoneda";
import {ConsultarMoneda} from "../../pages/f_ejemplo_criptomonedas";

export default function (params) {
    const {setMonedas} = params;
    //Seleccioanr monedas
    const [monedasArreglo, setMonedasArreglo] = useState(MONEDAS); //En este caso lo que queremos es reutilizar las monedas
    const [criptoMonedasArreglo, setCriptoMonedasArreglo] = useState([] as MonedasInterface[]); //Lo tipamos para no equivoarnos en los datos que vayamos llenando
    const [valorMoneda, SelectMonedaComponente]=useSelectMoneda(
        'Seleccionar moneda',monedasArreglo);
            //Se necesitarán los dos valores de las constantes anteriores, por lo tanto  es necesario guardar esas variables
            //Aqui ya ponedmos usar nuestro customizado,

    //Seleccioanr cripmonedas
    const [valorCriptoMoneda, SelectCriptoMonedaComponente]=useSelectMoneda('Seleccionar criptomoneda',criptoMonedasArreglo);
    useEffect(
        () => {
            const consultarAPICripto = async () =>{
                const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
                const respuesta = await fetch(url);
                const dataPlana = await respuesta.json();
                const arregloCriptos: MonedasInterface[] = dataPlana.Data.map(
                    (criptoMoneda) =>{
                        const criptoMonedaLocal: MonedasInterface = {
                            id:criptoMoneda.CoinInfo.Name,
                            nombre: criptoMoneda.CoinInfo.FullName,
                        }
                        return criptoMonedaLocal;
                    }
                );
                setCriptoMonedasArreglo(arregloCriptos);
            }
            consultarAPICripto().then().catch((error) =>{
                console.error(error)
            })
        }
    )

    const manejarSubmitFormulario = (e) =>{
        e.preventDefault();
        const monedasConsulta: ConsultarMoneda = {
            valorCriptoMoneda: valorCriptoMoneda as string,
            valorMoneda: valorMoneda as string
        }
        setMonedas(monedasConsulta);
    }
    return(
        <>
            <form onSubmit={manejarSubmitFormulario}>
                {SelectMonedaComponente}
                {SelectCriptoMonedaComponente}
                <br/>
                <button className={'btn btn-primari w-100'} type={'submit'}>
                    Consultar
                </button>
            </form>
        </>
    )
}