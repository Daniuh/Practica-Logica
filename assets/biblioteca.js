class Libro {
    constructor(titulo, autor, anioPublicacion) {
        this.titulo = titulo;
        this.autor = autor;
        this.anioPublicacion = anioPublicacion;
        this.disponible = true;
    }

    info() {
        console.log(`Título: ${this.titulo}, Autor: ${this.autor}, Año: ${this.anioPublicacion}, Disponible: ${this.disponible ? 'Sí' : 'No'}`);
    }

    prestar() {
        if (this.disponible) {
            this.disponible = false;
            console.log(`El libro "${this.titulo}" ha sido prestado.`);
        } else {
            console.log(`El libro "${this.titulo}" no está disponible.`);
        }
    }

    devolver() {
        this.disponible = true;
        console.log(`El libro "${this.titulo}" ha sido devuelto.`);
    }
}

class Usuario {
    constructor(nombre, idUsuario) {
        this.nombre = nombre;
        this.idUsuario = idUsuario;
        this.librosPrestados = [];
    }

    tomarPrestado(libro) {
        if (this.librosPrestados.length < 3) {
            if (libro.disponible) {
                libro.prestar();
                this.librosPrestados.push(libro);
                console.log(`${this.nombre} ha tomado prestado "${libro.titulo}".`);
            } else {
                console.log(`${this.nombre}, el libro "${libro.titulo}" no está disponible.`);
            }
        } else {
            console.log(`${this.nombre} ya tiene 3 libros prestados, no puede tomar más.`);
        }
    }

    devolverLibro(libro) {
        const index = this.librosPrestados.indexOf(libro);
        if (index !== -1) {
            libro.devolver();
            this.librosPrestados.splice(index, 1);
            console.log(`${this.nombre} ha devuelto "${libro.titulo}".`);
        } else {
            console.log(`${this.nombre} no tiene el libro "${libro.titulo}".`);
        }
    }

    mostrarLibrosPrestados() {
        console.log(`${this.nombre} tiene prestados:`);
        this.librosPrestados.forEach(libro => libro.info());
    }
}

class Biblioteca {
    constructor(nombre) {
        this.nombre = nombre;
        this.libros = [];
        this.usuarios = [];
    }

    agregarLibro(libro) {
        this.libros.push(libro);
        console.log(`Se agregó el libro "${libro.titulo}" a la biblioteca.`);
    }

    registrarUsuario(usuario) {
        this.usuarios.push(usuario);
        console.log(`Se registró el usuario "${usuario.nombre}".`);
    }

    mostrarLibrosDisponibles() {
        console.log(`Libros disponibles en la biblioteca "${this.nombre}":`);
        this.libros.filter(libro => libro.disponible).forEach(libro => libro.info());
    }

    buscarLibro(termino) {
        const resultados = this.libros.filter(libro =>
            libro.titulo.toLowerCase().includes(termino.toLowerCase()) ||
            libro.autor.toLowerCase().includes(termino.toLowerCase())
        );

        if (resultados.length > 0) {
            console.log(`🔍 Resultados de la búsqueda para "${termino}":`);
            resultados.forEach(libro => libro.info());
        } else {
            console.log(`No se encontraron libros con "${termino}".`);
        }
    }
}

// Prueba del sistema

const biblioteca = new Biblioteca("Biblioteca Central");

const libro1 = new Libro("El principito", "Antoine de Saint-Exupéry", 1943);
const libro2 = new Libro("1984", "George Orwell", 1949);
const libro3 = new Libro("Cien años de soledad", "Gabriel García Márquez", 1967);

biblioteca.agregarLibro(libro1);
biblioteca.agregarLibro(libro2);
biblioteca.agregarLibro(libro3);

const usuario1 = new Usuario("Carlos", 1);
const usuario2 = new Usuario("María", 2);

biblioteca.registrarUsuario(usuario1);
biblioteca.registrarUsuario(usuario2);

biblioteca.mostrarLibrosDisponibles();

usuario1.tomarPrestado(libro1);
usuario1.tomarPrestado(libro2);
usuario1.mostrarLibrosPrestados();

usuario1.devolverLibro(libro1);
biblioteca.mostrarLibrosDisponibles();

biblioteca.buscarLibro("orwell");
