export async function notificarProveedor({ productoId, productoNombre, clienteNombre, clienteEmail }) {
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbxpG0urgeUP4MWsEnkXDR2uwsm_a3P-KVEZx--Z4Ho-LAlxTrjgdKBeL-uN7TE1Gtjr/exec'; // <-- Reemplaza con tu URL

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
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await res.json();

        if (json.link) {
            // Abrir el WhatsApp con el mensaje
            window.open(json.link, '_blank');
        } else {
            console.error('Error al obtener enlace de WhatsApp:', json.error);
        }
    } catch (err) {
        console.error('Error al contactar al script:', err);
    }
}
