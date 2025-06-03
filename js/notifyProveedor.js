export async function notificarProveedor({ productoId, productoNombre, clienteNombre, clienteEmail }) {
  const backendUrl = 'https://mi-backend.onrender.com/notificar'; // <-- Cambia a tu URL real

  try {
    const res = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productoId, productoNombre, clienteNombre, clienteEmail })
    });

    const json = await res.json();

    if (json.success) {
      console.log('Notificación enviada:', json.data);
    } else {
      console.error('Error en backend:', json.error);
    }
  } catch (err) {
    console.error('Error al llamar backend:', err);
  }
}
