import { finalizarCompraModal } from "./finalizarCompra.js";

export class Carrito {
  constructor() {
    this.productosEnCarrito = [];
  }

  agregarProducto(producto) {
    // verifico si el producto ya esta en el carrito
    const productoExistente = this.productosEnCarrito.find(
      (p) => p.id === producto.id
    );
    if (productoExistente) {
      productoExistente.cantidad += 1; // si ya esta, sumo una unidad
    } else {
      // Si no esta, lo agregamos al carrito para que no se repitan los items.
      this.productosEnCarrito.push({ ...producto, cantidad: 1 });
    }
    this.actualizarModalCarrito(); // actualizo el carrito
    this.actualizarContadorCarrito(); // actualizo el contador del carrito
  }

  // mostrar el carrito en el modal
  abrirModalCarrito() {
    const modalCarrito = document.getElementById("modal-carrito");
    modalCarrito.style.display = "block"; // mostrar el modal

    this.actualizarModalCarrito(); // Actualizar el contenido del modal con los productos del carrito
  }

  // actualizo el modal pero con los productos del carrito optimizados a otro tama;o
  actualizarModalCarrito() {
    const modalContenido = document.getElementById("modal-carrito-contenido");
    modalContenido.innerHTML = ""; // limpio el contenido del modal

    if (this.productosEnCarrito.length === 0) {
      const mensajeVacio = document.createElement("p");
      mensajeVacio.textContent = "El carrito está vacío.";
      modalContenido.appendChild(mensajeVacio);
      return;
    }

    // variable para calcular el total
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
      const botonRestar = document.createElement("button");
      botonRestar.classList.add("btn", "btn-sm", "btn-outline-danger", "ms-2");
      botonRestar.textContent = "-";
      botonRestar.addEventListener("click", () =>
        this.cambiarCantidadProducto(producto.id, "restar")
      );
      productoDiv.appendChild(botonRestar);

      const botonSumar = document.createElement("button");
      botonSumar.classList.add("btn", "btn-sm", "btn-outline-success", "ms-2");
      botonSumar.textContent = "+";
      botonSumar.addEventListener("click", () =>
        this.cambiarCantidadProducto(producto.id, "sumar")
      );
      productoDiv.appendChild(botonSumar);

      modalContenido.appendChild(productoDiv);

      // Calcular el total
      totalCarrito += producto.precio * producto.cantidad;
    });

    // Mostrar el total
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("mt-3", "fw-bold");
    totalDiv.textContent = `Total: $${totalCarrito.toLocaleString()}`;
    modalContenido.appendChild(totalDiv);

    // Agregar botones de accion, POSIBLEMENTE BORRAR A FUTURO
    const accionesDiv = document.createElement("div");
    accionesDiv.classList.add("d-flex", "justify-content-between", "mt-3");

    const botonCancelar = document.createElement("button");
    botonCancelar.classList.add("btn", "btn-secondary");
    botonCancelar.textContent = "Cancelar";
    botonCancelar.addEventListener("click", () => this.cerrarModalCarrito());
    accionesDiv.appendChild(botonCancelar);

    const btnFinalizar = document.createElement("button");
    btnFinalizar.classList.add("btn", "btn-primary");
    btnFinalizar.textContent = "Finalizar Compra";
    btnFinalizar.addEventListener("click", () =>
      finalizarCompraModal.abrirModal()
    );
    accionesDiv.appendChild(btnFinalizar);

    modalContenido.appendChild(accionesDiv);
  }

  cerrarModalCarrito() {
    const modalCarrito = document.getElementById("modal-carrito");
    modalCarrito.style.display = "none";
  }

  // Modal para finalizar la compra, NO FUNCIONA AUN
  abrirModalDetalle() {
    const modalDetalle = document.getElementById("modal-detalle");
    const modalDetalleContenido = document.getElementById(
      "modal-detalle-contenido"
    );

    modalDetalleContenido.innerHTML =
      "<p>Formulario para finalizar compra (en desarrollo).</p>";
    modalDetalle.style.display = "block";
  }

  cambiarCantidadProducto(idProducto, accion) {
    const producto = this.productosEnCarrito.find((p) => p.id === idProducto);
    if (producto) {
      // Verifico q la cantidad no se vuelva negativa
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
    }
  }

  actualizarContadorCarrito() {
    const contador = document.getElementById("contador-carrito");
    if (contador) {
      const totalProductos = this.productosEnCarrito.reduce(
        (total, producto) => total + producto.cantidad,
        0
      );
      contador.textContent = totalProductos > 0 ? totalProductos : ""; // muestra el número solo si es mayor a 0
    }
  }
}

// instancia del carrito
export const carrito = new Carrito();
