import { cargarProductos } from './cardProductos.js';
import { crearDropdownCategoria, crearDropdownPrecio, setProductos, filtrarProductos } from "./filtraciones.js";
import { carrito } from './carrito.js'; 

// esta es mi función principal que ejecuta mi sitio web
function inicializarApp() {
    cargarProductos();  // Cargo los productos fetcheados en la pagina
    crearDropdownCategoria(); // select de categorias
    crearDropdownPrecio(); //select de precios

    // evento para abrir el carrito cuando se hace clic en su icono
    const carritoIcono = document.getElementById('carrito-contenedor');
    carritoIcono.addEventListener('click', () => {
        carrito.abrirModalCarrito();
    });

    const botonesAgregarCarrito = document.querySelectorAll('.btn-agregar-carrito');  // botones en cada card // BORRARRRRR
    
    botonesAgregarCarrito.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const producto = btn.dataset.producto;  // obtengoel ID del producto desde el boton
            carrito.agregarProducto(producto);      // agrego el producto al carrito
        });
    });
}

// ejecuta la funcion cuando el DOM esta completamente cargado
document.addEventListener('DOMContentLoaded', inicializarApp);
