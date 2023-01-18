//pages/c_use_state.tsx
import EstilosEjemplo from "../components/a_estilos/EstilosEjemplo";
import Componente from "../components/b_componentes/Componente";
import EjemploUseState from "../components/c_use_state/EjemploUseState";
import Layout from "../components/Layout";

export default function (){
    return(
        <>
            <Layout title={'Use State'}>
                <h1>USE STATE</h1>
                <EjemploUseState></EjemploUseState>
            </Layout>
        </>
    )
}