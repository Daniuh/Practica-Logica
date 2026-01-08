/***
 * Reglas de acceso a los libros
    - Si es invitado → solo puede libros que no sean especiales
    - Si es menor que la edad mínima del libro → NO puede acceder
    - Si tiene membresía premium → puede acceder a libros especiales sin importar edad
    - Profesores → pueden acceder siempre
    - Estudiantes → pueden acceder a libros normales, y a especiales solo si tienen membresía premium
 */

class Usuario {
    constructor(nombre, rol, edad, tieneMembresiaPrem){
        this.nombre             = nombre;
        this.rol                = rol;
        this.edad               = edad;
        this.tieneMembresiaPrem = tieneMembresiaPrem;
    }
}

class Libro {
    constructor(titulo, esEspecial, edadMinima){
        this.titulo      = titulo;
        this.esEspecial  = esEspecial;
        this. edadMinima = edadMinima;
    }
}

function puedeAcceder(usuario, libro) {
    let noAccede        = usuario.edad < libro.edadMinima;
    let tieneMembresia  = usuario.tieneMembresiaPrem;
    let siLibroEspecial = libro.esEspecial;

    switch (usuario.rol) {
        case 'invitado':
            if(siLibroEspecial){
                return {Permitido: false, Motivo: 'No puede acceder a libros especiales.'};
            }else if (noAccede){
                return {Permitido: false, Motivo: 'No tiene la edad minima para poder acceder a este libro.'};
            }else {
                return {Permitido: true, Motivo: 'Puede acceder al libro, disfrute de su lectura.'};
            }

        case 'profesor':
            if(noAccede){
                return {Permitido: false, Motivo: 'Aunque seas profesor, este libro no esta permitido para su edad.'};
            }else{
                return {Permitido: true, Motivo: 'Disfrute de su lectura Sr/Sra docente.'};
            }
        case 'estudiante':
            if(noAccede){
                return {Permitido: false, Motivo: 'Este libro no esta permitido para su edad.'};
            }else if(siLibroEspecial && tieneMembresia){
                return {Permitido: true,  Motivo: 'Puedes acceder a este libro especial, disfrute de su lectura.'};
            }else if(siLibroEspecial && !tieneMembresia){
                return {Permitido: false, Motivo: 'No puedes acceder a este libro especial, no tienes el pase premium.'}; 
            }else if(!siLibroEspecial){
                return {Permitido: true, Motivo: 'Disfrute la lectura de este libro normal querido estudiante.'};
            }else{
                return console.log('Disculpe las molestias, al parecer su selección no está en nuestro inventario. Intente con otro libro');
            }
    
        default:
            console.log('El rol: '+ usuario.rol + '. No es valido para acceder a nuestras instalaciones.');
            break;
    }
}

const usuario1 = new Usuario('Ana', 'estudiante', 15, false);
const libro1   = new Libro('Cien años de soledad', true, 17);

const resultado1 = puedeAcceder(usuario1, libro1);
console.log(resultado1);

const usuario2 = new Usuario('Javier', 'profesor', 18, false);
const libro2   = new Libro('Cien años de soledad', true, 17);

const resultado2 = puedeAcceder(usuario2, libro2);
console.log(resultado2);

const usuario3 = new Usuario('Jeison', 'invitado', 24, false);
const libro3   = new Libro('La vuelta al mundo en 80 días', true, 17);

const resultado3 = puedeAcceder(usuario3, libro3);
console.log(resultado3);


