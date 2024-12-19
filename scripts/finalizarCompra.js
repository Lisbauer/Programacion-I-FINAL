export class FinalizarCompraModal {
    constructor() {
        this.crearModal(); // Crear el modal cuando se inicialice
        this.modalAgradecimiento = this.crearModalAgradecimiento(); // Crear el modal de agradecimiento
    }

    // aca creo mi html 
    crearModal() {
        // El modal ya existe? verificamos
        if (document.getElementById('modal-detalle')) return;

        // contenedor con clases de Bootstrap
        const modalDetalle = document.createElement('div');
        modalDetalle.id = 'modal-detalle';
        modalDetalle.classList.add('modal', 'fade');
        modalDetalle.setAttribute('aria-labelledby', 'modal-detalle-label'); // PROPIEDADES DE ACCESBILIDAD para personas con discapacidades
        modalDetalle.setAttribute('aria-hidden', 'true');

        // Crear el contenido del modal
        const modalDialog = document.createElement('div');
        modalDialog.classList.add('modal-dialog');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        // Titulo
        const titulo = document.createElement('h5');
        titulo.id = 'modal-detalle-label';
        titulo.classList.add('modal-title');
        titulo.textContent = 'Detalles del Comprador';
        modalContent.appendChild(titulo);

        // Crear el formulario
        const formulario = document.createElement('form');
        formulario.id = 'form-comprador';

        const campos = [
            { label: 'Nombre Completo', id: 'nombre-completo', type: 'text', required: true },
            { label: 'Email', id: 'email', type: 'email', required: true },
            { label: 'Número de Teléfono', id: 'telefono', type: 'number', required: true },
            { label: 'Dirección', id: 'direccion', type: 'text', required: true },            
            { label: 'Fecha de Entrega', id: 'fecha-entrega', type: 'date', required: true },
            { label: 'Tipo de Tarjeta', id: 'tipo-tarjeta', type: 'select', options: ['Selecciona la tarjeta', 'VISA', 'MASTERCARD'], required: true },
            { label: 'Cuotas', id: 'cuotas', type: 'select', options: ['Selecciona las cuotas', '1 cuota sin interes', '3 cuotas', '6 cuotas', '12 cuotas'], required: true, disabled: true },
            { label: 'Número de Tarjeta', id: 'numero-tarjeta', type: 'number', required: true },
            { label: 'Código de Seguridad', id: 'codigo-seguridad', type: 'number', required: true },
        ];

        campos.forEach(campo => {
            const divCampo = document.createElement('div');
            divCampo.classList.add('mb-3');

            const label = document.createElement('label');
            label.textContent = campo.label;
            label.classList.add('form-label');

            let input;
            if (campo.type === 'select') {
                input = document.createElement('select');
                input.id = campo.id;
                input.name = campo.id;
                input.required = campo.required;
                if (campo.disabled) input.disabled = true; // deshabilito el select de cuotas inicialmente
                campo.options.forEach(optionValue => {
                    const option = document.createElement('option');
                    option.value = optionValue;
                    option.textContent = optionValue;
                    input.appendChild(option);
                });
            } else {
                input = document.createElement('input');
                input.type = campo.type;
                input.id = campo.id;
                input.name = campo.id;
                input.required = campo.required;
                input.classList.add('form-control');
            }

            divCampo.appendChild(label);
            divCampo.appendChild(input);
            formulario.appendChild(divCampo);
        });

      
        // botones
        const accionesDiv = document.createElement('div');
        accionesDiv.classList.add('modal-footer');

        const btnConfirmar = document.createElement('button');
        btnConfirmar.type = 'submit';
        btnConfirmar.classList.add('btn', 'btn-primary');
        btnConfirmar.textContent = 'Confirmar Compra';
        accionesDiv.appendChild(btnConfirmar);

        const btnCancelar = document.createElement('button');
        btnCancelar.type = 'button';
        btnCancelar.classList.add('btn', 'btn-secondary');
        btnCancelar.textContent = 'Cancelar';
        btnCancelar.addEventListener('click', () => this.cerrarModal());
        accionesDiv.appendChild(btnCancelar);

        formulario.appendChild(accionesDiv);
        modalContent.appendChild(formulario);
        modalDialog.appendChild(modalContent);
        modalDetalle.appendChild(modalDialog);
        document.body.appendChild(modalDetalle);

        // cierra el formulario, abre el modal de agradecimiento
        formulario.addEventListener('submit', (event) => {
            event.preventDefault();
            this.procesarCompra();
        });

        // habilita el select de cuotas solo si se selecciona una tarjeta
        const tipoTarjetaSelect = document.getElementById('tipo-tarjeta');
        const cuotasSelect = document.getElementById('cuotas');
        tipoTarjetaSelect.addEventListener('change', () => {
            cuotasSelect.disabled = tipoTarjetaSelect.value === 'Selecciona la tarjeta';
        });

    }

    crearModalAgradecimiento() {
        // modal de agradecimiento
        const modalAgradecimiento = document.createElement('div');
        modalAgradecimiento.id = 'modal-agradecimiento';
        modalAgradecimiento.classList.add('modal', 'fade');
        modalAgradecimiento.setAttribute('tabindex', '-1');
        modalAgradecimiento.setAttribute('aria-labelledby', 'modal-agradecimiento-label');
        modalAgradecimiento.setAttribute('aria-hidden', 'true');

        const modalDialog = document.createElement('div');
        modalDialog.classList.add('modal-dialog', 'modal-dialog-centered');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const titulo = document.createElement('h5');
        titulo.id = 'modal-agradecimiento-label';
        titulo.classList.add('modal-title');
        titulo.textContent = '¡Gracias por tu compra!';
        modalContent.appendChild(titulo);

        const mensaje = document.createElement('p');
        mensaje.textContent = 'Tu compra ha sido procesada exitosamente. Revisa tu mail para más detalles.';
        modalContent.appendChild(mensaje);

        const btnCerrar = document.createElement('button');
        btnCerrar.classList.add('btn', 'btn-primary');
        btnCerrar.textContent = 'Cerrar';
        btnCerrar.addEventListener('click', () => this.cerrarModalAgradecimiento());

        modalContent.appendChild(btnCerrar);
        modalDialog.appendChild(modalContent);
        modalAgradecimiento.appendChild(modalDialog);
        document.body.appendChild(modalAgradecimiento);

        return modalAgradecimiento;
    }

    abrirModal() {
        // Cierroel modal del carrito si esta abierto
        const modalCarrito = document.getElementById('modal-carrito');
        if (modalCarrito) {
            modalCarrito.style.display = 'none'; 
        }

        // abro el modal de finalizar compra
        const modalDetalle = document.getElementById('modal-detalle');
        if (modalDetalle) {
            const bootstrapModal = new bootstrap.Modal(modalDetalle);
            bootstrapModal.show();  //  bootstrap para manejar la apertura del modal
        }
    }

    cerrarModal() {
        const modalDetalle = document.getElementById('modal-detalle');
        if (modalDetalle) {
            const bootstrapModal = bootstrap.Modal.getInstance(modalDetalle); // utilizo funciones de bootstrap
            bootstrapModal.hide();
        }
    }

    cerrarModalAgradecimiento() {
        const modalAgradecimiento = document.getElementById('modal-agradecimiento');
        if (modalAgradecimiento) {
            const bootstrapModal = bootstrap.Modal.getInstance(modalAgradecimiento);
            bootstrapModal.hide();
        }
    }

    procesarCompra() {
        let validado = true;
        if (validado) {
            this.cerrarModal();
            this.abrirModalAgradecimiento();
        }
    }
    
    abrirModalAgradecimiento() {
        const modalAgradecimiento = document.getElementById('modal-agradecimiento');
        if (modalAgradecimiento) {
            const bootstrapModal = new bootstrap.Modal(modalAgradecimiento);
            bootstrapModal.show();
        }
    }
}

export const finalizarCompraModal = new FinalizarCompraModal();
