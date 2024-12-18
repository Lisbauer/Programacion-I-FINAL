// creo una funcion global para detectar la tecla enter y cerrar el modal
export function detectarTeclaCerrar(event, cerrarModalCallback) {
    if (event.key === "Enter") {
        cerrarModalCallback(); // aca cierro el modal
    }
}
