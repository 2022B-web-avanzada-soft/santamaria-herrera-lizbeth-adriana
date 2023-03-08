import React, {ReactNode} from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
    children?: ReactNode
    title?: string
}

const Layout = ({children, title = 'This is the default title'}: Props) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
                  integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossOrigin="anonymous"></link>
        </Head>
        <header style={{marginTop:'5px'}}>
            <nav>
                <Link href="/">HOME / CASA</Link> |
                <Link href="/a_websockets_main">Main</Link>                 |{' '}
                <Link href="/b_websockets_formulario">Formulario</Link>     |{' '}
                <Link href="/c_websockets_enVivo">En Vivo</Link>            |{' '}
            </nav>
        </header>
        <div className={'container'}>
            {children}
        </div>
        <footer>
            <hr/>
            <span>I'm here to stay (Footer)</span>
        </footer>
    </div>
)

export default Layout