// Esta variable nos va a servir para almacenar el valor por el que se va a jugar una vez se tira la ruleta.
let valor = 0;
// Este variable almacena el número de tiradas de la ruleta.
let numeroTirada = 0;
// Esta variable nos ayuda para saber si el panel se ha completado o no.
let completo = false;
// Variable que determina si la partida se ha empezado o no.
let partidaEmpezada = false;
// Array que almacena las posiciones de la cadena que se van generando de forma aleatoria.
let posicionesCadena = [];
// Variable para almacenar una posición al azar.
let posicionAzar = 0;
// Variable que hace referencia a una celda al azar.
let celdaAzar = 0;
// Array que almacena los tiempos que se generan para mostrar cada letra.
let cronometros = [];
// Contador de letras de frente.
let contadorFrente = 0;
// Variable que indica si la prueba de velocidad ha sido iniciada.
let iniciadaPrueba = false;
// Variable que indica si la prueba de velocidad ha sido finalizada.
let pruebaFinalizada = true;
// Variable que indica si se ha parado la prueba de velocidad.
let parar = false;

// Estilo del card del 'Jugador Velocidad'.
document.getElementById("jugadorVelocidad").style.border = "5px solid #00b138";

// En eset array de objetos almacenamos cada panel de la ruleta. En ellos tenemos la frase, el , si está resuelto o no, las letras que se han introducido, y las puntuaciones de cada jugador en dicho panel.
let panelesObjeto = [
    {
        frase : "Lector de codigo de barras",
        pista: "Producto identificado",
        resuelto : false,
        puntuacionJugadorVelocidad: 0       
    } ,        
    {
        frase: "Recepcion, Almacenamiento y Expedicion",
        pista: "Almacen",
        resuelto : false,
        puntuacionJugadorVelocidad: 0
    },
    {
        frase: "Kaisen, Kanban y 5S",
        pista: "Metodologias de optimizacion",
        resuelto : false,
        puntuacionJugadorVelocidad: 0
    }
]

// De esta manera, cada vez que se inicia una partida o se comienza un nuevo panel, éste se genera de forma aleatoria.
let panelAzar = Math.floor(Math.random() * panelesObjeto.length);
let cadena = panelesObjeto[panelAzar].frase.toUpperCase();
let longitudCadena = cadena.length;

// De esta forma creamos la cadena auxiliar que nos va a servir para crear y mostrar el panel.
let cadenaAuxiliar = cadena; 
let nuevaCadena = ""; 
let panelesCadena = Array.from(cadenaAuxiliar);

for (let i = 0; i < longitudCadena; i++) { 
    let caracter = cadenaAuxiliar.charAt(i); 
    if (caracter != " ") {  
        nuevaCadena = nuevaCadena + "?";
    } else {
        nuevaCadena = nuevaCadena + " "; 
    }
}

// De esta forma construímos el panel para que se muestre de una forma más estética.
let contadorEspacios = 0;
for (let i = 0; i < panelesCadena.length; i++) {
    if (panelesCadena[i] != " ") {
        panelesCadena[i] = "<div class='letraReves'>" + nuevaCadena[i]  + "</div>";
    } else if (panelesCadena[i] === " ") {
        panelesCadena[i] = "</div><div class='espacio'>-</div><div class='palabra'>";
        contadorEspacios++;
    }
    if (contadorEspacios == 3) {
        panelesCadena[i] += "<br>";
        contadorEspacios = 0;
    }
    if (i == 0) {
        panelesCadena[0] = "<div class='palabra'>" + panelesCadena[0];
    }
    if (i == (panelesCadena.length - 1)) {
        panelesCadena[(panelesCadena.length - 1)] = panelesCadena[(panelesCadena.length - 1)] + "</div>";
    }
}

// Mostramos de esta forma el panel y su pista.
let textoArray = panelesCadena.join("");
document.getElementById("texto").innerHTML = textoArray;

// Mostramos la puntuación del jugador.
document.getElementById("pista").innerHTML = panelesObjeto[panelAzar].pista;
document.getElementById("puntuacionJugadorVelocidad").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorVelocidad + " €";

// Para mostrar la fecha del día actual.
const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);

document.getElementById("fecha").innerHTML = "(" + hoy.toLocaleDateString() + ")";

// Función que comienza la prueba de velocidad.
function prueba_velocidad() {
    if (!iniciadaPrueba) {
        iniciadaPrueba = true;
        for (let i = 0; i < panelesCadena.length; i++) {
            if (cadena.charAt(i) != " ") {
                posicionesCadena.push(i);              
            }
        }
        for (let i = 0; i < panelesCadena.length && !parar; i++) {
            // Los caracteres que son espacios toman este estilo.
            if (cadena.charAt(i) == " ") {
                panelesCadena[i] = "<div class='espacio'>-</div>";
                contadorEspacios++;              
            }
            if (contadorEspacios == 3) {
                panelesCadena[i] += "<br>";
                contadorEspacios = 0;
            }
            if (i == 0) {
                panelesCadena[0] = "<div class='palabra'>" + panelesCadena[0];
            }
            if (i == (panelesCadena.length - 1)) {
                panelesCadena[(panelesCadena.length - 1)] = panelesCadena[(panelesCadena.length - 1)] + "</div>";
            }
            // De esta forma se van cambiando los estilos y el contenido de las celdas para mostrar las letras.
            cronometros.push(setTimeout(() => {
                posicionAzar = Math.floor(Math.random() * (posicionesCadena.length - 0));
                i = posicionesCadena[posicionAzar];
                if (cadena.charAt(i) != " ") {
                    panelesCadena[i] = "<div class='letraFrente'>" + cadena.charAt(i)  + "</div>";
                    contadorFrente++;
                    if (contadorFrente == (panelesObjeto[panelAzar].frase.length)) {
                        swal({
                            title: "Has perdido",
                            text: "Se han mostrado todas las letras.",
                            icon: "error"
                        });
                        iniciadaPrueba = false;
                    }
                }
                posicionesCadena.splice(posicionAzar, 1);
    
                textoArray = panelesCadena.join("");
                document.getElementById("texto").innerHTML = textoArray;
            }, i * 1000));
        }
    } else {
        swal({
            title: "Error",
            text: "No puedes volver a iniciar la prueba.",
            icon: "error"
        });
    }
}

// Función que permite parar la prueba de velocidad.
function parar_resolver() {
    if (iniciadaPrueba) {
        for (let i = 0; i < cronometros.length; i++) {
            clearTimeout(cronometros[i]);
        }
        // Pedimos la cadena al jugador.
        swal("Escribe a continuación la frase del panel:", {
            title: "Has decidido resolver el panel",
            icon: "info",
            content: "input",
        })
        .then((solucion) => {
            solucion = solucion.toUpperCase();
            if (solucion == cadena) {
                completo = true;
        
                contadorEspacios = 0;
                for (let i = 0; i < panelesCadena.length; i++) {
                    if (cadenaAuxiliar.charAt(i) != " " && cadenaAuxiliar.charAt(i) != "?") {
                        panelesCadena[i] = "<div id='" + i + "' class='letraFrente'>" + cadenaAuxiliar.charAt(i)  + "</div>";                 
                    } else if (cadenaAuxiliar.charAt(i) === " ") {
                        panelesCadena[i] = "</div><div class='espacio'>-</div><div class='palabra'>";
                        contadorEspacios++;
                    }
                    if (contadorEspacios == 3) {
                        panelesCadena[i] += "<br>";
                        contadorEspacios = 0;
                    }
                }
        
                textoArray = panelesCadena.join("");
                document.getElementById("texto").innerHTML = textoArray;
        
                panelesObjeto[panelAzar].puntuacionJugadorVelocidad += 500;
        
                swal({
                    title: "Enhorabuena, ¡has resuelto el panel!",
                    text: "¡Has sumado 500€!",
                    icon: "success"
                });
                panelesObjeto[panelAzar].resuelto = true;
                completo = true;
                document.getElementById("puntuacionJugadorVelocidad").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorVelocidad + " €";
                iniciadaPrueba = false;
        
            } else if (solucion != cadena) {
                swal({
                    title: "Has fallado",
                    text: "La respuesta no es correcta.",
                    icon: "error"
                });
                for (let i = 0; i < panelesCadena.length && !parar; i++) {
                    if (cadena.charAt(i) == " ") {
                        panelesCadena[i] = "<div class='espacio'>-</div>";               
                    }
                    cronometros.push(setTimeout(() => {
                        posicionAzar = Math.floor(Math.random() * (posicionesCadena.length - 0));
                        i = posicionesCadena[posicionAzar];
                        if (cadena.charAt(i) != " ") {
                            panelesCadena[i] = "<div class='letraFrente'>" + cadena.charAt(i)  + "</div>";
                            contadorFrente++;
                            if (contadorFrente == (panelesObjeto[panelAzar].frase.length)) {
                                swal({
                                    title: "Has perdido",
                                    text: "Se han mostrado todas las letras.",
                                    icon: "error"
                                });
                                iniciadaPrueba = false;
                                completo = true;
                            }
                        }
                        posicionesCadena.splice(posicionAzar, 1);
            
                        textoArray = panelesCadena.join("");
                        document.getElementById("texto").innerHTML = textoArray;
                    }, i * 1000));
                }
            }
        });
    } else {
        swal({
            title: "No puedes pulsar este botón",
            text: "La prueba todavía no ha comenzado.",
            icon: "warning"
        });
    }
}