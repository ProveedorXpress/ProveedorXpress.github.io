export async function notificarProveedor({ productoId, productoNombre, clienteNombre, clienteEmail }) {
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbxpG0urgeUP4MWsEnkXDR2uwsm_a3P-KVEZx--Z4Ho-LAlxTrjgdKBeL-uN7TE1Gtjr/exec'; // Pega aquí tu URL real

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

        const texto = await res.text(); // Como el servidor devuelve solo texto
        console.log('Respuesta del servidor:', texto);
    } catch (err) {
        console.error('Error al contactar al script:', err);
    }
}
