import { renderizarProductos } from "./cardProductos.js";

// una variable global para almacenar los productos cargados
let productosGlobales = [];


// variables globales para almacenar el estado de los filtros para poder utilizar las opciones de filtrado de "todos"
let filtroCategoria = "todo";  // el valor inicial es "todo" sin aplicar ningun filtro aun
let filtroPrecio = "";  // y aca el valor inicial es "mostrarTodos" sin filtro tampoco


// dropdown de filtrado por categoria
export function crearDropdownCategoria() {
    const contenedor = document.getElementById("filtros");

    // creo el html  del dropdown para categorias
    const categoriaDropdown = document.createElement("select");
    categoriaDropdown.classList.add("form-select");
    categoriaDropdown.setAttribute("aria-label", "Filtrar por categoría"); 

    // las opciones del select
    const opciones = ["Todo", "Aros", "Collares", "Anillos"];
    opciones.forEach(opcion => {
        const option = document.createElement("option");
        option.value = opcion.toLowerCase(); 
        option.textContent = opcion;
        categoriaDropdown.appendChild(option);
    });

    // Evento para filtrar por categoria
    categoriaDropdown.addEventListener("change", (e) => {
        filtroCategoria = e.target.value.toLowerCase();  
        filtrarProductos(); // Filtrar productos después de cada cambio
    });

    contenedor.appendChild(categoriaDropdown);
}

export function crearDropdownPrecio() {
    const contenedor = document.getElementById("filtros");

    // crear el html del dropdown para precios
    const precioDropdown = document.createElement("select");
    precioDropdown.classList.add("form-select");
    precioDropdown.setAttribute("aria-label", "Filtrar por precio"); 

    // creo las opciones de precio
    const opciones = ["Menor a mayor", "Mayor a menor"];
    opciones.forEach(opcion => {
        const option = document.createElement("option");
        option.value = opcion.toLowerCase().replace(/\s/g, "");
        option.textContent = opcion;
        precioDropdown.appendChild(option);
    });

    // Evento para filtrar por precio
    precioDropdown.addEventListener("change", (e) => {
        filtroPrecio = e.target.value.toLowerCase().replace(/\s/g, "");
        filtrarProductos();  // Aplicar ambos filtros
    });

    contenedor.appendChild(precioDropdown);  
}


export function filtrarProductos() {
    if (productosGlobales.length === 0) {
        console.log("No hay productos disponibles para filtrar.");
        return;  // Si no hay productos, no hacemos nada
    }

    let productosFiltrados = [...productosGlobales];  // creo una copia para evitar modificar el array original


    // Filtro por categoria solo si no es "todo"
    if (filtroCategoria !== "todo") {
        productosFiltrados = productosFiltrados.filter(producto =>
            producto.categoria && producto.categoria.toLowerCase() === filtroCategoria
        );
    }

    // Filtro solo productos que tengan un precio valido
    productosFiltrados = productosFiltrados.filter(producto => !isNaN(producto.precio));

    // Filtro por precio 
    if (filtroPrecio === "menoramayor") {
        productosFiltrados.sort((a, b) => a.precio - b.precio);  //  menor a mayor
    } else if (filtroPrecio === "mayoramenor") {
        productosFiltrados.sort((a, b) => b.precio - a.precio);  // mayor a menor
    }

    // Limpio las cards existentes y renderizo las filtradas
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";  // se limpian las cards anteriores
    renderizarProductos(productosFiltrados);  // re-renderizo los productos filtrados
}

// productos cargados en la variable global
export function setProductos(productos) {
    console.log("Productos cargados:", productos);
    productosGlobales = productos; // Almacenar los productos
}


