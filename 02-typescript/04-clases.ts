// 04-clases.ts
class Persona {
    public nombre: string;
    public apellido: string
    static nombreReferencial: string = 'Humano'; //variables statc: existen dentro del contexto de la clase y no se transfieren al objeto de la clase.
    protected nombreYApellido = ''; // Duck Typing -> string
    constructor(
        nombreParametro: string,
        apellidoParametro: string,
    ) {
        this.nombre = nombreParametro;
        this.apellido = apellidoParametro;
        this.nombreYApellido = nombreParametro + ' ' + apellidoParametro;
    }

    private mostrarNombreApellido(): string {
        return this.nombreYApellido;
    }
}

class Usuario extends Persona {
    constructor(
        nombreParametro: string, // Parametros del constructor
        apellidoParametro: string, // Parametros del constructor
        public cedula: string, // Modificador acceso -> Propiedad de la clase
        public estadoCivil: string, // Modificador acceso -> Propiedad de la clase
    ) {
        super(nombreParametro, apellidoParametro);
        this.cedula;
        this.estadoCivil;
    }
}
const adrian = new Usuario(
    'Adrian',
    'Eguez',
    '1718137159',
    'soltero'
);
adrian.nombre;
adrian.apellido;
adrian.cedula; // '1718137159'
adrian.estadoCivil; // 'soltero'