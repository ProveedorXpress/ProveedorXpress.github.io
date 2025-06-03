export async function notificarProveedor({ productoId, productoNombre, clienteNombre, clienteEmail }) {
    const googleScriptUrl = '    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbxpG0urgeUP4MWsEnkXDR2uwsm_a3P-KVEZx--Z4Ho-LAlxTrjgdKBeL-uN7TE1Gtjr/exec'; // <-- Reemplaza con tu URL'; // Pega aquí la URL de tu Google Apps Script Web App

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
            window.open(json.link, '_blank');
        } else if (json.error) {
            console.error('Error desde Apps Script:', json.error);
        } else {
            console.error('Respuesta inesperada:', json);
        }
    } catch (err) {
        console.error('Error al contactar al script:', err);
    }
}
