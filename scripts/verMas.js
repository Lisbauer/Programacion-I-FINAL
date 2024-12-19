import { detectarTeclaCerrar } from "./detectorTeclado.js";
import { carrito } from "./carrito.js";

export function crearModalVerMas(producto) {
  // creacion el modal
  const modal = document.createElement("div");
  modal.classList.add("modal", "fade");
  modal.id = "modalProducto";
  modal.setAttribute("tabindex", "-1");
  modal.setAttribute("aria-labelledby", "modalProductoLabel");
  modal.setAttribute("aria-hidden", "true");

  //  contenido del modal
  const modalDialog = document.createElement("div");
  modalDialog.classList.add("modal-dialog");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modalContent.style.cssText = "width: 100%; max-width: 100%;";

  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  const modalTitle = document.createElement("h4");
  modalTitle.classList.add("modal-title");
  modalTitle.id = "modalProductoLabel";
  modalTitle.textContent = "Detalles del Producto";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.classList.add("btn-close");
  closeButton.setAttribute("data-bs-dismiss", "modal");
  closeButton.setAttribute("aria-label", "Cerrar");

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);

  const modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");

  // imagen principal
  const img = document.createElement("img");
  img.src = producto.imagen;
  img.classList.add("card-img-vermas");
  img.alt = producto.nombre;

  modalBody.appendChild(img);

  // name del producto
  const nombre = document.createElement("h2");
  const nombreStrong = document.createElement("strong");
  nombre.appendChild(nombreStrong);
  nombre.appendChild(document.createTextNode(` ${producto.nombre}`));
  modalBody.appendChild(nombre);

  // descrp del producto
  const descripcion = document.createElement("p");
  const descripcionStrong = document.createElement("strong");
  descripcionStrong.textContent = "Descripción:";
  descripcion.appendChild(descripcionStrong);
  descripcion.appendChild(document.createTextNode(` ${producto.descripcion}`));
  modalBody.appendChild(descripcion);

  // Precio
  const precio = document.createElement("h4");
  const precioStrong = document.createElement("strong");
  precioStrong.textContent = "Precio:";
  precio.appendChild(precioStrong);
  precio.appendChild(
    document.createTextNode(` $${producto.precio.toLocaleString()}`)
  ); // precio
  modalBody.appendChild(precio);

  // Nuevos detalles: Peso, Material y Dimensiones
  if (producto.peso) {
    const peso = document.createElement("p");
    const pesoStrong = document.createElement("strong");
    pesoStrong.textContent = "Peso:";
    peso.appendChild(pesoStrong);
    peso.appendChild(document.createTextNode(` ${producto.peso}`)); // peso
    modalBody.appendChild(peso);
  }

  if (producto.material) {
    const material = document.createElement("p");
    const materialStrong = document.createElement("strong");
    materialStrong.textContent = "Material:";
    material.appendChild(materialStrong);
    material.appendChild(document.createTextNode(` ${producto.material}`)); // material
    modalBody.appendChild(material);
  }

  if (producto.dimensiones) {
    const dimensiones = document.createElement("p");
    const dimensionesStrong = document.createElement("strong");
    dimensionesStrong.textContent = "Dimensiones:";
    dimensiones.appendChild(dimensionesStrong);
    dimensiones.appendChild(
      document.createTextNode(` ${producto.dimensiones}`)
    ); // dimensiones
    modalBody.appendChild(dimensiones);
  }

  const modalFooter = document.createElement("div");
  modalFooter.classList.add("modal-footer");

  // btn agregar al carrito
  const agregarCarritoButton = document.createElement("button");
  agregarCarritoButton.type = "button";
  agregarCarritoButton.classList.add("btn", "btn-primary");
  agregarCarritoButton.textContent = "Agregar al carrito";

  agregarCarritoButton.addEventListener("click", (event) => {
    event.preventDefault();
    carrito.agregarProducto(producto);
  });

  modalFooter.appendChild(agregarCarritoButton);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);

  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);

  // modal directo al body
  document.body.appendChild(modal);

  // muestro el modal con bootstrap
  const bootstrapModal = new bootstrap.Modal(modal);
  bootstrapModal.show();

  // detector de teclado usando mi funcion global
  document.addEventListener("keydown", (event) =>
    detectarTeclaCerrar(event, () => bootstrapModal.hide())
  );

  // se limpia el listener del keydown al cerrar el modal sino sigue funcionando
  modal.addEventListener("hidden.bs.modal", () => {
    modal.remove();
    document.removeEventListener("keydown", detectarTeclaCerrar);
  });
}
