import { setProductos } from "./filtros.js";
import { carrito } from './carrito.js'; 
import { crearModalVerMas } from './verMas.js';


class Producto {
    constructor(id, nombre, descripcion, precio, imagen, imagen2, peso, material, dimensiones) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
        this.imagen2 = imagen2;
        this.peso = peso;              
        this.material = material;       
        this.dimensiones = dimensiones;
    }


    renderizar() {
        const card = document.createElement("div");
        card.classList.add("card", "mb-4", "col-md-4");

        const img = document.createElement("img");
        img.src = this.imagen;
        img.classList.add("card-img-top");
        img.alt = this.nombre;

        img.addEventListener("mouseover", () => {
            img.src = this.imagen2 || this.imagen;
        });

        img.addEventListener("mouseout", () => {
            img.src = this.imagen;
        });

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const title = document.createElement("h3");
        title.classList.add("card-title");
        title.textContent = this.nombre;

        const description = document.createElement("p");
        description.classList.add("card-text");
        description.textContent = this.descripcion;

        const price = document.createElement("span");
        price.classList.add("card-precio");

        const precioTexto = document.createElement("strong");
        precioTexto.textContent = `Precio: $${this.precio.toLocaleString()}`;
        price.appendChild(precioTexto);

        const peso = document.createElement("p");
        peso.classList.add("card-text");
        peso.textContent = `Peso: ${this.peso || 'No disponible'}`;

        const material = document.createElement("p");
        material.classList.add("card-text");
        material.textContent = `Material: ${this.material || 'No disponible'}`;

        const dimensiones = document.createElement("p");
        dimensiones.classList.add("card-text");
        dimensiones.textContent = `Dimensiones: ${this.dimensiones || 'No disponible'}`;

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("btnContainer");

        const comprarButton = document.createElement("button");
        comprarButton.classList.add("btn", "btn-primary");
        comprarButton.textContent = "Comprar";
        comprarButton.dataset.id = this.id;

        comprarButton.addEventListener("click", (event) => {
            event.preventDefault();
            carrito.agregarProducto(this);
        });

        const verMasButton = document.createElement("button");
        verMasButton.classList.add("btn", "btn-secondary");
        verMasButton.textContent = "Ver más";
        verMasButton.dataset.id = this.id;
        verMasButton.setAttribute("data-bs-target", "#modalProducto");

        verMasButton.addEventListener("click", (event) => {
            event.preventDefault();
            crearModalVerMas(this);
        });

        buttonContainer.appendChild(comprarButton);
        buttonContainer.appendChild(verMasButton);

        cardBody.appendChild(img);
        cardBody.appendChild(title);
        cardBody.appendChild(description);

        card.appendChild(price);
        card.appendChild(buttonContainer);
        card.appendChild(cardBody);

        return card;
    }
}

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

// renderizar los productos en el DOM
export function renderizarProductos(productos) {
    const contenedor = document.getElementById("productos");
    if (!contenedor) {
        console.error('Contenedor de productos no encontrado');
        return;
    }

    contenedor.innerHTML = '';  // limpiamos el contenedor en caso de q tengamos algo dentro, pero podria eliminarse esta linea de codigo

    // itero sobre el array, cada iteracion del ciclo toma un elemento de productos y lo asigno a mi variable temporal de productodata 
    productos.forEach(productoData => {
        // creo una nueva instancia de Producto segun mi clase, y estoy definidiendo el tipo de producto a crear aca
        const producto = new Producto(
            productoData.id,
            productoData.nombre,
            productoData.descripcion,
            productoData.precio,
            productoData.imagen,
            productoData["imagen-2"],
            productoData.peso,        
            productoData.material,     
            productoData.dimensiones 
        );

        // basicamente, mi div con ID productos (contenedor), permite incorporar a la nueva constante producto con el foreach realizado accediendo a las propiedades del metood renderizar, que es donde se unen las propiedades y los objetos con this.etc
        contenedor.appendChild(producto.renderizar());
    });
}  
