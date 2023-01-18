//pages/a_hola_mundo

/*const a_componente = function (){
    return (
        <></>
    )
}
*/

//export default a_componente
/*
const b_componente = () =>{
    return <></>
}
*/

import EstilosEjemplo from "../components/a_estilos/EstilosEjemplo";
import Componente from "../components/b_componentes/Componente";
import Layout from "../components/Layout";

export default function a_hola_mundo(){
    return(
        <>
            <Layout title={'Hola mundo'}>
                <h1>Hola mundo</h1>
                <EstilosEjemplo></EstilosEjemplo>
                <Componente iteraciones={3}
                            mostrar={true}
                            url={'http://google.com'}
                ></Componente>
                <Componente iteraciones={3}
                            url={'http://google.com'}
                ></Componente>
            </Layout>
        </>
    )
}