// paypal-handler.js - Manejo seguro de pagos y envío de datos

/**
 * Configura el botón de PayPal y maneja el flujo post-pago
 * @param {number} total - Total a pagar en EUR
 * @param {Object} carritoItems - Productos en el carrito
 */
export function initPayPal(total, carritoItems) {
    const container = document.getElementById('paypal-button-container');
    
    // Limpia contenedor existente
    if (container) container.innerHTML = '';
    
    paypal.Buttons({
        style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal'
        },
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        currency_code: 'EUR',
                        value: total.toFixed(2),
                        breakdown: {
                            item_total: {
                                currency_code: 'EUR',
                                value: total.toFixed(2)
                            }
                        }
                    },
                    items: Object.values(carritoItems).map(item => ({
                        name: item.nombre,
                        unit_amount: {
                            currency_code: 'EUR',
                            value: item.precioSale.toFixed(2)
                        },
                        quantity: item.cantidad
                    }))
                }]
            });
        },
        onApprove: async function(data, actions) {
            try {
                const loadingUI = showLoading();
                const details = await actions.order.capture();
                
                // 1. Verificar pago
                const pagoVerificado = await verificarPagoPayPal(details.id);
                if (!pagoVerificado) throw new Error('Pago no verificado');
                
                // 2. Obtener datos del comprador
                const cliente = {
                    email: details.payer.email_address,
                    nombre: details.payer.name?.given_name || 'Cliente',
                    orderID: details.id
                };
                
                // 3. Procesar compra
                const resultado = await procesarCompra({
                    carrito: carritoItems,
                    cliente,
                    fecha: new Date().toISOString()
                });
                
                // 4. Notificar resultado
                loadingUI.remove();
                if (resultado.exito) {
                    showSuccessModal(cliente.email, details.id);
                } else {
                    showErrorModal(details.id);
                }
                
                return resultado;
                
            } catch (error) {
                console.error('Error en pago:', error);
                alert(`Error al procesar el pago: ${error.message}`);
                return { exito: false };
            }
        },
        onError: function(err) {
            console.error('Error PayPal:', err);
            alert('Ocurrió un error con PayPal. Inténtalo de nuevo.');
        }
    }).render('#paypal-button-container');
}

// ==================== Funciones auxiliares ====================

/**
 * Muestra UI de carga durante el procesamiento
 */
function showLoading() {
    const div = document.createElement('div');
    div.className = 'paypal-loading-overlay';
    div.innerHTML = `
        <div class="spinner"></div>
        <p>Procesando tu compra...</p>
        <style>
            .paypal-loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                color: white;
            }
            .spinner {
                border: 5px solid #f3f3f3;
                border-top: 5px solid #FFC439;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                animation: spin 1s linear infinite;
                margin-bottom: 20px;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    document.body.appendChild(div);
    return {
        remove: () => div.remove()
    };
}

/**
 * Verifica el pago con PayPal (simulación)
 */
async function verificarPagoPayPal(transactionId) {
    // En producción, reemplazar con llamada a tu backend/Google Script
    return new Promise(resolve => setTimeout(() => resolve(true), 1000));
}

/**
 * Procesa la compra y envía los datos
 */
async function procesarCompra(datosCompra) {
    try {
        // EN PRODUCCIÓN: Reemplazar con tu URL de Google Apps Script
        const response = await fetch('https://script.google.com/macros/s/.../exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosCompra)
        });
        
        return await response.json();
        
    } catch (error) {
        console.error('Error al procesar compra:', error);
        return { exito: false };
    }
}

function showSuccessModal(email, orderId) {
    alert(`✅ Compra completada!\n\nLos datos de tus proveedores se enviaron a:\n${email}\n\nID de transacción: ${orderId}`);
}

function showErrorModal(orderId) {
    alert(`⚠️ El pago se completó pero hubo un error al enviar los datos.\n\nContacta a soporte con este ID:\n${orderId}`);
}
