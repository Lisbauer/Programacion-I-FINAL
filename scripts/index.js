import { cargarProductos } from './cardProductos.js';
import { crearDropdownCategoria, crearDropdownPrecio } from "./filtros.js";

// esta es mi función principal que ejecuta mi sitio web
function inicializarApp() {
    cargarProductos();  // Cargo los productos fetcheados en la pagina
    crearDropdownCategoria(); // renderizo el select de categorias
    crearDropdownPrecio(); //renderizo el select de precios
}

// ejecuta la funcion cuando el DOM esta completamente cargado
document.addEventListener('DOMContentLoaded', inicializarApp);
