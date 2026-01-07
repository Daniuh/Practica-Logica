/**
let valoresPredeterminados = [];

function saberSiPar(valoresPredeterminados) {
    let valoresPares = [];

    for (let x of valoresPredeterminados) {
        if (x % 2 === 0) {
            valoresPares.push(x);
        }
    }
    return valoresPares;
}

console.log(saberSiPar([7, 8, 9, 10, 15, 16]));

let valoresPredeterminados = [];

function contarMayoresQueDiez (valoresPredeterminados) {
    let contador = 0;

    for(let x of valoresPredeterminados){
        if(x > 10){
            contador++
        }
    }

    return contador;
}

console.log(contarMayoresQueDiez([1, 10 , 10, 24, 10, 5]));

(10 > 20) ? console.log("Es mayor") : console.log("Es menor")


class User {
    constructor(tieneEntrada, esVIP, estaEnListaNegra, vieneConAdulto, edad){
        this.tieneEntrada = tieneEntrada;
        this.esVIP = esVIP;
        this.estaEnListaNegra = estaEnListaNegra;
        this.vieneConAdulto = vieneConAdulto;
        this.edad = edad;
    }
}

function accesoEvento (user) {
    if (user.estaEnListaNegra){
        console.log('No puede ingresar');
    } else if ((user.edad >= 18 || user.vieneConAdulto) && (user.tieneEntrada || user.esVIP)) {
        console.log('Puede ingresar');
    }
}

const user1 = new User(true, false, false, false, 24);

accesoEvento(user1);

**/

class User {
    constructor(tieneEntrada, esVIP, estaEnListaNegra, vieneConAdulto, edad, rol){
        this.rol               = rol;
        this.tieneEntrada      = tieneEntrada;
        this.esVIP             = esVIP;
        this.estaEnListaNegra  = estaEnListaNegra;
        this.vieneConAdulto    = vieneConAdulto;
        this.edad              = edad;
    }
}

function accesoEvento (user) {
    let nuncaEntra   = user.estaEnListaNegra || user.edad < 16 || user.rol === 'baneado';
    let siempreEntra = user.esVIP || user.rol === 'admin';
    let validarUser  = (user.edad >= 18 || user.vieneConAdulto) && user.tieneEntrada; 
    let validarStaff = user.rol === 'staff' && !user.estaEnListaNegra;

    let noEntro = false;

    if (nuncaEntra){
        console.log('No puede ingresar');
    } else if (siempreEntra || validarUser || validarStaff) {
        console.log('Puede ingresar');
    } else {
        console.log('No puede ingresar');
    }
}

const user1 = new User(true, false, false, false, 24, 'staff');

accesoEvento(user1);
