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
renderProductos();

// Modal ficha proveedor
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
          <div>
            <span class="precio-nueva">${prod.precioSale.toFixed(2)}€</span>
            <span class="precio-original">${prod.precioOrig.toFixed(2)}€</span>
            <span class="descuento">AHORRA ${Math.round(100 - (prod.precioSale / prod.precioOrig) * 100)}%</span>
          </div>
          <div class="cantidad-box">
            <button id="restarCantidad">-</button>
            <span id="cantidadSpan">${cantidad}</span>
            <button id="sumarCantidad">+</button>
            <span class="mini">(Cantidad)</span>
          </div>
          <div class="info-instantaneo">⚡ Información enviada al instante.</div>
          <div id="paypal-modal-btn"></div>
        </div>
      </div>
    </div>
  `;
  modal.classList.remove('oculto');

  // Cantidad lógica
  let cantidadActual = cantidad;
  const span = modal.querySelector("#cantidadSpan");
  modal.querySelector("#sumarCantidad").onclick = () => {
    cantidadActual++;
    span.textContent = cantidadActual;
    renderPayPalBtn(prod, cantidadActual);
  };
  modal.querySelector("#restarCantidad").onclick = () => {
    if (cantidadActual > 1) {
      cantidadActual--;
      span.textContent = cantidadActual;
      renderPayPalBtn(prod, cantidadActual);
    }
  };

  // Render PayPal
  renderPayPalBtn(prod, cantidadActual);

  // Cerrar modal
  modal.querySelector("#cerrarModal").onclick = () => {
    modal.classList.add('oculto');
    modal.innerHTML = "";
  };
}

function renderPayPalBtn(prod, cantidad) {
  const cont = document.getElementById('paypal-modal-btn');
  cont.innerHTML = "";
  if (window.paypal) {
    paypal.Buttons({
      style: { layout: 'vertical', color: 'gold' },
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: { currency_code: 'EUR', value: (prod.precioSale * cantidad).toFixed(2) },
            custom_id: `[${prod.nombre}] Cantidad:${cantidad}`
          }]
        });
      },
      onApprove: async function(data, actions) {
        alert(`¡Gracias por tu compra de ${prod.nombre}!`);
        // Aquí puedes mostrar info de contacto, enviar email, etc.
      },
      onError: err => {
        alert("Error al procesar el pago con PayPal.");
        console.error(err);
      }
    }).render('#paypal-modal-btn');
  }
}

// Abrir modal ficha al hacer click en “Agregar al carrito”
document.getElementById('productos').addEventListener('click', e => {
  if (e.target.classList.contains('agregar')) {
    const id = e.target.dataset.id;
    const prod = productos.find(p => p.id === id);
    if (prod) abrirModalProveedor(prod);
  }
});
