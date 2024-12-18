import { detectarTeclaCerrar } from './detectorTeclado.js';

export function crearModalVerMas(producto) {
    // creo el modal
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.id = 'modalProducto';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'modalProductoLabel');
    modal.setAttribute('aria-hidden', 'true');

    // contenido del modal
    const modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');
    
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    
    const modalTitle = document.createElement('h4');
    modalTitle.classList.add('modal-title');
    modalTitle.id = 'modalProductoLabel';
    modalTitle.textContent = 'Detalles del Producto';

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.classList.add('btn-close');
    closeButton.setAttribute('data-bs-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Cerrar');
    
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);

    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');

    const img = document.createElement("img");
    img.src = producto.imagen;
    img.classList.add("card-img-vermas");
    img.alt = producto.nombre;
    
    // imagen al modalBody
    modalBody.appendChild(img);
    
    // texto para el nombre
    const nombre = document.createElement("h2");
    const nombreStrong = document.createElement("strong");

    nombre.appendChild(nombreStrong);
    nombre.appendChild(document.createTextNode(` ${producto.nombre}`)); // nombre del producto
    modalBody.appendChild(nombre);
    
    // texto para la descripcion
    const descripcion = document.createElement("p");
    const descripcionStrong = document.createElement("strong");
    descripcionStrong.textContent = "Descripción:";
    descripcion.appendChild(descripcionStrong);
    descripcion.appendChild(document.createTextNode(` ${producto.descripcion}`)); // añado la descripcion
    modalBody.appendChild(descripcion);
    
    //  texto para el precio
    const precio = document.createElement("h4");
    const precioStrong = document.createElement("strong");
    precioStrong.textContent = "Precio:";
    precio.appendChild(precioStrong);
    precio.appendChild(document.createTextNode(` $${producto.precio.toLocaleString()}`)); //  el precio del producto
    modalBody.appendChild(precio);

    const modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-footer');

    const closeModalButton = document.createElement('button');
    closeModalButton.type = 'button';
    closeModalButton.classList.add('btn', 'btn-secondary');
    closeModalButton.setAttribute('data-bs-dismiss', 'modal');
    closeModalButton.textContent = 'Cerrar';

    modalFooter.appendChild(closeModalButton);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    // Agrego el modal al body
    document.body.appendChild(modal);

    // Modal usando bootstrap
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();

    const detectarTecla = (event) => detectarTeclaCerrar(event, () => bootstrapModal.hide());

    //  event listener para la tecla Enter
    document.addEventListener("keydown", detectarTecla);

    // Cuando el modal se cierre, se elimina el listener
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
        document.removeEventListener("keydown", detectarTecla); // Remover el listener
    });
}


