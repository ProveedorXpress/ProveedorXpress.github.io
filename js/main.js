import { notificarProveedor } from './notifyProveedor.js';

function onCompraRealizada(compra) {
    // compra es un objeto con info dinámica
    notificarProveedor({
        productoId: compra.productoId,
        productoNombre: compra.productoNombre,
        clienteNombre: compra.clienteNombre,
        clienteEmail: compra.clienteEmail
    });
}

// Ejemplo: cuando el usuario confirme la compra, llamas así:

const compraEjemplo = {
    productoId: 'calzado',
    productoNombre: 'Zapatos deportivos',
    clienteNombre: 'María López',
    clienteEmail: 'maria@example.com'
};

onCompraRealizada(compraEjemplo);
