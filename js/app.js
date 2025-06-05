// Datos unificados de los productos (combinando ambas listas)
const productos = [
  // Productos del primer código (con descripciones detalladas)
  {
    id: 'ropa',
    nombre: 'Proveedor de Ropa Premium',
    img: 'assets/ropa.jpg',
    precioOrig: 49.99,
    precioSale: 25.00,
    descripcion: 'El mejor proveedor de ropa del mercado español. Acceso exclusivo a marcas de alta calidad con márgenes de beneficio del 300%.',
    caracteristicas: [
      'Plantilla de Tickets (Recibos Físicos)',
      'Catálogo completo de productos',
      'Contacto directo con el proveedor',
      'Guía paso a paso para empezar',
      'Soporte 24/7 durante 30 días',
      'Garantía de devolución 100%'
    ]
  },
  {
    id: 'electronica',
    nombre: 'Proveedor de Electrónicos',
    img: 'assets/electronica.jpg',
    precioOrig: 59.99,
    precioSale: 25.00,
    descripcion: 'Proveedor exclusivo de electrónicos con productos de última generación. Márgenes increíbles y envío rápido garantizado.',
    caracteristicas: [
      'Acceso a productos premium',
      'Precios de mayorista verificados',
      'Contacto WhatsApp directo',
      'Manual de importación',
      'Lista de productos bestsellers',
      'Asesoría personalizada'
    ]
  },
  {
    id: 'hogar',
    nombre: 'Proveedor de Hogar y Decoración',
    img: 'assets/hogar.jpg',
    precioOrig: 39.99,
    precioSale: 25.00,
    descripcion: 'Especialista en productos para el hogar con tendencias actuales. Ideal para dropshipping y tienda física.',
    caracteristicas: [
      'Catálogo de 500+ productos',
      'Imágenes HD profesionales',
      'Descripción de productos',
      'Precios competitivos',
      'Envío desde España',
      'Garantía de calidad'
    ]
  },
  {
    id: 'deportes',
    nombre: 'Proveedor de Deportes y Fitness',
    img: 'assets/deportes.jpg',
    precioOrig: 44.99,
    precioSale: 25.00,
    descripcion: 'Proveedor líder en equipamiento deportivo y fitness. Productos de alta demanda con excelente rentabilidad.',
    caracteristicas: [
      'Equipamiento profesional',
      'Marcas reconocidas',
      'Certificaciones de calidad',
      'Soporte técnico incluido',
      'Envío express disponible',
      'Programa de afiliados'
    ]
  },
  {
    id: 'belleza',
    nombre: 'Proveedor de Belleza y Cuidado',
    img: 'assets/belleza.jpg',
    precioOrig: 54.99,
    precioSale: 25.00,
    descripcion: 'Productos de belleza y cuidado personal de marcas premium. Sector con alta demanda y excelentes márgenes.',
    caracteristicas: [
      'Productos certificados',
      'Marcas exclusivas',
      'Packaging premium',
      'Documentación completa',
      'Asesoría de marketing',
      'Samples gratuitos'
    ]
  },
  {
    id: 'mascotas',
    nombre: 'Proveedor de Productos para Mascotas',
    img: 'assets/mascotas.jpg',
    precioOrig: 34.99,
    precioSale: 25.00,
    descripcion: 'Especialista en productos para mascotas con gran variedad. Mercado en crecimiento constante con alta fidelización.',
    caracteristicas: [
      'Productos veterinarios',
      'Accesorios premium',
      'Alimentos especializados',
      'Juguetes innovadores',
      'Envío refrigerado',
      'Asesoría veterinaria'
    ]
  },
  // Productos adicionales del segundo código
  {
    id: 'vapers',
    nombre: 'Proveedor vapers',
    img: 'assets/vapers.jpg',
    precioOrig: 19.99,
    precioSale: 9.99,
    descripcion: 'Proveedor especializado en productos de vapeo con amplia variedad de marcas y modelos.',
    caracteristicas: [
      'Marcas reconocidas',
      'Productos certificados',
      'Envío discreto',
      'Soporte técnico',
      'Garantía de calidad'
    ]
  },
  {
    id: 'zapas',
    nombre: 'Proveedor zapas',
    img: 'assets/zapas.jpg',
    precioOrig: 19.99,
    precioSale: 9.99,
    descripcion: 'Especialista en calzado deportivo y casual con las últimas tendencias del mercado.',
    caracteristicas: [
      'Últimas tendencias',
      'Tallas completas',
      'Calidad premium',
      'Envío rápido',
      'Devoluciones fáciles'
    ]
  },
  {
    id: 'vintage',
    nombre: 'Proveedor ropa vintage',
    img: 'assets/ropa_vintage.jpg',
    precioOrig: 19.99,
    precioSale: 9.99,
    descripcion: 'Ropa vintage y retro con piezas únicas y auténticas de diferentes décadas.',
    caracteristicas: [
      'Piezas únicas',
      'Autenticidad garantizada',
      'Diferentes décadas',
      'Estado verificado',
      'Certificados de época'
    ]
  },
  {
    id: 'facturas',
    nombre: 'Proveedor facturas editables',
    img: 'assets/facturas.jpg',
    precioOrig: 19.99,
    precioSale: 9.99,
    descripcion: 'Plantillas profesionales de facturas editables para tu negocio.',
    caracteristicas: [
      'Plantillas profesionales',
      'Formato editable',
      'Cumplimiento legal',
      'Fácil personalización',
      'Soporte incluido'
    ]
  },
  {
    id: 'futbol',
    nombre: 'Proveedor fútbol',
    img: 'assets/futbol.jpg',
    precioOrig: 19.99,
    precioSale: 9.99,
    descripcion: 'Equipamiento y accesorios de fútbol de las mejores marcas.',
    caracteristicas: [
      'Equipamiento oficial',
      'Todas las tallas',
      'Marcas reconocidas',
      'Calidad garantizada',
      'Envío express'
    ]
  },
  {
    id: 'relojes',
    nombre: 'Proveedor relojes',
    img: 'assets/relojes.jpg',
    precioOrig: 19.99,
    precioSale: 9.99,
    descripcion: 'Relojes de alta calidad con diseños elegantes y modernos.',
    caracteristicas: [
      'Diseños exclusivos',
      'Mecanismos de calidad',
      'Garantía extendida',
      'Packaging premium',
      'Certificado de autenticidad'
    ]
  },
  {
    id: 'accesorios',
    nombre: 'Proveedor accesorios',
    img: 'assets/accesorios.jpg',
    precioOrig: 19.99,
    precioSale: 9.99,
    descripcion: 'Amplia gama de accesorios de moda para complementar cualquier look.',
    caracteristicas: [
      'Última moda',
      'Variedad de estilos',
      'Materiales de calidad',
      'Precios competitivos',
      'Envío rápido'
    ]
  },
  {
    id: 'tickets',
    nombre: 'Tickets',
    img: 'assets/tickets.jpg',
    precioOrig: 19.99,
    precioSale: 9.99,
    descripcion: 'Sistema de tickets y comprobantes para tu negocio.',
    caracteristicas: [
      'Sistema completo',
      'Fácil implementación',
      'Personalizable',
      'Soporte técnico',
      'Actualizaciones gratuitas'
    ]
  },
  {
    id: 'perfumes',
    nombre: 'Proveedor perfumes',
    img: 'assets/perfumes.jpg',
    precioOrig: 19.99,
    precioSale: 9.99,
    descripcion: 'Perfumes y fragancias de marcas premium con excelente calidad.',
    caracteristicas: [
      'Fragancias originales',
      'Larga duración',
      'Packaging elegante',
      'Certificados de calidad',
      'Envío seguro'
    ]
  },
  {
    id: 'pack-completo',
    nombre: 'Pack completo de todos los proveedores',
    img: 'assets/pack.jpg',
    precioOrig: 99.99,
    precioSale: 50,
    descripcion: 'Pack completo con acceso a todos nuestros proveedores premium. La mejor oferta para emprendedores serios.',
    caracteristicas: [
      'Todos los proveedores incluidos',
      'Descuento máximo',
      'Soporte prioritario',
      'Actualizaciones de por vida',
      'Asesoría personalizada',
      'Garantía extendida'
    ]
  },
  {
    id: 'pack-aleatorio',
    nombre: 'Pack aleatorio de varios proveedores',
    img: 'assets/aleatorios.jpg',
    precioOrig: 39.99,
    precioSale: 19.99,
    descripcion: 'Pack sorpresa con una selección aleatoria de nuestros mejores proveedores.',
    caracteristicas: [
      'Selección sorpresa',
      'Mínimo 3 proveedores',
      'Valor garantizado',
      'Precio especial',
      'Perfecto para empezar'
    ]
  }
];

// Variables globales para el carrito
const productosContainer = document.getElementById('productos');
const carritoBtn = document.getElementById('btnCarrito');
const carrito = document.getElementById('carrito');
const cerrarCarrito = document.getElementById('cerrarCarrito');
const listaCarrito = document.getElementById('listaCarrito');
const totalSpan = document.getElementById('total');
let carritoItems = {};

// Función para crear el modal
function crearModal() {
  const modal = document.createElement('div');
  modal.className = 'product-modal';
  modal.id = 'productModal';
  
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" onclick="cerrarModal()">&times;</button>
      <img class="modal-image" id="modalImage" src="" alt="">
      <div class="modal-body">
        <h2 class="modal-title" id="modalTitle"></h2>
        <p class="modal-subtitle">⭐⭐⭐⭐⭐ (+6700 Reseñas)</p>
        <p class="modal-description" id="modalDescription"></p>
        
        <div class="modal-price">
          <span class="modal-price-original" id="modalPriceOriginal"></span>
          <span class="modal-price-sale" id="modalPriceSale"></span>
        </div>
        
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 12px; margin: 20px 0;">
          <p style="margin: 0; color: #856404;">⚡ Información enviada al instante</p>
        </div>
        
        <h3 style="margin-bottom: 15px; color: #000;">¿Qué Incluye?</h3>
        <ul class="modal-features" id="modalFeatures"></ul>
        
        <p style="font-size: 0.9rem; color: #666; margin-bottom: 20px;">(No viene incluido en ningún pack)</p>
        
        <div class="modal-actions">
          <button class="modal-add-cart" onclick="agregarAlCarritoDesdeModal()">
            AGREGAR AL CARRITO
          </button>
          <button class="modal-view-cart" onclick="abrirCarritoDesdeModal()" style="display: none;">
            VER CARRITO
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
}

// Variable global para guardar el producto actual del modal
let productoActualModal = null;

// Función para abrir el modal
function abrirModal(productoId) {
  const producto = productos.find(p => p.id === productoId);
  if (!producto) return;
  
  productoActualModal = producto;
  
  // Actualizar contenido del modal
  document.getElementById('modalImage').src = producto.img;
  document.getElementById('modalTitle').textContent = producto.nombre;
  document.getElementById('modalDescription').textContent = producto.descripcion;
  document.getElementById('modalPriceOriginal').textContent = `€${producto.precioOrig}`;
  document.getElementById('modalPriceSale').textContent = `€${producto.precioSale}`;
  
  // Actualizar características
  const featuresContainer = document.getElementById('modalFeatures');
  featuresContainer.innerHTML = '';
  producto.caracteristicas.forEach(caracteristica => {
    const li = document.createElement('li');
    li.textContent = caracteristica;
    featuresContainer.appendChild(li);
  });
  
  // Mostrar modal
  const modal = document.getElementById('productModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal
function cerrarModal() {
  const modal = document.getElementById('productModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
  productoActualModal = null;
}

// Función para agregar al carrito desde el modal
function agregarAlCarritoDesdeModal() {
  if (!productoActualModal) return;
  
  const id = productoActualModal.id;
  const prod = productoActualModal;
  
  if (!carritoItems[id]) {
    carritoItems[id] = { 
      nombre: prod.nombre, 
      precio: prod.precioSale, 
      cantidad: 1 
    };
  } else {
    carritoItems[id].cantidad++;
  }
  
  renderCarrito();
  
  // Cambiar botón del modal
  const btnAgregar = document.querySelector('.modal-add-cart');
  const btnVerCarrito = document.querySelector('.modal-view-cart');
  btnAgregar.style.display = 'none';
  btnVerCarrito.style.display = 'block';
  
  // Mostrar mensaje de confirmación
  const mensaje = document.createElement('div');
  mensaje.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 10002;
    background: #28a745; color: white; padding: 1rem;
    border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  `;
  mensaje.textContent = '✓ Producto agregado al carrito';
  document.body.appendChild(mensaje);
  
  setTimeout(() => {
    mensaje.remove();
  }, 3000);
}

// Función para abrir carrito desde modal
function abrirCarritoDesdeModal() {
  cerrarModal();
  if (carrito) {
    carrito.classList.add('visible');
  }
}

// Renderizar productos en la página
function renderizarProductos() {
  if (!productosContainer) return;
  
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
      <button class="agregar" data-action="ver">Ver Producto</button>
      <button class="agregar-directo" data-action="agregar">Añadir al carrito</button>
    `;
    productosContainer.appendChild(art);
  });
}

// Eventos del carrito
function configurarEventosCarrito() {
  if (carritoBtn && cerrarCarrito && carrito) {
    carritoBtn.addEventListener('click', () => {
      carrito.classList.add('visible');
    });
    cerrarCarrito.addEventListener('click', () => {
      carrito.classList.remove('visible');
    });
  }
}

// Configurar eventos de productos
function configurarEventosProductos() {
  // Botones "Ver Producto" (abrir modal)
  document.addEventListener('click', function(e) {
    if (e.target.matches('.agregar[data-action="ver"], .btn-agregar, .agregar:not([data-action])')) {
      e.preventDefault();
      
      const producto = e.target.closest('.producto, article');
      let productoId = '';
      
      if (producto.id) {
        productoId = producto.id;
      } else if (producto.dataset.id) {
        productoId = producto.dataset.id;
      } else {
        const productos = document.querySelectorAll('.producto, article');
        const index = Array.from(productos).indexOf(producto);
        const productosIds = productos.map(p => p.dataset.id).filter(Boolean);
        productoId = productosIds[index] || 'ropa';
      }
      
      abrirModal(productoId);
    }
    
    // Botones "Añadir al carrito directo"
    if (e.target.matches('.agregar-directo[data-action="agregar"]')) {
      e.preventDefault();
      
      const art = e.target.closest('article');
      const id = art.dataset.id;
      const prod = productos.find(x => x.id === id);
      
      if (!carritoItems[id]) {
        carritoItems[id] = { 
          nombre: prod.nombre, 
          precio: prod.precioSale, 
          cantidad: 1 
        };
      } else {
        carritoItems[id].cantidad++;
      }
      
      renderCarrito();
      carrito.classList.add('visible');
    }
  });
}

// Renderizar carrito
function renderCarrito() {
  if (!listaCarrito || !totalSpan) return;
  
  listaCarrito.innerHTML = '';
  let total = 0;
  
  Object.keys(carritoItems).forEach(id => {
    const item = carritoItems[id];
    total += item.precio * item.cantidad;
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="nombre">${item.nombre}</span>
      <input type="number" class="cantidad" min="1" value="${item.cantidad}" data-id="${id}">
      <span class="precio">${(item.precio * item.cantidad).toFixed(2)}€</span>
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
  
  // Renderizar botón PayPal si existe la función
  if (typeof renderPayPalButton === 'function') {
    renderPayPalButton(total);
  }
}

// PayPal con seguridad (del segundo código)
function renderPayPalButton(total) {
  document.getElementById('paypal-button-container')?.remove();
  const container = document.createElement('div');
  container.id = 'paypal-button-container';
  container.style.marginTop = 'auto';
  carrito.appendChild(container);

  if (typeof paypal !== 'undefined') {
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
            if (typeof procesarCompraSegura === 'function') {
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
}

// Cerrar modal al hacer clic fuera
document.addEventListener('click', function(e) {
  const modal = document.getElementById('productModal');
  if (e.target === modal) {
    cerrarModal();
  }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    cerrarModal();
  }
});

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  // Crear el modal
  crearModal();
  
  // Renderizar productos si existe el contenedor
  renderizarProductos();
  
  // Configurar eventos del carrito
  configurarEventosCarrito();
  
  // Configurar eventos de productos
  configurarEventosProductos();
  
  // Renderizar carrito inicial
  renderCarrito();
});

// Función auxiliar para debug
function debugProductos() {
  console.log('Productos disponibles:', productos.map(p => p.id));
  console.log('Botones encontrados:', document.querySelectorAll('.btn-agregar, .agregar').length);
  console.log('Carrito items:', carritoItems);
}
