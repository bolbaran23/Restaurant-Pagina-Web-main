// Variables
const baseDeDatos = [
    {
        id: 1,
        nombre: 'Porotos',
        precio: 3000,
        imagen: './img/porotos.jpg'
    },
    {
        id: 2,
        nombre: 'Cazuela vacuno',
        precio: 5500,
        imagen: './img/cazueladevacuno.jpg'
    },
    {
        id: 3,
        nombre: 'Lomo a lo Pobre',
        precio: 4500,
        imagen: './img/lomopobre.jpeg'
    },
    {
        id: 4,
        nombre: 'Panqueques',
        precio: 2500,
        imagen: './img/panqueques.jpg'
    },
    {
        id: 5,
        nombre: 'Paila de Huevo + Marraqueta',
        precio: 2500,
        imagen: './img/pailita.jpg'
    },
    {
        id: 6,
        nombre: 'Sopaipillas',
        precio: 500,
        imagen: './img/sopaipillas.jpg'
    },
    {
        id: 7,
        nombre: 'Leche Asada',
        precio: 2000,
        imagen: './img/lecheasada.jpg'
    },
    {
        id: 8,
        nombre: 'Mote con huesillo',
        precio: 3000,
        imagen: './img/mote.jpg'
    },
    {
        id: 9,
        nombre: 'Kuchen',
        precio: 3000,
        imagen: './img/kuchen.webp'
    },
    {
        id: 10,
        nombre: 'Papas mayo',
        precio: 2000,
        imagen: './img/papasmayo.webp'
    },
    {
        id: 11,
        nombre: 'Ensalada Chilena',
        precio: 2000,
        imagen: './img/chilena.jpg'
    },
    {
        id: 12,
        nombre: 'Mix verduras',
        precio: 2000,
        imagen: './img/mix.jpg'
    },
    {
        id: 13,
        nombre: 'Bebidas espress',
        precio: 1000,
        imagen: './img/bebidas.webp'
    },
    {
        id: 14,
        nombre: 'Cafe/te',
        precio: 700,
        imagen: './img/cafe.jpg'
    },
    {
        id: 15,
        nombre: 'Cerveza',
        precio: 2000,
        imagen: './img/cerveza.webp'
    },
    {
        id: 16,
        nombre: 'Papas Fritas',
        precio: 2000,
        imagen: './img/papasfritas.jpeg'
    },
    {
        id: 17,
        nombre: 'Pebre',
        precio: 2000,
        imagen: './img/pebre.jpg'
    },
    {
        id: 18,
        nombre: 'Un sake de coca',
        precio: 5000,
        imagen: './img/coca.jpg'
    }


];

let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// Funciones

/**
 * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
 */
function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio}${divisa}`;
        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-secondary');
        miNodoBoton.textContent = 'Agregar';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}


/**
 * Evento para añadir un producto al carrito de la compra
 */
function anyadirProductoAlCarrito(evento) {
    // Anyadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'))
    // Actualizamos el carrito 
    renderizarCarrito();

}


/**
 * Dibuja todos los productos guardados en el carrito
*/
function renderizarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent = '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemBaseDatos.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} / ${miItem[0].precio}${divisa}`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'Eliminar';
        miBoton.style.marginLeft = '16px';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    // Renderizamos el precio total en el HTML
    DOMtotal.textContent = calcularTotal();
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

/**
 * Varia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderizarProductos();
renderizarCarrito();
