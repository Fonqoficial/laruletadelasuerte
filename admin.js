// Clave para almacenar los paneles en localStorage
const STORAGE_KEY = 'panelesRuleta';

// Función para obtener los paneles del localStorage
function obtenerPaneles() {
    const paneles = localStorage.getItem(STORAGE_KEY);
    return paneles ? JSON.parse(paneles) : [];
}

// Función para guardar los paneles en localStorage
function guardarPaneles(paneles) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(paneles));
}

// Función para mostrar mensajes
function mostrarMensaje(tipo, texto) {
    const successDiv = document.getElementById('successMessage');
    const errorDiv = document.getElementById('errorMessage');
    
    if (tipo === 'success') {
        successDiv.textContent = texto;
        successDiv.style.display = 'block';
        errorDiv.style.display = 'none';
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 3000);
    } else {
        errorDiv.textContent = texto;
        errorDiv.style.display = 'block';
        successDiv.style.display = 'none';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000);
    }
}

// Función para crear un nuevo panel
function crearNuevoPanel(frase, pista) {
    return {
        frase: frase,
        pista: pista,
        resuelto: false,
        letrasIntroducidas: [],
        puntuacionJugadorUno: 0,
        puntuacionJugadorDos: 0,
        puntuacionJugadorTres: 0
    };
}

// Función para agregar un nuevo panel
function agregarPanel(frase, pista) {
    if (!frase.trim() || !pista.trim()) {
        mostrarMensaje('error', 'Por favor completa todos los campos');
        return false;
    }

    const paneles = obtenerPaneles();
    const nuevoPanelito = crearNuevoPanel(frase, pista);
    paneles.push(nuevoPanelito);
    guardarPaneles(paneles);
    mostrarMensaje('success', 'Frase agregada correctamente');
    return true;
}

// Función para eliminar un panel
function eliminarPanel(index) {
    if (confirm('¿Estás seguro de que deseas eliminar esta frase?')) {
        const paneles = obtenerPaneles();
        paneles.splice(index, 1);
        guardarPaneles(paneles);
        mostrarMensaje('success', 'Frase eliminada correctamente');
        mostrarPaneles();
    }
}

// Función para mostrar todos los paneles en la página
function mostrarPaneles() {
    const paneles = obtenerPaneles();
    const panelesList = document.getElementById('panelesList');
    
    if (paneles.length === 0) {
        panelesList.innerHTML = '<p style="color: #999;">No hay frases agregadas aún.</p>';
        return;
    }

    panelesList.innerHTML = '';
    paneles.forEach((panel, index) => {
        const panelDiv = document.createElement('div');
        panelDiv.className = 'panel-item';
        panelDiv.innerHTML = `
            <p class="frase">${panel.frase}</p>
            <p class="pista"><strong>Pista:</strong> ${panel.pista}</p>
            <button type="button" class="delete-btn" onclick="eliminarPanel(${index})">Eliminar</button>
        `;
        panelesList.appendChild(panelDiv);
    });
}

// Función para exportar los paneles a un archivo JSON
function exportarPaneles() {
    const paneles = obtenerPaneles();
    
    if (paneles.length === 0) {
        mostrarMensaje('error', 'No hay frases para exportar');
        return;
    }

    const backup = {
        fecha: new Date().toLocaleString('es-ES'),
        cantidad: paneles.length,
        paneles: paneles
    };

    const dataStr = JSON.stringify(backup, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = `backup_ruleta_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);
    
    mostrarMensaje('success', `Backup descargado: ${paneles.length} frases guardadas`);
}

// Función para importar paneles desde un archivo JSON
function importarPaneles() {
    document.getElementById('importFile').click();
}

// Función para procesar el archivo importado
function procesarArchivoImportado(event) {
    const archivo = event.target.files[0];
    
    if (!archivo) {
        return;
    }

    const lector = new FileReader();
    lector.onload = function(e) {
        try {
            const contenido = JSON.parse(e.target.result);
            
            // Validar que sea un backup válido
            if (!contenido.paneles || !Array.isArray(contenido.paneles)) {
                throw new Error('Formato de archivo inválido');
            }

            // Confirmar antes de importar
            if (confirm(`¿Deseas importar ${contenido.paneles.length} frases? Esto reemplazará las frases actuales.`)) {
                guardarPaneles(contenido.paneles);
                mostrarMensaje('success', `Se importaron ${contenido.paneles.length} frases correctamente`);
                mostrarPaneles();
            }
        } catch (error) {
            mostrarMensaje('error', `Error al importar: ${error.message}`);
        }
    };
    lector.readAsText(archivo);
    
    // Limpiar el input para permitir seleccionar el mismo archivo otra vez
    event.target.value = '';
}

// Event listeners cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar paneles existentes
    mostrarPaneles();

    // Formulario para agregar panel
    const form = document.getElementById('addPanelForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const frase = document.getElementById('frase').value;
            const pista = document.getElementById('pista').value;
            
            if (agregarPanel(frase, pista)) {
                form.reset();
                mostrarPaneles();
            }
        });
    }

    // Botón de limpiar
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            document.getElementById('addPanelForm').reset();
        });
    }

    // Botón de exportar
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportarPaneles);
    }

    // Botón de importar
    const importBtn = document.getElementById('importBtn');
    if (importBtn) {
        importBtn.addEventListener('click', importarPaneles);
    }

    // Input file para importar
    const importFile = document.getElementById('importFile');
    if (importFile) {
        importFile.addEventListener('change', procesarArchivoImportado);
    }
});

// Función antigua para compatibilidad (no se usa)
function añadir_panel(params) {
    console.log("Usa el formulario en la página de admin.html");
}

