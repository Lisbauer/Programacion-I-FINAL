export class FinalizarCompraModal {
    constructor() {
        this.crearModal(); // crear el modal cuando se inicialice
    }

    crearModal() {
        // el modal ya existe? verifico
        if (document.getElementById('modal-detalle')) return;

        // Creo el modal contenedor
        const modalDetalle = document.createElement('div');
        modalDetalle.id = 'modal-detalle';
        modalDetalle.classList.add('modal');

        // contenido del modal
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const titulo = document.createElement('h2');
        titulo.textContent = 'Detalles del Comprador';
        modalContent.appendChild(titulo);

        // no funciona!!!!!
        const formulario = document.createElement('form');
        formulario.id = 'form-comprador';

        //  campos de formulario que NO funcionan!!
        const campos = [
            { label: 'Nombre', id: 'nombre', type: 'text', required: true },
            { label: 'Email', id: 'email', type: 'email', required: true },
            { label: 'Dirección', id: 'direccion', type: 'text', required: true }
        ];

        campos.forEach(campo => {
            const label = document.createElement('label');
            label.setAttribute('for', campo.id);
            label.textContent = campo.label;

            const input = document.createElement('input');
            input.type = campo.type;
            input.id = campo.id;
            input.name = campo.id;
            input.required = campo.required;

            formulario.appendChild(label);
            formulario.appendChild(input);
        });

        // botones de accion
        const accionesDiv = document.createElement('div');
        accionesDiv.classList.add('modal-buttons');

        const btnConfirmar = document.createElement('button');
        btnConfirmar.type = 'submit';
        btnConfirmar.textContent = 'Confirmar Compra';
        accionesDiv.appendChild(btnConfirmar);

        const btnCancelar = document.createElement('button');
        btnCancelar.type = 'button';
        btnCancelar.textContent = 'Cancelar';
        btnCancelar.addEventListener('click', () => this.cerrarModal());
        accionesDiv.appendChild(btnCancelar);

        formulario.appendChild(accionesDiv);
        modalContent.appendChild(formulario);
        modalDetalle.appendChild(modalContent);
        document.body.appendChild(modalDetalle);

        // Agregar evento para procesar el formulario
        formulario.addEventListener('submit', (event) => {
            event.preventDefault();
            this.procesarCompra();
        });
    }

    abrirModal() {
        const modalDetalle = document.getElementById('modal-detalle');
        modalDetalle.style.display = 'block';
    }

    cerrarModal() {
        const modalDetalle = document.getElementById('modal-detalle');
        modalDetalle.style.display = 'none';
    }

    procesarCompra() {
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const direccion = document.getElementById('direccion').value;

        if (nombre && email && direccion) {
            alert('Compra realizada con éxito.');
            this.cerrarModal();
        } else {
            alert('Por favor, completa todos los campos.');
        }
    }
}

export const finalizarCompraModal = new FinalizarCompraModal();
