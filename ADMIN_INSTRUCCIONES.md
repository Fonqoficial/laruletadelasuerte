# Instrucciones - Panel de Administrador

## Cómo agregar nuevas frases automáticamente

### Proceso automatizado:

1. **Abre el archivo `admin.html`** en tu navegador
2. **Completa los campos del formulario:**
   - **Frase**: Ingresa la palabra o frase que quieres que aparezca en la ruleta
   - **Pista**: Ingresa la pista que ayudará a los jugadores a adivinar
3. **Haz clic en "Agregar Frase"**
4. **La frase se agregará automáticamente** a la lista de frases de la ruleta

### Características:

✅ **Sin necesidad de editar archivos manualmente**
✅ **Los datos se guardan automáticamente en el navegador** (localStorage)
✅ **Las frases se cargan automáticamente cuando inicias la ruleta** en `index.html`
✅ **Puedes eliminar frases** desde el mismo panel de admin
✅ **Interfaz amigable y fácil de usar**
✅ **Sistema de backup y restauración de frases**

### Cómo funciona internamente:

- Las frases se almacenan en el `localStorage` del navegador (sin servidor necesario)
- Cuando abres `index.html` para jugar, automáticamente carga:
  - Las frases por defecto (predefinidas en `ruleta.js`)
  - Las frases que hayas agregado desde el panel de admin
- Todas las frases se mezclan y aparecen aleatoriamente en la ruleta

### Estructura de cada frase agregada:

```javascript
{
    frase: "Tu frase aquí",
    pista: "Tu pista aquí",
    resuelto: false,
    letrasIntroducidas: [],
    puntuacionJugadorUno: 0,
    puntuacionJugadorDos: 0,
    puntuacionJugadorTres: 0
}
```

## Sistema de Backup y Restauración

Para evitar perder tus frases si se limpia el historial o cache del navegador, ahora tienes un sistema de **exportación e importación**:

### Descargar Backup 📥

1. Ve a la sección **"Backup y Restauración"** en el panel de admin
2. Haz clic en **"Descargar Backup"**
3. Se descargará un archivo `backup_ruleta_YYYY-MM-DD.json` con todas tus frases
4. **Guarda este archivo en un lugar seguro** (Drive, OneDrive, tu computadora, etc.)

### Restaurar desde Archivo 📤

1. Si necesitas recuperar tus frases (por ejemplo, después de limpiar el cache):
2. Ve a la sección **"Backup y Restauración"** en el panel de admin
3. Haz clic en **"Restaurar desde Archivo"**
4. Selecciona el archivo `backup_ruleta_*.json` que descargaste anteriormente
5. Confirma que deseas importar las frases
6. ¡Tus frases se restaurarán automáticamente!

### Recomendaciones:

✅ **Descarga un backup regularmente** después de agregar nuevas frases
✅ **Guarda los backups en la nube** (Google Drive, OneDrive, Dropbox, etc.)
✅ **Nombra los backups por fecha** para saber cuál es el más reciente
✅ Mantén **al menos 2-3 copias** en diferentes lugares

### Notas importantes:

ℹ️ Los datos se guardan localmente en el navegador (localStorage)
ℹ️ Puedes tener ilimitadas frases agregadas
ℹ️ El sistema de backup es **100% local** - no se envía a ningún servidor
ℹ️ Los archivos de backup son simples archivos JSON que puedes ver y editar si lo necesitas


