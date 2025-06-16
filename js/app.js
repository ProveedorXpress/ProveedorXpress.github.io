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
  { id: 'PRUEBA', nombre: 'PRUEBA', img: 'assets/nada.jpg', precioOrig: 5, precioSale: 1 }
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
  carritoBtn.addEventListener('click', () => carrito.classList.add('visible'));
  cerrarCarrito.addEventListener('click', () => carrito.classList.remove('visible'));
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
  renderPayButton(total);
}

// Botón de pagar que redirige a systeme.io
function renderPayButton(total) {
  // Remover botón anterior si existe
  const existingButton = document.getElementById('pay-button');
  if (existingButton) {
    existingButton.remove();
  }

  // Solo mostrar botón si hay items en el carrito
  if (Object.keys(carritoItems).length === 0) {
    return;
  }

  const payButton = document.createElement('button');
  payButton.id = 'pay-button';
  payButton.className = 'pay-button';
  payButton.textContent = 'Pagar';
  payButton.style.cssText = `
    width: 100%;
    padding: 15px;
    background-color: #0070ba;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 15px;
    transition: background-color 0.3s ease;
  `;

  // Efecto hover
  payButton.addEventListener('mouseenter', () => {
    payButton.style.backgroundColor = '#005ea6';
  });
  
  payButton.addEventListener('mouseleave', () => {
    payButton.style.backgroundColor = '#0070ba';
  });

  // Evento click para redirigir
  payButton.addEventListener('click', () => {
    // Guardar información del carrito en localStorage para posible uso futuro
    localStorage.setItem('carritoItems', JSON.stringify(carritoItems));
    localStorage.setItem('carritoTotal', total.toFixed(2));
    
    // Redirigir a la página de pago
    window.location.href = 'https://proveedorxpress.systeme.io/';
  });

  // Añadir el botón al carrito
  const paypalContainer = document.querySelector('.paypal-container');
  if (paypalContainer) {
    paypalContainer.innerHTML = '';
    paypalContainer.appendChild(payButton);
  } else {
    carrito.appendChild(payButton);
  }
}

renderCarrito();
