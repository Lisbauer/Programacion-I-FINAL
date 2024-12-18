import { setProductos, filtrarProductos } from "./filtraciones.js";
import { carrito } from './carrito.js'; 
import { crearModalVerMas } from './verMas.js';

// cargo mi json y lo renderizo
export async function cargarProductos() {
    try {
        const response = await fetch('./productos.json');
        const productos = await response.json();
        
        setProductos(productos); 
        renderizarProductos(productos); 
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}

// renderiza los productos
export function renderizarProductos(productos) {
    const contenedor = document.getElementById("productos");
    if (!contenedor) {
        console.error('Contenedor de productos no encontrado'); // para borrar luego, depuramos 
        return;
    }

    // limpio el contenedor antes de agregar nuevos productos
    contenedor.innerHTML = '';

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("card", "mb-4", "col-md-4");

        const img = document.createElement("img");
        img.src = producto.imagen;
        img.classList.add("card-img-top");
        img.alt = producto.nombre;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const title = document.createElement("h3");
        title.classList.add("card-title");
        title.textContent = producto.nombre;

        const description = document.createElement("p");
        description.classList.add("card-text");
        description.textContent = producto.descripcion;

        const price = document.createElement("span");
        price.classList.add("card-precio");
        const precioTexto = document.createElement("strong");
        precioTexto.textContent = `Precio: $${producto.precio.toLocaleString()}`;
        price.appendChild(precioTexto); 

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("btnContainer");

       
        const comprarButton = document.createElement("button");
        comprarButton.classList.add("btn", "btn-primary");
        comprarButton.textContent = "Comprar";
        comprarButton.dataset.id = producto.id;

        comprarButton.addEventListener("click", (event) => {
            event.preventDefault();  
            carrito.agregarProducto(producto);
            actualizarContador(); 
        });
        
        
        const verMasButton = document.createElement("button");
        verMasButton.classList.add("btn", "btn-secondary");
        verMasButton.textContent = "Ver más";
        verMasButton.dataset.id = producto.id;
        verMasButton.setAttribute("data-bs-target", "#modalProducto");

        verMasButton.addEventListener("click", (event) => {
            event.preventDefault();  
            crearModalVerMas(producto);
        });

        buttonContainer.appendChild(comprarButton);
        buttonContainer.appendChild(verMasButton);

        cardBody.appendChild(img);
        cardBody.appendChild(title);
        cardBody.appendChild(description);
        card.appendChild(price);
        card.appendChild(buttonContainer);
        card.appendChild(cardBody);

        contenedor.appendChild(card);
    });
}
