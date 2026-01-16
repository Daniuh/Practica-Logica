/***
 * Reglas de acceso a los libros
    - Si es invitado → solo puede libros que no sean especiales
    - Si es menor que la edad mínima del libro → NO puede acceder
    - Si tiene membresía premium → puede acceder a libros especiales sin importar edad
    - Profesores → pueden acceder siempre
    - Estudiantes → pueden acceder a libros normales, y a especiales solo si tienen membresía premium

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

 */

/***
 * Reglas de prioridad (MUY IMPORTANTE)
    - Si está baneado → NO puede reservar nunca
    - Admin → puede reservar siempre, aunque no haya cupo
    - Staff → puede reservar si hay cupo
    - Usuario normal →
    - solo puede reservar si hay cupo y solo en horario permitido
    - Si no hay cupo → nadie reserva (excepto admin)

 * Horarios permitidos para usuarios normales:
    08:00 a 20:00
    Staff y Admin no tienen restricción de horario.
 

class Usuario {
    constructor(nombre, rol, estaBaneado, horaDeseada){
        this.nombre      = nombre;
        this.rol         = rol;
        this.estaBaneado = estaBaneado;
        this.horaDeseada = horaDeseada;
    }
}

class Sala {
    constructor(nombre, cupoMaximo){
        this.nombre           = nombre;
        this.cupoMaximo       = cupoMaximo;
        this.reservasActuales = 2;
    }
}

function puedeReservar (usuario, sala){
    let nuncaReserva       = usuario.estaBaneado;
    let hayCupo          = sala.reservasActuales < sala.cupoMaximo;
    let horario            = usuario.horaDeseada >=8 && usuario.horaDeseada <= 20; 
    let validarUsuarioHora = horario;

    let mensajeBan         = {permitido: false, motivo: `Lo sentimos ${usuario.nombre}, pero estás baneado, revisa el motivo y solicita el desbaneo para poder volver a reservar.`};
    let mensajeApro        = {permitido: true, motivo: `Felicidades ${usuario.nombre}, su reserva esta lista, recuerde estar 5 min antes de la hora reservada.`};
    let mensajeCupo        = {permitido: false, motivo: `Lo sentimos ${usuario.nombre}, pero actualmente las salas están ocupadas, intentelo de nuevo más tarde.`};
    let mensajeUsuarioHora = {permitido: false, motivo: `Lo sentimos ${usuario.nombre}, pero la hora elegida no está dentro del horario permitido.`};

    if(nuncaReserva){return mensajeBan;}

    switch (usuario.rol) {
        case 'staff':
            if(hayCupo){
                return mensajeApro;
            } else{
                return mensajeCupo;
            }
        
        case 'admin':
            return mensajeApro;
    
        case 'usuario normal':
            if(!hayCupo){
                return mensajeCupo;
            } else if(!validarUsuarioHora){
                return mensajeUsuarioHora;
            } else{
                return mensajeApro;
            }

        default:
            console.log(`Lo sentimos pero ${usuario.rol}, no es un rol existente en nuestras instalaciones`)
            break;
    }
}

const usuario1 = new Usuario('Geraldine', 'usuario normal', false, 10);

const sala1 = new Sala('Sala Video Juegos', 4);

console.log(puedeReservar(usuario1, sala1));

*/

/**
 * Bloqueos
    - Si el usuario está bloqueado → NO puede pedir nunca
    - Si el pedido supera el saldo → NO se aprueba
   ADMIN
    - Puede aprobar cualquier pedido
    - Ignora saldo
    - Ignora horario pico
   EMPLEADO
    - Puede pedir solo si:
        - hay saldo suficiente
        - NO es horario pico
   CLIENTE
    - Puede pedir solo si:
        - hay saldo suficiente
        - el total es <= 50 
        - NO es horario pico
 

class Usuario {
    constructor(nombre, rol, estaBloqueado, saldo) {
        this.nombre        = nombre;
        this.rol           = rol;
        this.estaBloqueado = estaBloqueado;
        this.saldo         = saldo;
    }
}

class Pedido {
    constructor(total, esHoraPico) {
        this.total      = total;
        this.esHoraPico = esHoraPico;
        this.estado     = 'pendiente';
    }
}

function procesarPedido(usuario, pedido) {
    let usuarioBloq          = usuario.estaBloqueado;
    let saldoInsuficiente    = pedido.total > usuario.saldo;
    let esHoraPico           = pedido.esHoraPico;
    let totalEsMayor         = pedido.total > 50;

    function pedidoAprobado(pedido) {pedido.estado = 'aprobado';}
    function pedidoRechazado(pedido) {pedido.estado = 'rechazado';}
    
    //let mensajeAprovado  = {estado: 'Aprovado', motivo: `Muchas gracias ${usuario.nombre} por realizar el pedido, en breves será despachado.`};
    
    //let mensajeBloqueado   = {estado: 'Rechazado', motivo: `Lo sentimos ${usuario.nombre}, pero se encuentra su usuario bloqueado, pongase en contacto con servicio al cliente.`};
    //let mensajeEsHoraPico  = {estado: 'Rechazado', motivo: `Lo sentimos ${usuario.nombre}, pero en estos momentos nos encontramos en horario pico, intentelo de nuevo más tarde`};
    //let mensajeSaldoInsu   = {estado: 'Rechazado', motivo: `Lo sentimos ${usuario.nombre}, pero su cuenta se encuentra en estos momentos sin saldo, lo invitamos a que la recargue para poder proceder con el pedido.`};
    //let mensajeTotalMayor  = {estado: 'Rechazado', motivo: `Lo sentimos ${usuario.nombre}, pero el pedido es mayor que $50, intente de nuevo con productos igual o inferior al valor $50.`};
    //let mensajeRolNoExiste = {estado: 'Rechazado', motivo: `Lo sentimos ${usuario.nombre}, pero el usuario indicado no existe, verifique su usuario antes de intentar hacer un pedido.`};

    switch (usuario.rol) {
        case 'admin':
            if(usuarioBloq){
                pedidoRechazado(pedido);
                return {estado: 'Rechazado', motivo: `Lo sentimos ${usuario.nombre}, pero se encuentra su usuario bloqueado, pongase en contacto con servicio al cliente.`};
            }
            pedidoAprobado(pedido);
            return {estado: 'Aprovado', motivo: `Muchas gracias ${usuario.nombre} por realizar el pedido, en breves será despachado.`};
        case 'empleado':
            if(usuarioBloq){
                pedidoRechazado(pedido);
                return {estado: 'Rechazado', motivo: `Lo sentimos ${usuario.nombre}, pero se encuentra su usuario bloqueado, pongase en contacto con servicio al cliente.`};
            }
            if(saldoInsuficiente){
                pedidoRechazado(pedido);
                return {estado: 'Rechazado', motivo: `Lo sentimos ${usuario.nombre}, pero su cuenta se encuentra en estos momentos sin saldo, lo invitamos a que la recargue para poder proceder con el pedido.`};   
            }
            if(esHoraPico){
                pedidoRechazado(pedido);
                return {estado: 'Rechazado', motivo: `Lo sentimos ${usuario.nombre}, pero en estos momentos nos encontramos en horario pico, intentelo de nuevo más tarde`};;
            }
            pedidoAprobado(pedido);
            return {estado: 'Aprovado', motivo: `Muchas gracias ${usuario.nombre} por realizar el pedido, en breves será despachado.`};
        case 'cliente':
            if(usuarioBloq){
                pedidoRechazado(pedido);
                return {estado: 'Rechazado', motivo: `Lo sentimos ${usuario.nombre}, pero se encuentra su usuario bloqueado, pongase en contacto con servicio al cliente.`};
            }
            if(totalEsMayor){
                pedidoRechazado(pedido);
                return {estado: 'Rechazado', motivo: `Lo sentimos ${usuario.nombre}, pero el pedido es mayor que $50, intente de nuevo con productos igual o inferior al valor $50.`};
            }
            if(saldoInsuficiente){
                pedidoRechazado(pedido);
                return {estado: 'Rechazado', motivo: `Lo sentimos ${usuario.nombre}, pero su cuenta se encuentra en estos momentos sin saldo, lo invitamos a que la recargue para poder proceder con el pedido.`};
            }
            if(esHoraPico){
                pedidoRechazado(pedido);
                return {estado: 'Rechazado', motivo: `Lo sentimos ${usuario.nombre}, pero en estos momentos nos encontramos en horario pico, intentelo de nuevo más tarde`};;
            }
            pedidoAprobado(pedido);
            return {estado: 'Aprovado', motivo: `Muchas gracias ${usuario.nombre} por realizar el pedido, en breves será despachado.`};
        default:
            pedidoRechazado(pedido);
            return {estado: 'Rechazado', motivo: `Lo sentimos ${usuario.nombre}, pero el usuario indicado no existe, verifique su usuario antes de intentar hacer un pedido.`};
    }
}

const usuario1 = new Usuario('Emily', 'cliente', false, 55);
const pedido1  = new Pedido(45, true);

console.log(procesarPedido(usuario1, pedido1));

*/

/**
 * Versión con objetos literales y funcion factory
 */

function usuario(nombre, rol, estaBloqueado, saldo){
    return {
        nombre,
        rol,
        estaBloqueado,
        saldo,
        activo: true
    }
}

function pedido(total, esHoraPico){
    return{
        total,
        esHoraPico,
        activo: true
    }
}

const roles = {
    admin: {
        ignora: ['horario', 'saldo', 'valorPedido']
    },
    empleado: {
        ignora: ['valorPedido']
    },
    cliente: {
        ignora: []
    } 
}

const validaciones = {
    bloqueado: {
        nombre: 'bloqueado',
        validar: (mid) => mid.usuario.estaBloqueado,
        mensaje: (mid) => `Lo sentimos ${mid.usuario.nombre}, pero usted se encuentra bloqueado, debido a esto no puede realizar pedidos.`
    },
    saldo: {
        nombre: 'saldo',
        validar: (mid) => mid.pedido.total > mid.usuario.saldo,
        mensaje: (mid) => `Lo sentimos ${mid.usuario.nombre}, pero su saldo es inferior al total del pedido que desea realizar, recargue su cuenta para poder realizar el pago.`
    },
    horario: {
        nombre: 'horario',
        validar: (mid) => mid.pedido.esHoraPico,
        mensaje: (mid) => `Lo sentimos ${mid.usuario.nombre}, pero en estos momentos nos encontramos en una alta demanda por lo que podemos procesar su pedido, intente de nuevo más tarde.`
    },
    valorPedido: {
        nombre: 'valorPedido',
        validar: (mid) => mid.pedido.total > 50,
        mensaje: (mid) => `Lo sentimos ${mid.usuario.nombre}, pero su pedido no puede superar el monto de $50.`
    }
}

function obtenerReglasPorRol(rol) {
    const ignoradas = roles[rol].ignora;

    return Object.values(validaciones).filter(
        validar => !ignoradas.includes(validar.nombre)
    )
}

function procesarReglas(mid, validaciones) {
    for( const regla of validaciones){
        if(regla.validar(mid)) {
            return {
                permitido: false,
                motivo: regla.mensaje(mid)
            };
        }
    }

    return {
        permitido: true,
        motivo: `Felicidades ${mid.usuario.nombre}, su pedido fue aprobado y ya está siendo preparado, gracias por su compra.`
    }
}

const usuario1 = usuario('Geraldine', 'admin', true, 45);
const pedido1  = pedido(40, true);

const mid = {
    usuario: usuario1, 
    pedido: pedido1
};

const reglasAplicables = obtenerReglasPorRol(usuario1.rol);

const resultado = procesarReglas(mid, reglasAplicables);

console.log(resultado);