// Configuración de EmailJS
const EMAILJS_CONFIG = {
    publicKey: 'TU_PUBLIC_KEY',
    serviceId: 'TU_SERVICE_ID', 
    templateId: 'TU_TEMPLATE_ID'
};

// Configuración de Supabase (crea cuenta gratuita en supabase.com)
const SUPABASE_CONFIG = {
    url: 'TU_SUPABASE_URL',
    key: 'TU_SUPABASE_ANON_KEY' // Esta clave SÍ puede ser pública
};

// Inicializar EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);

// Función para obtener datos de proveedores de Supabase (SEGURA)
async function obtenerDatosProveedores(proveedorIds) {
    try {
        const response = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/proveedores?id=in.(${proveedorIds.join(',')})`, {
            headers: {
                'apikey': SUPABASE_CONFIG.key,
                'Authorization': `Bearer ${SUPABASE_CONFIG.key}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Error al obtener datos');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

// Función para registrar compra y obtener datos
async function procesarCompraSegura(carritoItems, emailCliente, transactionId) {
    try {
        // Registrar la compra en la base de datos
        const compraResponse = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/compras`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_CONFIG.key,
                'Authorization': `Bearer ${SUPABASE_CONFIG.key}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email_cliente: emailCliente,
                productos: Object.keys(carritoItems),
                transaction_id: transactionId,
                fecha: new Date().toISOString()
            })
        });

        if (!compraResponse.ok) {
            throw new Error('Error al registrar compra');
        }

        // Obtener datos de proveedores comprados
        let proveedorIds = [];
        Object.keys(carritoItems).forEach(id => {
            if (id === 'pack-completo') {
                proveedorIds = ['ropa', 'vapers', 'zapas', 'vintage', 'facturas', 'futbol', 'relojes', 'accesorios', 'electronica', 'tickets', 'perfumes'];
            } else if (id === 'pack-aleatorio') {
                const todosIds = ['ropa', 'vapers', 'zapas', 'vintage', 'facturas', 'futbol', 'relojes', 'accesorios', 'electronica', 'tickets', 'perfumes'];
                proveedorIds = todosIds.sort(() => 0.5 - Math.random()).slice(0, 5);
            } else {
                proveedorIds.push(id);
            }
        });

        const proveedores = await obtenerDatosProveedores(proveedorIds);
        return proveedores;
        
    } catch (error) {
        console.error('Error al procesar compra:', error);
        return null;
    }
}

// Función para enviar email con datos seguros
async function enviarDatosSeguro(proveedores, emailCliente, nombreCliente) {
    try {
        let proveedoresInfo = '';
        
        proveedores.forEach(proveedor => {
            proveedoresInfo += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📇 ${proveedor.nombre}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 Email: ${proveedor.email}
📱 Teléfono: ${proveedor.telefono}
💬 WhatsApp: ${proveedor.whatsapp}
📋 Descripción: ${proveedor.descripcion}
✨ Extras: ${proveedor.extras}

`;
        });

        const templateParams = {
            to_name: nombreCliente,
            to_email: emailCliente,
            from_name: 'ProveedorXpress',
            subject: 'Tus datos de proveedores - ProveedorXpress',
            message: `¡Hola ${nombreCliente}!

Gracias por tu compra en ProveedorXpress. Aquí tienes la información de contacto de tus proveedores:

${proveedoresInfo}

📋 INSTRUCCIONES IMPORTANTES:
• Contacta directamente con los proveedores usando la información proporcionada
• Menciona que vienes de ProveedorXpress para obtener las mejores condiciones
• Guarda esta información de forma segura para futuras referencias
• Si tienes algún problema, contáctanos a soporte@proveedorxpress.com

¡Esperamos que tengas mucho éxito en tu negocio!

Saludos,
El equipo de ProveedorXpress

---
© ProveedorXpress 2025. Todos los derechos reservados.`
        };

        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams
        );

        return true;
    } catch (error) {
        console.error('Error al enviar email:', error);
        return false;
    }
}

// Función para solicitar email del cliente
function solicitarEmailCliente() {
    return new Promise((resolve) => {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;
        
        modal.innerHTML = `
            <div style="background: white; padding: 2rem; border-radius: 12px; max-width: 400px; width: 90%;">
                <h3 style="margin-bottom: 1rem; color: #cc9900; text-align: center;">
                    Información de contacto
                </h3>
                <p style="margin-bottom: 1rem; color: #333;">
                    Para enviarte los datos de los proveedores, necesitamos tu email:
                </p>
                <input type="email" id="clienteEmail" placeholder="tu@email.com" 
                       style="width: 100%; padding: 10px; border: 2px solid #ccc; border-radius: 8px; margin-bottom: 1rem;">
                <input type="text" id="clienteNombre" placeholder="Tu nombre (opcional)" 
                       style="width: 100%; padding: 10px; border: 2px solid #ccc; border-radius: 8px; margin-bottom: 1rem;">
                <div style="display: flex; gap: 10px;">
                    <button id="confirmarEmail" style="flex: 1; padding: 10px; background: #cc9900; border: none; color: white; border-radius: 8px; cursor: pointer;">
                        Confirmar
                    </button>
                    <button id="cancelarEmail" style="flex: 1; padding: 10px; background: #ccc; border: none; color: white; border-radius: 8px; cursor: pointer;">
                        Cancelar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('confirmarEmail').addEventListener('click', () => {
            const email = document.getElementById('clienteEmail').value;
            const nombre = document.getElementById('clienteNombre').value || 'Cliente';
            
            if (email && email.includes('@')) {
                modal.remove();
                resolve({ email, nombre });
            } else {
                alert('Por favor, introduce un email válido');
            }
        });
        
        document.getElementById('cancelarEmail').addEventListener('click', () => {
            modal.remove();
            resolve(null);
        });
    });
}

// RESTO DEL CÓDIGO ORIGINAL (productos, carrito, etc.)
const productos = [
    { id:'ropa', nombre:'Proveedor de ropa', img:'assets/ropa.jpg', precioOrig:19.99, precioSale:9.99 },
    { id:'vapers', nombre:'Proveedor vapers', img:'assets/vapers.jpg', precioOrig:19.99, precioSale:9.99 },
    { id:'zapas', nombre:'Proveedor zapas', img:'assets/zapas.jpg', precioOrig:19.99, precioSale:9.99 },
    { id:'vintage', nombre:'Proveedor ropa vintage', img:'assets/ropa_vintage.jpg', precioOrig:19.99, precioSale:9.99 },
    { id:'facturas', nombre:'Proveedor facturas editables', img:'assets/facturas.jpg', precioOrig:19.99, precioSale:9.99 },
    { id:'futbol', nombre:'Proveedor fútbol', img:'assets/futbol.jpg', precioOrig:19.99, precioSale:9.99 },
    { id:'relojes', nombre:'Proveedor relojes', img:'assets/relojes.jpg', precioOrig:19.99, precioSale:9.99 },
    { id:'accesorios', nombre:'Proveedor accesorios', img:'assets/accesorios.jpg', precioOrig:19.99, precioSale:9.99 },
    { id:'electronica', nombre:'Proveedor electrónica', img:'assets/electronica.jpg', precioOrig:19.99, precioSale:9.99 },
    { id:'tickets', nombre:'Tickets', img:'assets/tickets.jpg', precioOrig:19.99, precioSale:9.99 },
    { id:'perfumes', nombre:'Proveedor perfumes', img:'assets/perfumes.jpg', precioOrig:19.99, precioSale:9.99 },
    { id:'pack-completo', nombre:'Pack completo de todos los proveedores', img:'assets/pack.jpg', precioOrig:99.99, precioSale:50 },
    { id:'pack-aleatorio', nombre:'Pack aleatorio de varios proveedores', img:'assets/aleatorios.jpg', precioOrig:39.99, precioSale:19.99 }
];

const productosContainer = document.getElementById('productos');
const carritoBtn = document.getElementById('btnCarrito');
const carrito = document.getElementById('carrito');
const cerrarCarrito = document.getElementById('cerrarCarrito');
const listaCarrito = document.getElementById('listaCarrito');
const totalSpan = document.getElementById('total');
let carritoItems = {};

// Renderizar productos
productos.forEach(p => {
    const art = document.createElement('article');
    art.className = 'producto';
    art.dataset.id = p.id;
    art.innerHTML = `
        <img src="${p.img}" alt="${p.nombre}">
        <h2>${p.nombre}</h2>
        <div class="precio">
        <span class="tachado">${p.precioOrig}$</span>
        <span class="nuevo">${p.precioSale}$</span>
        </div>
        <button class="agregar">Añadir al carrito</button>
    `;
    productosContainer.appendChild(art);
});

// Eventos del carrito
if (carritoBtn && cerrarCarrito && carrito) {
    carritoBtn.addEventListener('click', () => {
        carrito.classList.add('visible');
    });
    cerrarCarrito.addEventListener('click', () => {
        carrito.classList.remove('visible');
    });
}

// Añadir al carrito
document.querySelectorAll('button.agregar').forEach(btn => {
    btn.addEventListener('click', e => {
        const art = e.target.closest('article');
        const id = art.dataset.id;
        const prod = productos.find(x => x.id === id);
        if (!carritoItems[id]) {
            carritoItems[id] = { nombre: prod.nombre, precio: prod.precioSale, cantidad: 1 };
        } else {
            carritoItems[id].cantidad++;
        }
        renderCarrito();
        carrito.classList.add('visible');
    });
});

// Renderizar carrito
function renderCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;
    Object.keys(carritoItems).forEach(id => {
        const item = carritoItems[id];
        total += item.precio * item.cantidad;
        const li = document.createElement('li');
        li.innerHTML = `
        <span class="nombre">${item.nombre}</span>
        <input type="number" class="cantidad" min="1" value="${item.cantidad}" data-id="${id}">
        <span class="precio">${(item.precio * item.cantidad).toFixed(2)}$</span>
        <button class="eliminar" data-id="${id}">&times;</button>
        `;
        listaCarrito.appendChild(li);

        li.querySelector('input.cantidad').addEventListener('change', e => {
            let val = parseInt(e.target.value);
            if (isNaN(val) || val < 1) val = 1;
            carritoItems[id].cantidad = val;
            renderCarrito();
        });

        li.querySelector('button.eliminar').addEventListener('click', () => {
            delete carritoItems[id];
            renderCarrito();
        });
    });
    totalSpan.textContent = `Total: ${total.toFixed(2)}€`;
    renderPayPalButton(total);
}

// PayPal con seguridad
function renderPayPalButton(total) {
    document.getElementById('paypal-button-container')?.remove();
    const container = document.createElement('div');
    container.id = 'paypal-button-container';
    container.style.marginTop = 'auto';
    carrito.appendChild(container);

    paypal.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' },
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: { currency_code: 'EUR', value: total.toFixed(2) }
                }]
            });
        },
        onApprove: async function(data, actions) {
            try {
                const details = await actions.order.capture();
                const clienteInfo = await solicitarEmailCliente();
                
                if (clienteInfo) {
                    const mensajeCarga = document.createElement('div');
                    mensajeCarga.style.cssText = `
                        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                        background: white; padding: 2rem; border-radius: 12px;
                        box-shadow: 0 8px 25px rgba(0,0,0,0.3); z-index: 10001; text-align: center;
                    `;
                    mensajeCarga.innerHTML = `
                        <h3 style="color: #cc9900; margin-bottom: 1rem;">Procesando...</h3>
                        <p>Obteniendo y enviando los datos de tus proveedores...</p>
                        <div style="margin-top: 1rem;">
                            <div style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #cc9900; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
                        </div>
                        <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
                    `;
                    document.body.appendChild(mensajeCarga);
                    
                    // Procesar compra de forma segura
                    const proveedores = await procesarCompraSegura(carritoItems, clienteInfo.email, data.orderID);
                    
                    if (proveedores && proveedores.length > 0) {
                        const emailEnviado = await enviarDatosSeguro(proveedores, clienteInfo.email, clienteInfo.nombre);
                        mensajeCarga.remove();
                        
                        if (emailEnviado) {
                            alert(`¡Gracias por tu compra, ${clienteInfo.nombre}! 
                            
Los datos de contacto de tus proveedores han sido enviados a: ${clienteInfo.email}

Revisa tu bandeja de entrada (y spam) en unos minutos.`);
                        } else {
                            alert(`Pago procesado correctamente, pero hubo un error al enviar el email.
                            
Por favor, contacta con soporte@proveedorxpress.com mencionando tu ID: ${data.orderID}`);
                        }
                    } else {
                        mensajeCarga.remove();
                        alert(`Error al obtener los datos. Contacta con soporte@proveedorxpress.com mencionando tu ID: ${data.orderID}`);
                    }
                }
                
                carritoItems = {};
                renderCarrito();
                carrito.classList.remove('visible');
                
            } catch (error) {
                console.error('Error:', error);
                alert('Error al procesar el pago. Contacta con soporte.');
            }
        },
        onError: function(err) {
            console.error(err);
            alert('Error al procesar el pago. Inténtalo de nuevo.');
        }
    }).render('#paypal-button-container');
}

renderCarrito();
