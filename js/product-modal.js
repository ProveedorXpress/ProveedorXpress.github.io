const productos = [
    { 
        id:'ropa', 
        codigo: 'PROV1',
        nombre:'Proveedor de ropa', 
        descripcion: 'Acceso a contactos directos de proveedores especializados en ropa al por mayor. Incluye fabricantes de Europa y Asia con precios competitivos y calidad garantizada.',
        img:'assets/ropa.jpg', 
        precioOrig:19.99, 
        precioSale:9.99 
    },
    { 
        id:'vapers', 
        codigo: 'PROV2',
        nombre:'Proveedor vapers', 
        descripcion: 'Red de proveedores confiables de productos de vapeo. Incluye distribuidores mayoristas con certificaciones y productos de alta calidad.',
        img:'assets/vapers.jpg', 
        precioOrig:19.99, 
        precioSale:9.99 
    },
    { 
        id:'zapas', 
        codigo: 'PROV3',
        nombre:'Proveedor zapas', 
        descripcion: 'Contactos exclusivos de fabricantes de calzado deportivo y casual. Acceso a réplicas de alta calidad y marcas reconocidas.',
        img:'assets/zapas.jpg', 
        precioOrig:19.99, 
        precioSale:9.99 
    },
    { 
        id:'vintage', 
        codigo: 'PROV4',
        nombre:'Proveedor ropa vintage', 
        descripcion: 'Proveedores especializados en ropa vintage y retro. Incluye contactos de mayoristas con piezas únicas y auténticas.',
        img:'assets/ropa_vintage.jpg', 
        precioOrig:19.99, 
        precioSale:9.99 
    },
    { 
        id:'facturas', 
        codigo: 'PROV5',
        nombre:'Proveedor facturas editables', 
        descripcion: 'Servicios profesionales para documentación comercial. Plantillas y herramientas para gestión empresarial.',
        img:'assets/facturas.jpg', 
        precioOrig:19.99, 
        precioSale:9.99 
    },
    { 
        id:'futbol', 
        codigo: 'PROV6',
        nombre:'Proveedor fútbol', 
        descripcion: 'Equipación deportiva y merchandising de fútbol. Contactos de fabricantes de camisetas, equipos y accesorios deportivos.',
        img:'assets/futbol.jpg', 
        precioOrig:19.99, 
        precioSale:9.99 
    },
    { 
        id:'relojes', 
        codigo: 'PROV7',
        nombre:'Proveedor relojes', 
        descripcion: 'Red de proveedores de relojes de lujo y accesorios. Incluye fabricantes de réplicas de alta gama y originales.',
        img:'assets/relojes.jpg', 
        precioOrig:19.99, 
        precioSale:9.99 
    },
    { 
        id:'accesorios', 
        codigo: 'PROV8',
        nombre:'Proveedor accesorios', 
        descripcion: 'Amplia gama de accesorios de moda y tecnológicos. Contactos directos con fabricantes de joyas, bolsos y complementos.',
        img:'assets/accesorios.jpg', 
        precioOrig:19.99, 
        precioSale:9.99 
    },
    { 
        id:'electronica', 
        codigo: 'PROV9',
        nombre:'Proveedor electrónica', 
        descripcion: 'Proveedores especializados en electrónica de consumo. Incluye fabricantes de smartphones, tablets y gadgets tecnológicos.',
        img:'assets/electronica.jpg', 
        precioOrig:19.99, 
        precioSale:9.99 
    },
    { 
        id:'tickets', 
        codigo: 'PROV10',
        nombre:'Tickets', 
        descripcion: 'Servicios de ticketing y gestión de eventos. Herramientas profesionales para la venta y control de entradas.',
        img:'assets/tickets.jpg', 
        precioOrig:19.99, 
        precioSale:9.99 
    },
    { 
        id:'perfumes', 
        codigo: 'PROV11',
        nombre:'Proveedor perfumes', 
        descripcion: 'Contactos exclusivos de distribuidores de perfumes y fragancias. Incluye marcas de lujo y alternativas de calidad.',
        img:'assets/perfumes.jpg', 
        precioOrig:19.99, 
        precioSale:9.99 
    },
    { 
        id:'pack-completo', 
        codigo: 'PACK_ALL',
        nombre:'Pack completo de todos los proveedores', 
        descripcion: 'Acceso completo a toda nuestra red de proveedores. Incluye todos los contactos y categorías disponibles con descuento especial.',
        img:'assets/pack.jpg', 
        precioOrig:99.99, 
        precioSale:50 
    },
    { 
        id:'pack-aleatorio', 
        codigo: 'PACK_RANDOM',
        nombre:'Pack aleatorio de varios proveedores', 
        descripcion: 'Selección aleatoria de 5 proveedores de diferentes categorías. Ideal para comenzar en el negocio con variedad.',
        img:'assets/aleatorios.jpg', 
        precioOrig:39.99, 
        precioSale:19.99 
    }
];

const productosContainer = document.getElementById('productos');
const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');

let currentProduct = null;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    initModalEvents();
});

// Renderizar productos
function renderProducts() {
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
            <button class="agregar">Ver detalles y comprar</button>
        `;
        productosContainer.appendChild(art);
    });

    // Eventos para abrir modal
    document.querySelectorAll('button.agregar').forEach(btn => {
        btn.addEventListener('click', e => {
            const art = e.target.closest('article');
            const id = art.dataset.id;
            const prod = productos.find(x => x.id === id);
            openProductModal(prod);
        });
    });
}

// Inicializar eventos del modal
function initModalEvents() {
    // Cerrar modal con botón X
    closeModal.addEventListener('click', closeProductModal);
    
    // Cerrar modal clickando fuera
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeProductModal();
        }
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && productModal.classList.contains('visible')) {
            closeProductModal();
        }
    });
}

// Función para abrir el modal
function openProductModal(producto) {
    currentProduct = producto;
    
    // Rellenar datos del modal
    document.getElementById('modalImage').src = producto.img;
    document.getElementById('modalImage').alt = producto.nombre;
    document.getElementById('modalTitle').textContent = producto.nombre;
    document.getElementById('modalDescription').textContent = producto.descripcion;
    document.getElementById('modalOrigPrice').textContent = `${producto.precioOrig}$`;
    document.getElementById('modalSalePrice').textContent = `${producto.precioSale}$`;
    
    // Mostrar modal
    productModal.classList.add('visible');
    document.body.style.overflow = 'hidden';
    
    // Renderizar botón PayPal
    renderModalPayPalButton(producto);
}

// Función para cerrar el modal
function closeProductModal() {
    productModal.classList.remove('visible');
    document.body.style.overflow = 'auto';
    currentProduct = null;
    
    // Limpiar PayPal
    const paypalContainer = document.getElementById('modal-paypal-button-container');
    paypalContainer.innerHTML = '';
}

// PayPal para el modal
function renderModalPayPalButton(producto) {
    const paypalContainer = document.getElementById('modal-paypal-button-container');
    paypalContainer.innerHTML = '';

    paypal.Buttons({
        style: { 
            layout: 'vertical', 
            color: 'gold', 
            shape: 'rect', 
            label: 'paypal',
            height: 45
        },
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: { 
                        currency_code: 'EUR', 
                        value: producto.precioSale.toFixed(2) 
                    },
                    description: `${producto.codigo} - ${producto.nombre}`
                }]
            });
        },
        onApprove: async function(data, actions) {
            try {
                const details = await actions.order.capture();
                const clienteInfo = await solicitarEmailCliente();
                
                if (clienteInfo) {
                    const mensajeCarga = mostrarMensajeCarga(producto.codigo);
                    
                    // Procesar compra del proveedor específico
                    const proveedorData = await procesarCompraSegura([producto], clienteInfo.email, data.orderID, producto.codigo);
                    
                    if (proveedorData) {
                        const emailEnviado = await enviarDatosSeguro(proveedorData, clienteInfo.email, clienteInfo.nombre, producto.codigo);
                        ocultarMensajeCarga(mensajeCarga);
                        
                        if (emailEnviado) {
                            alert(`¡Gracias por tu compra, ${clienteInfo.nombre}! 
                            
Los datos del proveedor ${producto.codigo} (${producto.nombre}) han sido enviados a: ${clienteInfo.email}

Revisa tu bandeja de entrada (y spam) en unos minutos.`);
                        } else {
                            alert(`Pago procesado correctamente, pero hubo un error al enviar el email.
                            
Por favor, contacta con soporte@proveedorxpress.com mencionando:
- ID de transacción: ${data.orderID}
- Código de proveedor: ${producto.codigo}`);
                        }
                    } else {
                        ocultarMensajeCarga(mensajeCarga);
                        alert(`Error al obtener los datos del proveedor ${producto.codigo}. 
                        
Contacta con soporte@proveedorxpress.com mencionando tu ID: ${data.orderID}`);
                    }
                }
                
                closeProductModal();
                
            } catch (error) {
                console.error('Error:', error);
                alert('Error al procesar el pago. Contacta con soporte.');
            }
        },
        onError: function(err) {
            console.error(err);
            alert('Error al procesar el pago. Inténtalo de nuevo.');
        }
    }).render('#modal-paypal-button-container');
}

// Función para mostrar mensaje de carga
function mostrarMensajeCarga(codigo) {
    const mensajeCarga = document.createElement('div');
    mensajeCarga.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: white; padding: 2rem; border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.3); z-index: 10002; text-align: center;
    `;
    mensajeCarga.innerHTML = `
        <h3 style="color: #cc9900; margin-bottom: 1rem;">Procesando...</h3>
        <p>Obteniendo y enviando los datos del proveedor ${codigo}...</p>
        <div style="margin-top: 1rem;">
            <div style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #cc9900; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
        </div>
        <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
    `;
    document.body.appendChild(mensajeCarga);
    return mensajeCarga;
}

// Función para ocultar mensaje de carga
function ocultarMensajeCarga(mensajeCarga) {
    if (mensajeCarga && mensajeCarga.parentNode) {
        mensajeCarga.remove();
    }
}

// Función para solicitar email del cliente
async function solicitarEmailCliente() {
    return new Promise((resolve) => {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.8); display: flex; justify-content: center; 
            align-items: center; z-index: 10003;
        `;
        modal.innerHTML = `
            <div style="background: white; padding: 2rem; border-radius: 12px; max-width: 400px; width: 90%;">
                <h3 style="color: #cc9900; margin-bottom: 1rem;">Información de entrega</h3>
                <p style="margin-bottom: 1rem; color: #333;">Para enviarte los datos del proveedor, necesitamos:</p>
                <input type="text" id="clienteName" placeholder="Tu nombre" style="width: 100%; padding: 0.8rem; margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 6px;">
                <input type="email" id="clienteEmail" placeholder="Tu email" style="width: 100%; padding: 0.8rem; margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 6px;">
                <div style="display: flex; gap: 1rem;">
                    <button id="confirmClient" style="flex: 1; padding: 0.8rem; background: #cc9900; color: white; border: none; border-radius: 6px; cursor: pointer;">Confirmar</button>
                    <button id="cancelClient" style="flex: 1; padding: 0.8rem; background: #ccc; color: black; border: none; border-radius: 6px; cursor: pointer;">Cancelar</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        const nameInput = modal.querySelector('#clienteName');
        const emailInput = modal.querySelector('#clienteEmail');
        
        modal.querySelector('#confirmClient').onclick = () => {
            const nombre = nameInput.value.trim();
            const email = emailInput.value.trim();
            if (nombre && email && email.includes('@')) {
                modal.remove();
                resolve({ nombre, email });
            } else {
                alert('Por favor, completa todos los campos correctamente.');
            }
        };
        
        modal.querySelector('#cancelClient').onclick = () => {
            modal.remove();
            resolve(null);
        };
    });
}

// Funciones placeholder para el procesamiento (adaptar a tu backend)
async function procesarCompraSegura(productos, email, orderID, codigo) {
    // Aquí irá tu lógica para obtener los datos del proveedor específico
    // usando el código del proveedor (PROV1, PROV2, etc.)
    console.log('Procesando compra para:', codigo, email, orderID);
    
    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Retornar datos del proveedor (esto debe venir de tu base de datos)
    return {
        codigo: codigo,
        datos: `Datos del proveedor ${codigo}`,
        contactos: ['ejemplo@proveedor.com'],
        // ... otros datos del proveedor
    };
}

// Función para enviar datos de forma segura por email
async function enviarDatosSeguro(proveedorData, email, nombre, codigo) {
    try {
        // Aquí deberías hacer una llamada a tu API/backend para enviar el email
        const response = await fetch('/api/enviar-datos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                nombre: nombre,
                codigo: codigo,
                proveedorData: proveedorData,
                timestamp: new Date().toISOString()
            })
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Email enviado correctamente:', result);
            return true;
        } else {
            console.error('Error al enviar email:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Error en enviarDatosSeguro:', error);
        return false;
    }
}

// Función auxiliar para validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para registrar la compra en el sistema (opcional)
async function registrarCompra(orderID, email, codigo, precio) {
    try {
        const response = await fetch('/api/registrar-compra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderID: orderID,
                email: email,
                codigo: codigo,
                precio: precio,
                fecha: new Date().toISOString()
            })
        });

        if (response.ok) {
            console.log('Compra registrada correctamente');
            return true;
        } else {
            console.error('Error al registrar compra');
            return false;
        }
    } catch (error) {
        console.error('Error en registrarCompra:', error);
        return false;
    }
}

// Función mejorada para procesar compra segura
async function procesarCompraSegura(productos, email, orderID, codigo) {
    try {
        // Simular obtención de datos del proveedor desde tu base de datos/API
        const response = await fetch(`/api/proveedor/${codigo}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${orderID}`, // Usar orderID como token temporal
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const proveedorData = await response.json();
            
            // Registrar la compra (opcional)
            await registrarCompra(orderID, email, codigo, productos[0].precioSale);
            
            return {
                codigo: codigo,
                nombre: productos[0].nombre,
                contactos: proveedorData.contactos || [],
                whatsapp: proveedorData.whatsapp || '',
                telegram: proveedorData.telegram || '',
                instrucciones: proveedorData.instrucciones || '',
                precios: proveedorData.precios || {},
                condiciones: proveedorData.condiciones || '',
                orderID: orderID,
                fechaCompra: new Date().toISOString()
            };
        } else {
            console.error('Error al obtener datos del proveedor:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error en procesarCompraSegura:', error);
        
        // Fallback con datos de ejemplo (eliminar en producción)
        return {
            codigo: codigo,
            nombre: productos[0].nombre,
            contactos: ['contacto@proveedor-ejemplo.com'],
            whatsapp: '+34600000000',
            telegram: '@proveedor_ejemplo',
            instrucciones: 'Contacta por WhatsApp mencionando tu código de compra.',
            precios: { minimo: '100€', descuentos: '5% por volumen' },
            condiciones: 'Pago por adelantado. Envío en 3-5 días.',
            orderID: orderID,
            fechaCompra: new Date().toISOString()
        };
    }
}

// Función para manejar errores de conexión
function manejarErrorConexion(error, orderID) {
    console.error('Error de conexión:', error);
    
    const modalError = document.createElement('div');
    modalError.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.8); display: flex; justify-content: center; 
        align-items: center; z-index: 10004;
    `;
    modalError.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: 12px; max-width: 500px; width: 90%; text-align: center;">
            <h3 style="color: #d32f2f; margin-bottom: 1rem;">Error de conexión</h3>
            <p style="margin-bottom: 1rem; color: #333;">
                No se pudo completar el procesamiento automático.<br>
                Tu pago se ha procesado correctamente.
            </p>
            <p style="margin-bottom: 1.5rem; font-weight: bold;">
                ID de transacción: ${orderID}
            </p>
            <p style="margin-bottom: 1.5rem; color: #666; font-size: 0.9rem;">
                Por favor, contacta con soporte@proveedorxpress.com<br>
                mencionando tu ID de transacción para recibir tus datos.
            </p>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="padding: 0.8rem 1.5rem; background: #cc9900; color: white; border: none; border-radius: 6px; cursor: pointer;">
                Entendido
            </button>
        </div>
    `;
    document.body.appendChild(modalError);
}
