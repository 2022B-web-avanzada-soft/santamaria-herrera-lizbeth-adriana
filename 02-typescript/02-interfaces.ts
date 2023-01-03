// 02-interfaces.ts

export class A{

}
export interface B{

}

interface Usuario {
    nombre: string;
    apellido: string;
    edad?: number | undefined; //  opcional --> el paremetro edad a veces es number o a veces es undefined
    sueldo?: number; // opcional
    casado: boolean | 0 | 1;
    estado: 'AC' | 'IN' | 'BN';
    // funciones
    imprimirUsuario: (mensaje: string) => string | 'BN';
    calcularImpuesto: (impuesto: number) => number;
    estadoActual?: () => 'AP' | 'AF' | 'AT'; // opcional
    // calcularImpuesto parametro numero impuesto, sueldo + sueldo * impuesto
    // estadoActual no reciba parametros, 'AP' 'AF' 'AT'
}

let user: Usuario = {
    nombre: 'Adrian',
    apellido: 'Eguez',
    casado: 0,
    sueldo: 11.2,
    estado: 'AC',
    imprimirUsuario: (mensaje) => {
        return 'El mensaje es: ' + mensaje;
    },
    calcularImpuesto: impuesto => {
        return user.sueldo + user.sueldo * impuesto;
    },
    estadoActual: () => {
        switch (user.estado) {
            case 'AC':
                return 'AP';
            case 'IN':
                return 'AF';
            case 'BN':
                return 'AT';
        }
    }
}