
const productos = [
{ id:'ropa', nombre:'Proveedor de ropa', img:'assets/ropa.jpg', precioOrig:19.99, precioSale:9.99 },
{ id:'vapers', nombre:'Proveedor vapers', img:'assets/vapers.jpg', precioOrig:19.99, precioSale:9.99 },
{ id:'zapas', nombre:'Proveedor zapas', img:'assets/zapas.jpg', precioOrig:19.99, precioSale:9.99 },
{ id:'vintage', nombre:'Proveedor ropa vintage', img:'assets/vintage.jpg', precioOrig:19.99, precioSale:9.99 },
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

// Estado del carrito
let carritoItems = {};

// Renderizar productos en el DOM
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

// Mostrar/ocultar carrito
carritoBtn.addEventListener('click', () => {
carrito.classList.add('visible');
});
cerrarCarrito.addEventListener('click', () => {
carrito.classList.remove('visible');
});

// Añadir productos al carrito
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

    // Control cantidad
    li.querySelector('input.cantidad').addEventListener('change', e => {
    let val = parseInt(e.target.value);
    if (isNaN(val) || val < 1) val = 1;
    carritoItems[id].cantidad = val;
    renderCarrito();
    });

    // Botón eliminar
    li.querySelector('button.eliminar').addEventListener('click', () => {
    delete carritoItems[id];
    renderCarrito();
    });
});
totalSpan.textContent = `Total: ${total.toFixed(2)}€`;
renderPayPalButton(total);
}

// Renderizar botón PayPal en carrito
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
        amount: { currency_code: 'USD', value: total.toFixed(2) }
        }]
    });
    },
    onApprove: function(data, actions) {
    return actions.order.capture().then(details => {
        alert(`Gracias por tu compra, ${details.payer.name.given_name}!`);
        carritoItems = {};
        renderCarrito();
        carrito.classList.remove('visible');
    });
    },
    onError: function(err) {
    console.error(err);
    alert('Error al procesar el pago. Inténtalo de nuevo.');
    }
}).render('#paypal-button-container');
}

// Inicializar carrito vacío
renderCarrito();