import { finalizarCompraModal } from "./finalizarCompra.js";
import { detectarTeclaCerrar } from "./detectorTeclado.js";

export class Carrito {
  constructor() {
    // cargo los productos del carrito desde el localStorage (si es q existen)
    this.productosEnCarrito =
      JSON.parse(localStorage.getItem("productosEnCarrito")) || [];
    this.actualizarContadorCarrito(); // actualiza el contador cuando se cargue el carrito

    const carritoIcono = document.getElementById('carrito-contenedor');
    carritoIcono.addEventListener('click', () => {
        this.abrirModalCarrito();
    });
  }

  agregarProducto(producto) {
    // verifico si el producto ya esta en el carrito para no repetirlo
    const productoExistente = this.productosEnCarrito.find(
      (p) => p.id === producto.id
    );
    if (productoExistente) {
      productoExistente.cantidad += 1; // si ya esta, sumo de uno en uno
    } else {
      // Si no esta, lo agregamos al carrito para que no se repitan los items.
      this.productosEnCarrito.push({ ...producto, cantidad: 1 });
    }
    this.actualizarModalCarrito(); // actualizo el carrito
    this.actualizarContadorCarrito(); // actualizo el contador del carrito
    this.guardarEnLocalStorage(); // Guardar los productos en el localStorage

    
  }

  abrirModalCarrito() {
    const modalCarrito = document.getElementById("modal-carrito");
    modalCarrito.style.display = "block"; // mostrar el modal

    this.actualizarModalCarrito(); // actualizo el contenido del modal con los productos del carrito

    const cerrarModal = () => {
      modalCarrito.style.display = "none"; // se cierra el modal
    };

    //llamo a la funcion global para detectar teclas
    document.addEventListener("keydown", (event) =>
      detectarTeclaCerrar(event, cerrarModal)
    );
    // hidden es un evento de bootstrap q dispara cuando el modal cierra y sirve para posibles limpiezas
    modalCarrito.addEventListener("hidden.bs.modal",() => {
      modalCarrito.remove();
      document.removeEventListener("keydown", detectarTeclaCerrar); // remuevo el evento para q el naveghador no siga procesandolo, no hay otro motivo
    });
  }

  actualizarModalCarrito() {
    const modalContenido = document.getElementById("modal-carrito-contenido");
    modalContenido.innerHTML = ""; // limpio el contenido del modal

    if (this.productosEnCarrito.length === 0) {
      const mensajeVacio = document.createElement("p");
      mensajeVacio.textContent = "El carrito está vacío.";
      modalContenido.appendChild(mensajeVacio);

      // boton de cierre
      const botonCerrar = document.createElement("button");
      botonCerrar.textContent = "Cerrar";
      botonCerrar.classList.add("btn", "btn-danger", "btn-sm", "close-button");
      botonCerrar.addEventListener("click", () => this.cerrarModalCarrito());
      modalContenido.appendChild(botonCerrar);

      return;
    }

    // variable para calcular el total, iniciamos en 0
    let totalCarrito = 0;

    // HTML para cada producto
    this.productosEnCarrito.forEach((producto) => {
      const productoDiv = document.createElement("div");
      productoDiv.classList.add(
        "producto-carrito",
        "d-flex",
        "align-items-center",
        "mb-3"
      );

      const img = document.createElement("img");
      img.src = producto.imagen;
      img.alt = producto.nombre;
      img.classList.add("img-carrito", "me-3");
      productoDiv.appendChild(img);

      const infoDiv = document.createElement("div");
      infoDiv.classList.add("info-carrito", "flex-grow-1");

      const productoNombre = document.createElement("p");
      productoNombre.textContent = producto.nombre;
      productoNombre.classList.add("mb-1", "fw-bold");
      infoDiv.appendChild(productoNombre);

      const productoCantidad = document.createElement("p");
      productoCantidad.textContent = `Cantidad: ${producto.cantidad}`;
      productoCantidad.classList.add("mb-1", "text-muted");
      infoDiv.appendChild(productoCantidad);

      const productoPrecio = document.createElement("p");
      productoPrecio.textContent = `Precio: $${(
        producto.precio * producto.cantidad
      ).toLocaleString()}`;
      productoPrecio.classList.add("mb-0", "text-muted");
      infoDiv.appendChild(productoPrecio);

      productoDiv.appendChild(infoDiv);

      // Botones para sumar/restar
      const botonSumar = document.createElement("button");
      botonSumar.classList.add("btn", "btn-sm", "btn-outline-success", "ms-2");
      botonSumar.textContent = "+";
      botonSumar.addEventListener("click", () =>
        this.cambiarCantidadProducto(producto.id, "sumar")
      );
      productoDiv.appendChild(botonSumar);

      const botonRestar = document.createElement("button");
      botonRestar.classList.add("btn", "btn-sm", "btn-outline-danger", "ms-2");
      botonRestar.textContent = "-";
      botonRestar.addEventListener("click", () =>
        this.cambiarCantidadProducto(producto.id, "restar")
      );
      productoDiv.appendChild(botonRestar);

      modalContenido.appendChild(productoDiv);

      // Calcular el total
      totalCarrito += producto.precio * producto.cantidad;
    });

    // Mostrar el total
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("mt-3", "fw-bold");
    totalDiv.textContent = `Total: $${totalCarrito.toLocaleString()}`;
    modalContenido.appendChild(totalDiv);

    // Agregar botones de acción
    const accionesDiv = document.createElement("div");
    accionesDiv.classList.add("d-flex", "justify-content-evenly", "mt-3");

    const botonLimpiarCarrito = document.createElement("button");
    botonLimpiarCarrito.classList.add("btn", "btn-danger");
    botonLimpiarCarrito.textContent = "Limpiar Carrito";
    botonLimpiarCarrito.addEventListener("click", () => this.limpiarCarrito());
    accionesDiv.appendChild(botonLimpiarCarrito);

    const botonCerrar = document.createElement("button");
    botonCerrar.classList.add("btn", "btn-secondary");
    botonCerrar.textContent = "Cerrar";
    botonCerrar.addEventListener("click", () => this.cerrarModalCarrito());
    accionesDiv.appendChild(botonCerrar);

    const btnFinalizar = document.createElement("button");
    btnFinalizar.classList.add("btn", "btn-primary");
    btnFinalizar.textContent = "Finalizar Compra";
    btnFinalizar.addEventListener("click", () => {
      this.vaciarCarrito(); // Vaciar el carrito al finalizar la compra
      finalizarCompraModal.abrirModal();
    });
    accionesDiv.appendChild(btnFinalizar);

    modalContenido.appendChild(accionesDiv);
  }

  vaciarCarrito() {
    this.productosEnCarrito = []; // limpiar el array de productos
    this.actualizarModalCarrito(); // actualiza el modal
    this.actualizarContadorCarrito(); // actualiza el contador del carrito
    this.guardarEnLocalStorage(); // guarda la version vacia en localStorage
  }

  limpiarCarrito() {
    this.vaciarCarrito(); // vaciar el carrito
  }

  cerrarModalCarrito() {
    const modalCarrito = document.getElementById("modal-carrito");
    modalCarrito.style.display = "none";
  }

  // funcion que se ebcarga del manejo de sumar y restar dentro del modal de carrito
  cambiarCantidadProducto(idProducto, accion) {
    const producto = this.productosEnCarrito.find((p) => p.id === idProducto);
    if (producto) {
      // vverifico que la cantidad no se vuelva negativa
      if (accion === "sumar") {
        producto.cantidad += 1;
      } else if (accion === "restar") {
        if (producto.cantidad > 1) {
          producto.cantidad -= 1;
        } else {
          // Si la cantidad es 1, se elimina el producto
          this.productosEnCarrito = this.productosEnCarrito.filter(
            (p) => p.id !== idProducto
          );
        }
      }

      // se actualiza el contenido del modal con la nueva cantidad
      this.actualizarModalCarrito();
      this.actualizarContadorCarrito(); // y se actualiza el contador del carrito
      this.guardarEnLocalStorage(); // guarda cambios en localStorage
    }
  }

  actualizarContadorCarrito() {
    const contador = document.getElementById("contador-carrito");
    if (contador) {
      const totalProductos = this.productosEnCarrito.reduce(
        (total, producto) => total + producto.cantidad,
        0
      );
      // utilizo el operador ternario,si no hay productos, muestra 0 en lugar de desaparecer el contador
      contador.textContent = totalProductos > 0 ? totalProductos : "0";

      // Guardar el contador en el localStorage
      localStorage.setItem("contadorCarrito", totalProductos);
    }
  }

  guardarEnLocalStorage() {
    localStorage.setItem(
      "productosEnCarrito",
      JSON.stringify(this.productosEnCarrito)
    );
  }

}

// instancia del carrito
export const carrito = new Carrito();
