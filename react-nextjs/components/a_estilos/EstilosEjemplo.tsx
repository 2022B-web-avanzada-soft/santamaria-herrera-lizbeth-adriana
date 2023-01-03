//components/a_estilos/EstilosEjemplos.tsx

import styles from './estilos.module.css'
//Los estilos deben tener el nombre "module.css"

export default function (){
    const misEstilos={
        color: 'white',
        backgroundColor: 'Black',
        borderBottom: '5px solid yellow'
    }
    return(
        <>
            <div style={misEstilos}>Otros estilos</div>
            <div className={styles.rojo}>
                Hola
            </div>
        </>
    )
}

