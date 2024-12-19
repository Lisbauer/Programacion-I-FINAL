import { renderizarProductos } from "./cardProductos.js";
import { mostrarBanner } from "./banner.js";

// esto es un array, dentro de una variable global donde almaceno los productos
let productosGlobales = [];

// variables globales para almacenar el estado de los filtros
let filtroCategoria = "todo";  // Valor inicial sin filtro
let filtroPrecio = "";         // Valor inicial sin filtro

// funcion para crear el dropdown de categorías
export function crearDropdownCategoria() {
    const contenedor = document.getElementById("filtros");

    // Creo el html del dropdown para categorias
    const categoriaDropdown = document.createElement("select");
    categoriaDropdown.classList.add("form-select");
    categoriaDropdown.setAttribute("aria-label", "Filtrar por categoría");

    // opciones del select
    const opciones = ["Todo", "Aros", "Collares", "Anillos"];
    opciones.forEach(opcion => {
        const option = document.createElement("option");
        option.textContent = opcion;
        categoriaDropdown.appendChild(option);
    });

    // evento para filtrar por categoria con el metodo change, q se activa cuando el valor de un select o inputetc, cambia
    categoriaDropdown.addEventListener("change", (e) => {
        filtroCategoria = e.target.value.toLowerCase(); 
        filtrarProductos(true);  //  true para indicar que el cambio fue de categoria
    });

    contenedor.appendChild(categoriaDropdown);
}

// Función para crear el dropdown de precios
export function crearDropdownPrecio() {
    const contenedor = document.getElementById("filtros");

    // Crear el HTML del dropdown para precios
    const precioDropdown = document.createElement("select");
    precioDropdown.classList.add("form-select");
    precioDropdown.setAttribute("aria-label", "Filtrar por precio");

    // Opciones de precio
    const opciones = ["Menor a mayor", "Mayor a menor"];
    opciones.forEach(opcion => {
        const option = document.createElement("option");
        option.value = opcion.toLowerCase().replace(/\s/g, "");
        option.textContent = opcion;
        precioDropdown.appendChild(option);
    });

    // evento para filtrar por precio
    precioDropdown.addEventListener("change", (e) => {
        filtroPrecio = e.target.value.toLowerCase().replace(/\s/g, "");
        filtrarProductos(false);  // false porque no es un cambio de categoría
    });

    contenedor.appendChild(precioDropdown);
}

// Función para filtrar productos, el paraemtro es un indicador de si hubo un camnbio en la categoria de prod
function filtrarProductos(cambioDeCategoria) {

    let productosFiltrados = [...productosGlobales];  // uso el operador spread ... lo copio para evitar modificar el original y no afectar  a productosglobales directamente

    // filtro por categoria solo si es diferente de "todo"
    if (filtroCategoria !== "todo") {
        productosFiltrados = productosFiltrados.filter(producto =>
            producto.categoria && producto.categoria.toLowerCase() === filtroCategoria
        ); // si ambas condiciones son verdaderas, se almacenara en mi variable global
    }

    // Filtro solo productos con precio válido
    productosFiltrados = productosFiltrados.filter(producto => !isNaN(producto.precio));

    // Filtro por precio
    if (filtroPrecio === "menoramayor") {
        productosFiltrados.sort((a, b) => a.precio - b.precio);  // Menor a mayor
    } else if (filtroPrecio === "mayoramenor") {
        productosFiltrados.sort((a, b) => b.precio - a.precio);  // Mayor a menor
    }

    // se renderiza el banner si ambas son true, y como filtro adicional, evitamos la opcion de Todo
    if (cambioDeCategoria && filtroCategoria !== "todo") {
        mostrarBanner(filtroCategoria);
    }

    // se limpian las cards existentes y se renderizan  las filtradas
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";  // Se limpian las cards anteriores
    renderizarProductos(productosFiltrados);  // Re-renderizo los productos filtrados
}

// Función para almacenar los productos cargados
export function setProductos(productos) {
    productosGlobales = productos;  // almacenar los productos
}
