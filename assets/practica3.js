const notificaciones = {
  bienvenida: {
    nombre: 'bienvenida',
    activa: true,
    mensaje: 'Bienvenido'
  },
  saldoBajo: {
    nombre: 'saldoBajo',
    activa: false,
    mensaje: 'Tu saldo es bajo'
  },
  premium: {
    nombre: 'premium',
    activa: true,
    mensaje: 'Gracias por ser premium'
  }
};

function obtenerSoloActivo() {
    const arrayNoti = Object.values(notificaciones);

    const activos = arrayNoti.filter(a => a.activa).map(a => a.mensaje);

    return activos
}

console.log(obtenerSoloActivo());