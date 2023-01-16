//b_componentes/Componente.tsx
type PropiedadesComponente ={
    url: string;
    iteraciones: number;
    mostrar: boolean;
}
//interface PropiedadesComponente{...}
export default function (props: PropiedadesComponente) {
    const {url, iteraciones, mostrar} = props;
    // const url = props.url;
    // const iteraciones = props.iteraciones;
    // const mostrar = props.mostrar;
    return(
        <>
            <a target="_blank" href={url}>IR A GOOGLE</a>
            {mostrar ? <p>Hello</p> : <></>}
            <div>
                {iteraciones}
            </div>
        </>
    )
}