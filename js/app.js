const productos = [
  { id: 'ropa', nombre: 'Proveedor de ropa', img: 'assets/ropa.jpg', precioOrig: 19.99, precioSale: 9.99 },
  { id: 'vapers', nombre: 'Proveedor vapers', img: 'assets/vapers.jpg', precioOrig: 19.99, precioSale: 9.99 },
  { id: 'zapas', nombre: 'Proveedor zapas', img: 'assets/zapas.jpg', precioOrig: 19.99, precioSale: 9.99 },
  { id: 'vintage', nombre: 'Proveedor ropa vintage', img: 'assets/ropa_vintage.jpg', precioOrig: 19.99, precioSale: 9.99 },
  { id: 'facturas', nombre: 'Proveedor facturas editables', img: 'assets/facturas.jpg', precioOrig: 19.99, precioSale: 9.99 },
  { id: 'futbol', nombre: 'Proveedor fútbol', img: 'assets/futbol.jpg', precioOrig: 19.99, precioSale: 9.99 },
  { id: 'relojes', nombre: 'Proveedor relojes', img: 'assets/relojes.jpg', precioOrig: 19.99, precioSale: 9.99 },
  { id: 'accesorios', nombre: 'Proveedor accesorios', img: 'assets/accesorios.jpg', precioOrig: 19.99, precioSale: 9.99 },
  { id: 'electronica', nombre: 'Proveedor electrónica', img: 'assets/electronica.jpg', precioOrig: 19.99, precioSale: 9.99 },
  { id: 'tickets', nombre: 'Tickets', img: 'assets/tickets.jpg', precioOrig: 19.99, precioSale: 9.99 },
  { id: 'perfumes', nombre: 'Proveedor perfumes', img: 'assets/perfumes.jpg', precioOrig: 19.99, precioSale: 9.99 },
  { id: 'Iphones', nombre: 'Proveedor iPhone 15/16 Pro Max', img: 'assets/Iphones.jpg', precioOrig: 10, precioSale: 9.99 },
  { id: 'Bolsos', nombre: 'Proveedor Bolsos LV', img: 'assets/bolsosLV.jpg', precioOrig: 20, precioSale: 13.99 },
  { id: 'DenimTears', nombre: 'Proveedor Denim Tears:', img: 'assets/DenimTears.jpg', precioOrig: 10, precioSale: 9.99 },
  { id: 'PulseraLV', nombre: 'Proveedor Pulsera LV', img: 'assets/PulseraLV.jpg', precioOrig: 10, precioSale: 9.99 },
  { id: 'Sp5der', nombre: 'Proveedor Sp5der', img: 'assets/Sp5der.jpg', precioOrig: 10, precioSale: 9.99 },
  { id: 'JOYASCONDIAMANTEMOISSANITE', nombre: 'Proveedor JOYAS CON DIAMANTE (MOISSANITE)', img: 'assets/JOYASCONDIAMANTEMOISSANITE.jpg', precioOrig: 10, precioSale: 9.99 },
  { id: 'pack-completo', nombre: 'Pack completo de todos los proveedores', img: 'assets/pack.jpg', precioOrig: 99.99, precioSale: 50 },
  { id: 'pack-aleatorio', nombre: 'Pack aleatorio de varios proveedores', img: 'assets/PackRND.jpg', precioOrig: 39.99, precioSale: 19.99 },
];

// Variables globales para el sistema de tracking
let currentOrder = null;

// Renderizar productos
function renderProductos() {
  const productosContainer = document.getElementById('productos');
  productosContainer.innerHTML = "";
  productos.forEach(p => {
    const art = document.createElement('article');
    art.className = 'producto';
    art.dataset.id = p.id;
    art.innerHTML = `
      <img src="${p.img}" alt="${p.nombre}">
      <h2>${p.nombre}</h2>
      <div class="precio">
        <span class="tachado">${p.precioOrig}€</span>
        <span class="nuevo">${p.precioSale}€</span>
      </div>
      <button class="agregar" data-id="${p.id}">Agregar al carrito</button>
    `;
    productosContainer.appendChild(art);
  });
}

// MODAL ficha proveedor
function abrirModalProveedor(prod, cantidad = 1) {
  const modal = document.getElementById('modalProveedor');
  modal.innerHTML = `
    <div class="modal-content">
      <button class="cerrar-modal" id="cerrarModal">&times;</button>
      <div class="modal-flex">
        <div class="modal-img">
          <img src="${prod.img}" alt="${prod.nombre}">
        </div>
        <div class="modal-info">
          <h2>${prod.nombre}</h2>
          <div class="precio-modal">
            <span class="precio-nueva">${prod.precioSale.toFixed(2)}€</span>
            <span class="precio-original">${prod.precioOrig.toFixed(2)}€</span>
            <span class="descuento">AHORRA ${Math.round(100 - (prod.precioSale / prod.precioOrig) * 100)}%</span>
          </div>
          
          <!-- Campo para email del cliente -->
          <div class="customer-info">
            <h4>📧 Tu email para recibir la información:</h4>
            <input type="email" id="customerEmail" placeholder="tu-email@ejemplo.com" required>
          </div>
          
          <div class="cantidad-box">
            <button class="cantidad-btn" id="restarCantidad">-</button>
            <span class="cantidad-display" id="cantidadSpan">${cantidad}</span>
            <button class="cantidad-btn" id="sumarCantidad">+</button>
            <span class="mini">(Cantidad)</span>
          </div>
          
          <div class="info-instantaneo">⚡ Información enviada al instante</div>
          <div id="paypal-modal-btn"></div>
        </div>
      </div>
    </div>
  `;
  
  // Mostrar modal con animación
  modal.classList.add('activo');

  // Cantidad lógica
  let cantidadActual = cantidad;
  const span = modal.querySelector("#cantidadSpan");
  const emailInput = modal.querySelector("#customerEmail");
  
  modal.querySelector("#sumarCantidad").onclick = () => {
    cantidadActual++;
    span.textContent = cantidadActual;
    renderPayPalBtn(prod, cantidadActual, emailInput);
  };
  
  modal.querySelector("#restarCantidad").onclick = () => {
    if (cantidadActual > 1) {
      cantidadActual--;
      span.textContent = cantidadActual;
      renderPayPalBtn(prod, cantidadActual, emailInput);
    }
  };

  // Re-render PayPal cuando cambie el email
  emailInput.addEventListener('input', () => {
    renderPayPalBtn(prod, cantidadActual, emailInput);
  });

  // Render inicial PayPal
  renderPayPalBtn(prod, cantidadActual, emailInput);

  // Cerrar modal
  modal.querySelector("#cerrarModal").onclick = () => {
    modal.classList.remove('activo');
    setTimeout(() => {
      modal.innerHTML = "";
    }, 300);
  };

  // Cerrar modal al hacer clic fuera
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('activo');
      setTimeout(() => {
        modal.innerHTML = "";
      }, 300);
    }
  });
}

// Función mejorada para PayPal con tracking de cliente
function renderPayPalBtn(prod, cantidad, emailInput) {
  const cont = document.getElementById('paypal-modal-btn');
  cont.innerHTML = "";
  
  if (window.paypal) {
    paypal.Buttons({
      style: { 
        layout: 'vertical', 
        color: 'gold',
        shape: 'rect',
        label: 'pay'
      },
      createOrder: function(data, actions) {
        const email = emailInput.value.trim();
        if (!email || !email.includes('@')) {
          alert('Por favor, introduce un email válido para recibir la información del proveedor.');
          return Promise.reject(new Error('Email no válido'));
        }

        // Crear orden con información detallada
        const orderData = {
          purchase_units: [{
            amount: { 
              currency_code: 'EUR', 
              value: (prod.precioSale * cantidad).toFixed(2) 
            },
            description: `${prod.nombre} - Cantidad: ${cantidad}`,
            custom_id: JSON.stringify({
              producto: prod.nombre,
              producto_id: prod.id,
              cantidad: cantidad,
              email_cliente: email,
              precio_unitario: prod.precioSale,
              precio_total: (prod.precioSale * cantidad).toFixed(2),
              fecha: new Date().toISOString()
            })
          }]
        };

        // Continuación del código anterior...

        // Guardar información de la orden para usar después
        currentOrder = {
          producto: prod.nombre,
          producto_id: prod.id,
          cantidad: cantidad,
          email_cliente: email,
          precio_unitario: prod.precioSale,
          precio_total: (prod.precioSale * cantidad).toFixed(2),
          fecha: new Date().toISOString()
        };

        return actions.order.create(orderData);
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          // Pago exitoso
          console.log('Pago completado:', details);
          
          // Enviar información del cliente y producto al servidor
          enviarInformacionCliente(currentOrder, details);
          
          // Mostrar confirmación al usuario
          mostrarConfirmacionPago(currentOrder);
          
          // Cerrar modal
          document.getElementById('modalProveedor').classList.remove('activo');
        });
      },
      onError: function(err) {
        console.error('Error en el pago:', err);
        alert('Hubo un error al procesar el pago. Por favor, inténtalo de nuevo.');
      },
      onCancel: function(data) {
        console.log('Pago cancelado:', data);
        alert('Pago cancelado. Puedes intentarlo de nuevo cuando quieras.');
      }
    }).render('#paypal-modal-btn');
  }
}

// Función para enviar información del cliente al servidor
function enviarInformacionCliente(orderInfo, paypalDetails) {
  const datosEnvio = {
    ...orderInfo,
    transaction_id: paypalDetails.id,
    payer_email: paypalDetails.payer.email_address,
    payer_name: paypalDetails.payer.name.given_name + ' ' + paypalDetails.payer.name.surname,
    status: paypalDetails.status,
    timestamp: new Date().toISOString()
  };

  // Aquí enviarías los datos a tu servidor
  fetch('/api/nueva-venta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosEnvio)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Venta registrada:', data);
    // Aquí podrías enviar el email automáticamente al cliente
    enviarEmailCliente(datosEnvio);
  })
  .catch(error => {
    console.error('Error al registrar la venta:', error);
  });
}

// Función para enviar email al cliente con la información del proveedor
function enviarEmailCliente(datosVenta) {
  const emailData = {
    to: datosVenta.email_cliente,
    subject: `Información de tu proveedor: ${datosVenta.producto}`,
    body: `
      ¡Hola ${datosVenta.payer_name}!
      
      Gracias por tu compra. Aquí tienes la información de tu proveedor:
      
      Producto: ${datosVenta.producto}
      Cantidad: ${datosVenta.cantidad}
      Total pagado: ${datosVenta.precio_total}€
      
      La información del proveedor se enviará a tu email en los próximos minutos.
      
      ID de transacción: ${datosVenta.transaction_id}
      
      ¡Gracias por confiar en nosotros!
    `
  };

  // Enviar email (usando tu servicio de email preferido)
  fetch('/api/enviar-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailData)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Email enviado:', data);
  })
  .catch(error => {
    console.error('Error al enviar email:', error);
  });
}

// Función para mostrar confirmación de pago
function mostrarConfirmacionPago(orderInfo) {
  const modal = document.getElementById('modalProveedor');
  modal.innerHTML = `
    <div class="modal-content confirmacion">
      <div class="checkmark">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="#4CAF50"/>
          <path d="M25 50 L40 65 L75 30" stroke="white" stroke-width="5" fill="none"/>
        </svg>
      </div>
      <h2>¡Pago completado con éxito!</h2>
      <div class="confirmacion-detalles">
        <p><strong>Producto:</strong> ${orderInfo.producto}</p>
        <p><strong>Cantidad:</strong> ${orderInfo.cantidad}</p>
        <p><strong>Total:</strong> ${orderInfo.precio_total}€</p>
        <p><strong>Email:</strong> ${orderInfo.email_cliente}</p>
      </div>
      <div class="info-envio">
        <p>📧 La información del proveedor será enviada a tu email en los próximos minutos.</p>
        <p>⚡ ¡Gracias por tu compra!</p>
      </div>
      <button class="btn-cerrar" onclick="cerrarModal()">Cerrar</button>
    </div>
  `;
  
  modal.classList.add('activo');
  
  // Auto-cerrar después de 5 segundos
  setTimeout(() => {
    cerrarModal();
  }, 5000);
}

// Función para cerrar modal
function cerrarModal() {
  const modal = document.getElementById('modalProveedor');
  modal.classList.remove('activo');
  setTimeout(() => {
    modal.innerHTML = "";
  }, 300);
}

// Event listeners para los botones de productos
document.addEventListener('DOMContentLoaded', function() {
  renderProductos();
  
  // Agregar event listeners a los botones de productos
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('agregar')) {
      const productId = e.target.dataset.id;
      const producto = productos.find(p => p.id === productId);
      if (producto) {
        abrirModalProveedor(producto);
      }
    }
  });
});

// Función para filtrar productos (opcional)
function filtrarProductos(termino) {
  const productosContainer = document.getElementById('productos');
  const productos = productosContainer.querySelectorAll('.producto');
  
  productos.forEach(producto => {
    const nombre = producto.querySelector('h2').textContent.toLowerCase();
    if (nombre.includes(termino.toLowerCase())) {
      producto.style.display = 'block';
    } else {
      producto.style.display = 'none';
    }
  });
}

// Función para ordenar productos por precio
function ordenarProductos(orden) {
  const productosOrdenados = [...productos].sort((a, b) => {
    if (orden === 'precio-asc') {
      return a.precioSale - b.precioSale;
    } else if (orden === 'precio-desc') {
      return b.precioSale - a.precioSale;
    } else if (orden === 'nombre') {
      return a.nombre.localeCompare(b.nombre);
    }
    return 0;
  });
  
  // Re-renderizar productos con el nuevo orden
  const productosContainer = document.getElementById('productos');
  productosContainer.innerHTML = "";
  
  productosOrdenados.forEach(p => {
    const art = document.createElement('article');
    art.className = 'producto';
    art.dataset.id = p.id;
    art.innerHTML = `
      <img src="${p.img}" alt="${p.nombre}">
      <h2>${p.nombre}</h2>
      <div class="precio">
        <span class="tachado">${p.precioOrig}€</span>
        <span class="nuevo">${p.precioSale}€</span>
      </div>
      <button class="agregar" data-id="${p.id}">Agregar al carrito</button>
    `;
    productosContainer.appendChild(art);
  });
}
