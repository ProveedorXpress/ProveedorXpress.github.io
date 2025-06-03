export async function notificarProveedor({ productoId, productoNombre, clienteNombre, clienteEmail }) {
  const googleScriptUrl = 'TU_URL_DE_GOOGLE_SCRIPT_PUBLICADA';

  const datos = {
    productoId,
    productoNombre,
    clienteNombre,
    clienteEmail
  };

  try {
    const res = await fetch(googleScriptUrl, {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: { 'Content-Type': 'application/json' }
    });

    const json = await res.json();

    if (json.success) {
      console.log('Email enviado correctamente al cliente.');
    } else if (json.error) {
      console.error('Error en Apps Script:', json.error);
    } else {
      console.error('Respuesta inesperada:', json);
    }
  } catch (err) {
    console.error('Error al contactar al script:', err);
  }
}
