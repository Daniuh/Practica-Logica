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

--------------------------------------------------------------------------

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

-------------------------------------------------------------------------------------

(10 > 20) ? console.log("Es mayor") : console.log("Es menor")

-------------------------------------------------------------------------------------


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

------------------------------------------------------------------------------------------------------

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


let i, x = '';
for (i = 0; i < 5; i = i + 2) {
  x += i;
  console.log(x);
}


//DONE: Proceder lecciones uniendo los diferentes ciclos para ir practicando y mejorar el glosario de Js en la lógica.

const notificaciones = {
  bienvenida: {
    nombre:  'bienvenida',
    validar: (ctx) => ctx.esNuevo,
    mensaje: (ctx) => `Bienvenido ${ctx.nombre}`,
    bloquea: []
  },
  saldoBajo: {
    nombre:  'saldoBajo',
    validar: (ctx) => ctx.saldo < 10,
    mensaje: (ctx) => `Tu saldo es bajo: ${ctx.saldo}`,
    bloquea: ['bienvenida']
  },
  premium: {
    nombre:  'premium',
    validar: (ctx) => ctx.esPremium,
    mensaje: (ctx) => `Gracias por ser usuario premium`,
    bloquea: []
  }
};

const ctx = {
  nombre: 'Geraldine',
  saldo: 11,
  esNuevo: true,
  esPremium: true
};

function filtrarBloqueados(ctx) {
    const array      = Object.values(notificaciones);
    const bloqueados = [];

    for (const bloqueado of array) {
        if(bloqueado.bloquea.length && bloqueado.validar(ctx)){
            bloqueados.push(...bloqueado.bloquea)
        }
    }

    return bloqueados
}

function procesarNotificaciones(ctx, bloqueados) {
  const lista            = Object.values(notificaciones);
  const listaValidos     = [];

  for (const notificacion of lista) {
    if (notificacion.validar(ctx) && !bloqueados.includes(notificacion.nombre)) {
        listaValidos.push(notificacion);
    }
  }

  return listaValidos.length 
    ? {mostrar: true, mensajes: listaValidos}
    : {mostrar: false, mensajes: 'Sin notificaciones'}
}

const bloquedos = filtrarBloqueados(ctx);

console.log(procesarNotificaciones(ctx, bloquedos));


**/
//TODO: Profundizar en el reto y aumentar la dificultad

/**
const reglas = {
  esMayor: (ctx) => ctx.edad >= 18,
  tieneSaldo: (ctx) => ctx.saldo > 0
};

const ctx = {
  edad: 20,
  saldo: 50
};

function reglasPasan(ctx) {
    const regla = Object.values(reglas);

    let contadorCumplidas = 0;

    for (const r of regla) {
        if(r(ctx)){
            contadorCumplidas++
        }
    }
    console.log(contadorCumplidas);
}

reglasPasan(ctx);
*/

const ctx = {
  nombre: 'Alice',
  rol: 'cliente', // o 'empleado', 'cliente'
  estaBloqueado: false,
  activo: true
}

const ptx = {
  nombre: 'ServidorConfidencial',
  requiereAdmin: true,
  requiereActivo: true
}

const roles = {
  admin: {
    nombre: 'admin',
    ignora: []
  },
  empleado: {
    nombre: 'empleado',
    ignora: ['requiereAdmin']
  },
  cliente: {
    nombre: 'cliente',
    ignora: ['requiereAdmin', 'requiereActivo']
  }
}

const validaciones = {
    estaBloqueado: {
        nombre: 'estaBloqueado',
        validacion: (ctx) => ctx.estaBloqueado,
        mensaje: (ctx, ptx) => ({recurso: ptx.nombre, permitido: false, motivo: `Lo sentimos ${ctx.nombre}, pero usted se encuentra bloqueado`}),
    },
    requiereAdmin: {
        nombre: 'requiereAdmin',
        validacion: (ctx, ptx) => ptx.requiereAdmin && ctx.rol !== 'admin',
        mensaje: (ctx, ptx) => ({recurso: ptx.nombre, permitido: false, motivo: `Lo sentimos ${ctx.nombre}, pero usted requiere tener el rol de admin`}),
    },
    requiereActivo: {
        nombre: 'requiereActivo',
        validacion: (ctx, ptx) => ptx.requiereActivo && ctx.activo !== true,
        mensaje: (ctx, ptx) => ({recurso: ptx.nombre, permitido: false, motivo: `Lo sentimos ${ctx.nombre}, pero usted requiere estar activo`}) 
    }
}

function filtrarRol(usuario) {
    const rolesArray = Object.values(roles);

    for (const rol of rolesArray) {
        if (rol.nombre == usuario.rol) {
            return rol.ignora
        }
    }
}

function filtrarValidaciones(arrayIgnora) {
    const validacion         = Object.values(validaciones);
    const validacionFiltrada = [];

    for (const validar of validacion) {
        if (!arrayIgnora.includes(validar.nombre)) {
             validacionFiltrada.push(validar.nombre);
        } 
    }
    console.log(validacionFiltrada)
}

function obtenerRecursosPermitidos(usuario, recurso) {
    const validacionesArray = Object.values(validaciones);

    for (const rol of validacionesArray) {
        
    }
}

const hola = filtrarRol(ctx);

filtrarValidaciones(hola);
