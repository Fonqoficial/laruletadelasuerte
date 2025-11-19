// Esta variable nos va a servir para almacenar el valor por el que se va a jugar una vez se tira la ruleta.
let valor = 0;
// Este variable almacena el número de tiradas de la ruleta.
let numeroTirada = 0;
// Esta variable nos ayuda para saber si el panel se ha completado o no.
let completo = false;
// Variable que nos sirve para contar los paneles que se han jugado.
let numeroPaneles = 1;
// Variable que determina si la partida se ha empezado o no.
let partidaEmpezada = false;
// Variable que almacena las letras que se han mostrado.
let letrasMostradas;
// Variable que determina si la ruleta se ha tirado o no.
let ruletaTirada = false;
// Variable que cuenta las letras que se han puesto de frente.
let letrasDeFrente = false;
// Variable que indica si una vocal se ha comprado ya o no.
let compradoVocal = false;
// Variable que indica si una vocal se introduce por segunda vez o no.
let vocalRepetida = false;
// Variable que determina si se ha acertado al introducir una letra o no.
let acierto = false;
// Variable que cuenta las letras.
let contadorLetra = 0;

// En este array almacenamos los valores que tiene la ruleta.
let ruleta = [0, 100, 200, "PIERDE TURNO", 400, 500, "QUIEBRA", 700, 800, 900];

// Creamos un objeto por cada jugador, donde almacenamos su puntuación general, y si es su turno o no.

// Jugador uno.
let jugadorUno = {
    puntuacion : 0,
    turno: true,
};

// Jugador dos.
let jugadorDos = {
    puntuacion : 0,
    turno: false,
};

// Jugador tres.
let jugadorTres = {
    puntuacion : 0,
    turno: false,
};

// Cuando es el turno de un jugador determinado, su card sobresalta al tener un borde más pronunciado que los otros dos.
if (jugadorUno.turno) {
    document.getElementById("jugadorUno").style.border = "5px solid #0d60c7";
    document.getElementById("jugadorDos").style.border = "2px solid #6a6d6f74";
    document.getElementById("jugadorTres").style.border = "2px solid #6a6d6f74";
} else if (jugadorDos.turno) {
    document.getElementById("jugadorDos").style.border = "5px solid #ba2b39";
    document.getElementById("jugadorUno").style.border = "2px solid #6a6d6f74";
    document.getElementById("jugadorTres").style.border = "2px solid #6a6d6f74";
} else if (jugadorTres.turno) {
    document.getElementById("jugadorTres").style.border = "5px solid #e2bd01";
    document.getElementById("jugadorUno").style.border = "2px solid #6a6d6f74";
    document.getElementById("jugadorDos").style.border = "2px solid #6a6d6f74";
}

// En eset array de objetos almacenamos cada panel de la ruleta. En ellos tenemos la frase, el , si está resuelto o no, las letras que se han introducido, y las puntuaciones de cada jugador en dicho panel.
let panelesObjeto = [
    {
        frase : "Lector de codigo de barras",
        pista: "Producto identificado",
        resuelto : false,
        letrasIntroducidas : [],
        puntuacionJugadorUno : 0,
        puntuacionJugadorDos : 0,
        puntuacionJugadorTres : 0        
    } ,
    {
        frase: "Recepcion, Almacenamiento y Expedicion",
        pista: "Almacen",
        resuelto : false,
        letrasIntroducidas : [],
        puntuacionJugadorUno : 0,
        puntuacionJugadorDos : 0,
        puntuacionJugadorTres : 0
        
    },
    {
        frase: "Kaisen, Kanban y 5S",
        pista: "Metodologias de optimizacion",
        resuelto : false,
        letrasIntroducidas : [],
        puntuacionJugadorUno : 0,
        puntuacionJugadorDos : 0,
        puntuacionJugadorTres : 0
    }
]

// De esta manera, cada vez que se inicia una partida o se comienza un nuevo panel, éste se genera de forma aleatoria.
let panelAzar = Math.floor(Math.random() * panelesObjeto.length);
let cadena = panelesObjeto[panelAzar].frase.toUpperCase();
let longitudCadena = cadena.length;

// Mostramos el número de paneles que se llevan jugados.
document.getElementById("numeroPanel").innerHTML = "Panel número: " + numeroPaneles;

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
document.getElementById("pista").innerHTML = panelesObjeto[panelAzar].pista;

// Mostramos la puntuación de cada jugador.
document.getElementById("puntuacionJugadorUno").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorUno + " €";
document.getElementById("puntuacionJugadorDos").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorDos + " €";
document.getElementById("puntuacionJugadorTres").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorTres + " €";

// Función que se ejecuta al tirar la ruleta.
function tira_ruleta() {
    // De esta forma, si la ruleta se ha tirado ya, no podemos volverla a tirar hasta que se muestre una letra o se pase de turno.
    if (!ruletaTirada) {
        if (letrasDeFrente || !partidaEmpezada) {
            // Actualizamos el estado de algunas variables.
            letrasMostradas = 0;
            letrasDeFrente = false;
            partidaEmpezada = true;
            ruletaTirada = true;
            acierto = false;
            // Estilos del botón tirar de la ruleta.
            document.getElementById("tirar").style.backgroundColor = "#565b62";
            document.getElementById("tirar").style.border = "1px solid #c2c4c7";
            document.getElementById("tirar").style.color = "#c2c4c7";
            // Estilos del resto de botones.
            document.getElementById("escribir").removeAttribute("style");
            document.getElementById("comprar").removeAttribute("style");
            document.getElementById("resolver").removeAttribute("style");

            // Si aún no se ha resuelto el panel.
            if (completo == false) { 
                numeroTirada++; 
                document.getElementById("tirada").innerHTML = "Número de tiradas: " + numeroTirada;
                // De esta forma obtenemos el valor por el que vamos a jugar en esta tirada.
                let codigo = Math.floor(Math.random() * ruleta.length); 
                valor = ruleta[codigo]; 
                if (valor != "PIERDE TURNO" && valor != "QUIEBRA") {
                    // Se nos muestra el valor por el que vamos a jugar.
                    swal({
                        title: "Has caído en la casilla (" + valor + ")",
                        text: "Escribe una letra por: " + valor + "€",
                        icon: "info"
                    });
                }
                if (valor == "PIERDE TURNO") {
                    // El jugador pierde el turno.
                    swal({
                        title: "Has caído en pierde turno",
                        text: "Pierdes tu turno.",
                        icon: "error"
                    });
                    perder_turno();
                }
                if (valor == "QUIEBRA") {
                    // Si caemos en 'Bancarrota', nuestra puntuación en este panel pasa a ser 0, se nos indica así y perdemos turno.
                    if (jugadorUno.turno) {
                        panelesObjeto[panelAzar].puntuacionJugadorUno = 0;
                    } else if (jugadorDos.turno) {
                        panelesObjeto[panelAzar].puntuacionJugadorDos = 0;
                    } else if (jugadorTres.turno) {
                        panelesObjeto[panelAzar].puntuacionJugadorTres = 0;
                    }
                    swal({
                        title: "Has caído en bancarrota",
                        text: "Pierdes el dinero acumulado en este panel.",
                        icon: "error"
                    });
                    perder_turno();
                }
            }
        } else {
            swal({
                title: "No puedes hacer esto",
                text: "Deben mostrarse todas las letras que han sido acertadas.",
                icon: "warning"
            });
        }
    } else {
        swal({
            title: "No puedes hacer esto",
            text: "No puedes tirar la ruleta más de una vez sin elegir una letra.",
            icon: "warning"
        });
    }
}

// Función que se ejecuta para escribir una letra.
function escribir_letra() {
    if (ruletaTirada) {
        ruletaTirada = false;
        // Estilos del botón 'Escribir letra'.
        document.getElementById("escribir").style.backgroundColor = "#565b62";
        document.getElementById("escribir").style.border = "1px solid #c2c4c7";
        document.getElementById("escribir").style.color = "#c2c4c7";
        document.getElementById("tirar").removeAttribute("style");
        document.getElementById("comprar").removeAttribute("style");
        document.getElementById("resolver").removeAttribute("style");

        // Si el panel no está resuelto todavía.
        if (completo == false) { 
            let aux = ""; 
            // Pedimos una letra al jugador.
            swal({
                title: "Escribe una letra",
                icon: "info",
                content: "input",
            })
            .then((letra) => {
                let letraRepetida = false;
                letra = letra.toUpperCase();
        
                // Comprobamos si la letra ya se ha introducido previamente.
                for (let i = 0; i < panelesObjeto[panelAzar].letrasIntroducidas.length; i++) {
                    if (letra == panelesObjeto[panelAzar].letrasIntroducidas[i]) {
                        letraRepetida = true;
                    }
                }
    
                // Si se introduce una vocal, se perderá el turno.
                if (letra == 'A' || letra == 'E' || letra == 'I' || letra == 'O' || letra == 'U') {
                    swal({
                        title: "Pierdes tu turno",
                        text: "Las vocales sólo se pueden comprar.",
                        icon: "error"
                    });
                    perder_turno();
                } else if (!letraRepetida) {
                    // De esta forma hacemos que la letra acertada se añada a nuestra cadena auxiliar.
                    for (let i = 0; i < longitudCadena; i++) {          
                        if (cadenaAuxiliar.charAt(i) == letra) { 
                            aux = aux + letra; 
                            acierto = true; 
                        } else if (cadenaAuxiliar.charAt(i) == " ") { 
                            aux = aux + " "; 
                        } else {
                            aux = aux + nuevaCadena.charAt(i); 
                        }
                    }
    
                    // De esta forma actualizamos el panel, resaltando las letras que se han acertado, para que el usuario les dé la vuelta.
                    contadorEspacios = 0;
                    for (let i = 0; i < panelesCadena.length; i++) {
                        if (aux.charAt(i) != " " && aux.charAt(i) != "?" && aux.charAt(i) == letra) {
                            panelesCadena[i] = "<div id='" + i + "' class='letraAcertada' onclick='darLaVuelta(this.id)'>" + aux.charAt(i)  + "</div>";
                        } else if (aux.charAt(i) != " " && aux.charAt(i) != "?" && !panelesCadena[i].search('frente')) {
                            panelesCadena[i] = "<div class='letraReves'>" + aux.charAt(i)  + "</div>";                        
                        } else if (aux.charAt(i) === " ") {
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
                        
                    // Si la letra no está contenida en el panel.
                    if (acierto == false) { 
                        swal({
                            title: "Has fallado",
                            text: "La ''" + letra + "'' no está en el panel. Pierdes tu turno.",
                            icon: "error"
                        });               
                        perder_turno();
                    } else {
                        contadorLetra = 0;
                        // Contamos las veces que aparece la letra acertada en el panel.
                        for (let i = 0; i < cadena.length; i++) {
                            if (cadena[i] == letra) {
                                contadorLetra++;
                            }
                        }
                        // Añadimos la letra acertada al array de letras introducidas, para controlar que no se vuelva a introducir.
                        panelesObjeto[panelAzar].letrasIntroducidas.push(letra);
                        
                        // Actualizamos las puntuaciones de los jugadores.
                        if (jugadorUno.turno) {
                            panelesObjeto[panelAzar].puntuacionJugadorUno = panelesObjeto[panelAzar].puntuacionJugadorUno + (valor * contadorLetra);
                        } else if (jugadorDos.turno) {
                            panelesObjeto[panelAzar].puntuacionJugadorDos = panelesObjeto[panelAzar].puntuacionJugadorDos + (valor * contadorLetra);
                        } else if (jugadorTres.turno) {
                            panelesObjeto[panelAzar].puntuacionJugadorTres = panelesObjeto[panelAzar].puntuacionJugadorTres + (valor * contadorLetra);
                        }
                        // Indicamos que se ha acertado y la cuantía que se obtiene según las veces que aparece la letra en el panel.
                        swal({
                            title: "Has acertado",
                            text: "La ''" + letra + "'' está en el panel " + contadorLetra + " veces.\nHas sumado " + (valor * contadorLetra) + "€  (" + valor + "€ x " + contadorLetra + ").",
                            icon: "success"
                        });
                    }
            
                    // Actualizamos el panel.
                    textoArray = panelesCadena.join("");
                    document.getElementById("texto").innerHTML = textoArray;
                    document.getElementById("puntuacionJugadorUno").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorUno + " €";
                    document.getElementById("puntuacionJugadorDos").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorDos + " €";
                    document.getElementById("puntuacionJugadorTres").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorTres + " €";
    
                    nuevaCadena = aux;
            
                    let numero_interrogantes = 0;
                    for (let i = 0; i < longitudCadena; i++) {
                        if (aux.charAt(i) == "?") {
                            numero_interrogantes++;
                        }
                    }
                    // Si se completa el panel.
                    if (numero_interrogantes == 0) {
                        completo = true;
                        swal({
                            title: "Enhorabuena, ¡has resuelto el panel!",
                            text: "¡Has sumado 500€!",
                            icon: "success"
                        });
                    }
                } else {
                    // Si la letra introducida ya está en el panel.
                    swal({
                        title: "Pierdes tu turno",
                        text: "La letra que has introducido ya está en el panel.",
                        icon: "error"
                    });
                    perder_turno();
                }
            });
        } else {
            // Mensaje si se resuelve el panel.
            swal({
                title: "Enhorabuena, ¡has resuelto el panel!",
                text: "¡Has sumado 500€!",
                icon: "success"
            });
        }
    } else {
        // Aviso de que hay que tirar la ruleta antes de escribir una letra.
        swal({
            title: "¡Atención!",
            text: "Debes tirar la ruleta antes de escribir una letra.",
            icon: "warning"
        });
    }
}

// Función que se ejecuta al resolver el panel.
function resolver_panel() {
    if (letrasDeFrente || !partidaEmpezada) {
        // Actualizamos los estilos de los botones.
        document.getElementById("tirar").removeAttribute("style");
        document.getElementById("escribir").removeAttribute("style");
        document.getElementById("comprar").removeAttribute("style");
        document.getElementById("resolver").style.backgroundColor = "#565b62";
        document.getElementById("resolver").style.border = "1px solid #c2c4c7";
        document.getElementById("resolver").style.color = "#c2c4c7";

        if (acierto == true) {
            // Pedimos la cadena al jugador.
            swal("Escribe a continuación la frase del panel:", {
                title: "Has decidido resolver el panel",
                icon: "info",
                content: "input",
            })
            .then((solucion) => {
                solucion = solucion.toUpperCase();
                // Si la cadena introducida coincide con el panel.
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
        
                    if (jugadorUno.turno) {
                        panelesObjeto[panelAzar].puntuacionJugadorUno += 500;
                        jugadorUno.puntuacion += panelesObjeto[panelAzar].puntuacionJugadorUno;
                    } else if (jugadorDos.turno) {
                        panelesObjeto[panelAzar].puntuacionJugadorDos += 500;
                        jugadorDos.puntuacion += panelesObjeto[panelAzar].puntuacionJugadorDos;
                    } else if (jugadorTres.turno) {
                        panelesObjeto[panelAzar].puntuacionJugadorTres += 500;
                        jugadorTres.puntuacion += panelesObjeto[panelAzar].puntuacionJugadorTres;
                    }
                    swal({
                        title: "Enhorabuena, ¡has resuelto el panel!",
                        text: "¡Has sumado 500€!",
                        icon: "success"
                    });
                    panelesObjeto[panelAzar].resuelto = true;
                    document.getElementById("puntuacionJugadorUno").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorUno + " €";
                    document.getElementById("puntuacionJugadorDos").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorDos + " €";
                    document.getElementById("puntuacionJugadorTres").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorTres + " €";
        
                } else if (solucion != cadena) {
                    // Si se introduce una cadena errónea.
                    swal({
                        title: "Has fallado",
                        text: "La respuesta no es correcta. Pierdes tu turno.",
                        icon: "error"
                    });
                    perder_turno();
                }
            });  
        } else {
            swal({
                title: "No puedes hacer esto",
                text: "Debes acertar una letra antes para resolver el panel.",
                icon: "warning"
            });
        }
    } else {
        swal({
            title: "No puedes hacer esto",
            text: "Deben mostrarse todas las letras que han sido acertadas.",
            icon: "warning"
        });
    }
}

// Función que sirve para iniciar otro panel.
function iniciar_otro_panel() {
    if (completo == true) {
        // Actualizamos el estilo del botón de resolver el panel.
        document.getElementById("resolver").removeAttribute("style");
        // Incrementamos el número de paneles jugados.
        numeroPaneles++;
        document.getElementById("numeroPanel").innerHTML = "Panel número: " + numeroPaneles;
        // De esta forma evitamos que el panel se vuelva a repetir.
        let menosPaneles = panelesObjeto.splice(panelAzar, 1);
        // Volvemos a generar y mostrar otro panel.
        panelAzar = Math.floor(Math.random() * menosPaneles.length);
        completo = false;
        cadena = panelesObjeto[panelAzar].frase.toUpperCase();
        longitudCadena = cadena.length;
        
        document.getElementById("pista").innerHTML = panelesObjeto[panelAzar].pista;
        document.getElementById("puntuacionJugadorUno").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorUno + " €";
        document.getElementById("puntuacionJugadorDos").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorDos + " €";
        document.getElementById("puntuacionJugadorTres").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorTres + " €";

        document.getElementById("numeroPanel").innerHTML = "Panel número: " + numeroPaneles;

        cadenaAuxiliar = cadena; 
        nuevaCadena = ""; 
        panelesCadena = Array.from(cadenaAuxiliar);

        for (let i = 0; i < longitudCadena; i++) {
            let caracter = cadenaAuxiliar.charAt(i); 
            if (caracter != " ") {  
                nuevaCadena = nuevaCadena + "?";
            } else {      
                nuevaCadena = nuevaCadena + " "; 
            }
        }

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

        let textoArray = panelesCadena.join("");
        document.getElementById("texto").innerHTML = textoArray;
    } else {
        swal({
            title: "No puedes hacer esto",
            text: "Debes completar un panel para iniciar otro.",
            icon: "warning"
        });
    }
}

function perder_turno() {
    // Actualizamos los estilos de los botones.
    document.getElementById("tirar").removeAttribute("style");
    document.getElementById("escribir").removeAttribute("style");
    document.getElementById("comprar").removeAttribute("style");
    document.getElementById("resolver").removeAttribute("style");
    acierto = false;
    ruletaTirada = false;
    letrasDeFrente = true;

    // Dependiendo de quien pierde el turno, otro jugador lo consigue.
    if (jugadorUno.turno) {
        jugadorUno.turno = false;
        jugadorDos.turno = true;
        document.getElementById("puntuacionJugadorUno").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorUno + " €";
        document.getElementById("puntuacionJugadorDos").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorDos + " €";
        document.getElementById("puntuacionJugadorTres").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorTres + " €";

    } else if (jugadorDos.turno) {
        jugadorDos.turno = false;
        jugadorTres.turno = true;
        document.getElementById("puntuacionJugadorUno").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorUno + " €";
        document.getElementById("puntuacionJugadorDos").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorDos + " €";
        document.getElementById("puntuacionJugadorTres").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorTres + " €";

    } else if (jugadorTres.turno) {
        jugadorTres.turno = false;
        jugadorUno.turno = true;
        document.getElementById("puntuacionJugadorUno").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorUno + " €";
        document.getElementById("puntuacionJugadorDos").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorDos + " €";
        document.getElementById("puntuacionJugadorTres").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorTres + " €";
    }

    // Dependiendo de quien sea el turno, se actualizan los estilos de los cards de los jugadores.
    if (jugadorUno.turno) {
        document.getElementById("jugadorUno").style.border = "5px solid #0d60c7";
        document.getElementById("jugadorDos").style.border = "2px solid #6a6d6f74";
        document.getElementById("jugadorTres").style.border = "2px solid #6a6d6f74";
    } else if (jugadorDos.turno) {
        document.getElementById("jugadorDos").style.border = "5px solid #ba2b39";
        document.getElementById("jugadorUno").style.border = "2px solid #6a6d6f74";
        document.getElementById("jugadorTres").style.border = "2px solid #6a6d6f74";
    } else if (jugadorTres.turno) {
        document.getElementById("jugadorTres").style.border = "5px solid #e2bd01";
        document.getElementById("jugadorUno").style.border = "2px solid #6a6d6f74";
        document.getElementById("jugadorDos").style.border = "2px solid #6a6d6f74";
    }
}

// Función que nos muestra el dinero acumulado de cada jugador en todos los paneles.
function mostrar_acumulado() {
    // Sólo se puede mostrar si el panel que se está jugando ha sido resuelto.
    if (panelesObjeto[panelAzar].resuelto) {
        swal({
            title: "Dinero acumulado",
            text: 'El dinero acumulado por los jugadores es:\n1 - Jugador 1: ' + jugadorUno.puntuacion + '€\n2 - Jugador 2: ' + jugadorDos.puntuacion + '€\n3 - Jugador 3: ' + jugadorTres.puntuacion + '€',
            icon: "info"
        });
    } else {
        swal({
            title: "No puedes hacer esto",
            text: "Sólo se muestra el acumulado si se ha resuelto el panel.",
            icon: "warning"
        });
    }
}

// Función que permite comprar una vocal.
function comprar_vocal() {
    if (letrasDeFrente || !partidaEmpezada) {
        // Actualizamos los estilos de los botones.
        document.getElementById("comprar").style.backgroundColor = "#565b62";
        document.getElementById("comprar").style.border = "1px solid #c2c4c7";
        document.getElementById("comprar").style.color = "#c2c4c7";
        document.getElementById("tirar").removeAttribute("style");
        document.getElementById("escribir").removeAttribute("style");
        if (acierto) {
            if (jugadorUno.turno && panelesObjeto[panelAzar].puntuacionJugadorUno >= 1000 || jugadorDos.turno && panelesObjeto[panelAzar].puntuacionJugadorDos >= 1000 || jugadorTres.turno && panelesObjeto[panelAzar].puntuacionJugadorTres >= 1000) {
                letrasDeFrente = false;
                letrasMostradas = 0;
                compradoVocal = true;
                vocalRepetida = false;
                let aux = ""; 
                let acierto = false;
                // Pedimos la cadena al jugador.
                swal({
                    title: "Escribe una vocal",
                    icon: "info",
                    content: "input",
                })
                .then((vocal) => {
                    vocal = vocal.toUpperCase();
                    // Se comprueba si la vocal ya se ha introducido.
                    for (let i = 0; i < panelesObjeto[panelAzar].letrasIntroducidas.length; i++) {
                        if (vocal == panelesObjeto[panelAzar].letrasIntroducidas[i]) {
                            vocalRepetida = true;
                        }
                    }
                    // Se genera un nuevo panel con las vocales que se aciertan, para que se les dé la vuelta.
                    if (!vocalRepetida && (vocal == "A" || vocal == "E" || vocal == "I" || vocal == "O" || vocal == "U")) {
                        contadorLetra = 0;
                        for (let i = 0; i < longitudCadena; i++) { 
                            if (cadenaAuxiliar.charAt(i) == vocal) { 
                                aux = aux + vocal; 
                                acierto = true; 
                            } else if (cadenaAuxiliar.charAt(i) == " ") { 
                                aux = aux + " "; 
                            } else if (vocal == "A" && cadenaAuxiliar.charAt(i) == "Á") {
                                aux = aux + "Á";
                                acierto = true;
                                contadorLetra++;
                                panelesCadena[i] = "<div id='" + i + "' class='letraAcertada' onclick='darLaVuelta(this.id)'>" + cadenaAuxiliar.charAt(i)  + "</div>";
                                panelesObjeto[panelAzar].letrasIntroducidas.push(vocal);
                            } else if (vocal == "E" && cadenaAuxiliar.charAt(i) == "É") {
                                aux = aux + "É";
                                acierto = true;
                                contadorLetra++;
                                panelesCadena[i] = "<div id='" + i + "' class='letraAcertada' onclick='darLaVuelta(this.id)'>" + cadenaAuxiliar.charAt(i)  + "</div>";
                                panelesObjeto[panelAzar].letrasIntroducidas.push(vocal);
                            } else if (vocal == "I" && cadenaAuxiliar.charAt(i) == "Í") {
                                aux = aux + "Í";
                                acierto = true;
                                contadorLetra++;
                                panelesCadena[i] = "<div id='" + i + "' class='letraAcertada' onclick='darLaVuelta(this.id)'>" + cadenaAuxiliar.charAt(i)  + "</div>";
                                panelesObjeto[panelAzar].letrasIntroducidas.push(vocal);
                            } else if (vocal == "O" && cadenaAuxiliar.charAt(i) == "Ó") {
                                aux = aux + "Ó";
                                acierto = true;
                                contadorLetra++;
                                panelesCadena[i] = "<div id='" + i + "' class='letraAcertada' onclick='darLaVuelta(this.id)'>" + cadenaAuxiliar.charAt(i)  + "</div>";
                                panelesObjeto[panelAzar].letrasIntroducidas.push(vocal);
                            } else if (vocal == "U" && cadenaAuxiliar.charAt(i) == "Á") {
                                aux = aux + "Ú";
                                acierto = true;
                                contadorLetra++;
                                panelesCadena[i] = "<div id='" + i + "' class='letraAcertada' onclick='darLaVuelta(this.id)'>" + cadenaAuxiliar.charAt(i)  + "</div>";
                                panelesObjeto[panelAzar].letrasIntroducidas.push(vocal);
                            } else {
                                aux = aux + nuevaCadena.charAt(i);
                            }
                        }
            
                        contadorEspacios = 0;
                        for (let i = 0; i < panelesCadena.length; i++) {
                            if (aux.charAt(i) != " " && aux.charAt(i) != "?" && aux.charAt(i) == vocal) {
                                panelesCadena[i] = "<div id='" + i + "' class='letraAcertada' onclick='darLaVuelta(this.id)'>" + cadenaAuxiliar.charAt(i)  + "</div>";
                                panelesObjeto[panelAzar].letrasIntroducidas.push(vocal);
                            } else if (aux.charAt(i) != " " && aux.charAt(i) != "?" && !panelesCadena[i].search('frente')) {
                                panelesCadena[i] = "<div class='letraReves'>" + aux.charAt(i)  + "</div>";                        
                            } else if (aux.charAt(i) === " ") {
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
                            
                        // Una vez acabo de recorrer la cadena completa para saber si mi letra estaba o no.
                        if (acierto == false) { // Si no está la letra muestro el mensaje correspondiente.
                            swal({
                                title: "Has fallado",
                                text: "La ''" + vocal + "'' no está en el panel. Pierdes tu turno.",
                                icon: "error"
                            });                
                            perder_turno();
                        } else {
                            // Se cuentan las vocales acertadas.
                            for (let i = 0; i < cadena.length; i++) {
                                if (cadena[i] == vocal) {
                                    contadorLetra++;
                                }
                            }
                            // Se resta la cantidad de dinero corrspondiente por el número de vocales acertadas.
                            if (jugadorUno.turno) {
                                panelesObjeto[panelAzar].puntuacionJugadorUno = panelesObjeto[panelAzar].puntuacionJugadorUno - (50 * contadorLetra);
                            } else if (jugadorDos.turno) {
                                panelesObjeto[panelAzar].puntuacionJugadorDos = panelesObjeto[panelAzar].puntuacionJugadorDos - (50 * contadorLetra);
                            } else if (jugadorTres.turno) {
                                panelesObjeto[panelAzar].puntuacionJugadorTres = panelesObjeto[panelAzar].puntuacionJugadorTres - (50 * contadorLetra);
                            }
    
                            // Se muestra un mensaje indicando que se ha acertado y la cantidad de dinero que se pierde.
                            swal({
                                title: "Has acertado",
                                text: "La ''" + vocal + "'' está en el panel " + contadorLetra + " veces.\nSe te han restado " + (50 * contadorLetra) + "€  (50€ x " + contadorLetra + ")",
                                icon: "success"
                            });
    
                            // Se actualizan las puntuaciones de los jugadores.
                            document.getElementById("puntuacionJugadorUno").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorUno + " €";
                            document.getElementById("puntuacionJugadorDos").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorDos + " €";
                            document.getElementById("puntuacionJugadorTres").innerHTML = panelesObjeto[panelAzar].puntuacionJugadorTres + " €";
                        }
                
                        textoArray = panelesCadena.join("");
                        document.getElementById("texto").innerHTML = textoArray;
                
                        let numero_interrogantes = 0;
                        for (let i = 0; i < longitudCadena; i++) {
                            if (aux.charAt(i) == "?") {
                                numero_interrogantes++;
                            }
                        }
                        if (numero_interrogantes == 0) {
                            completo = true;
                            swal({
                                title: "Enhorabuena, ¡has resuelto el panel!",
                                text: "¡Has sumado 500€!",
                                icon: "success"
                            });
                            panelesObjeto[panelAzar].resuelto = true;
                        }
                    } else if (vocal != "A" && vocal != "E" && vocal && "I" && vocal != "O" && vocal != "U"){
                        // Si se introduce una consonante.
                        swal({
                            title: "Has fallado",
                            text: "La letra que has introducido no es una vocal. Pierdes tu turno.",
                            icon: "error"
                        });
                        perder_turno(); 
                    } else {
                        // Si la vocal introducida ya está en el panel.
                        swal({
                            title: "Has fallado",
                            text: "La letra que has introducido ya está en el panel. Pierdes tu turno.",
                            icon: "error"
                        });
                        perder_turno();
                    } 
                });
            } else {
                // Si no se tiene suficiente dinero para comprar vocales.
                swal({
                    title: "No puedes comprar vocales",
                    text: "Debes tener 1000€ acumulados en este panel.",
                    icon: "info"
                });
                letrasDeFrente = true;
            }
        } else {
            letrasDeFrente = true;
            swal({
                title: "No puedes hacer esto",
                text: "Se debe acertar una letra antes de comprar vocal.",
                icon: "info"
            });
        }
    } else {
        swal({
            title: "No puedes hacer esto",
            text: "Deben mostrarse todas las letras que han sido acertadas.",
            icon: "info"
        });
    }
}

// Función que permite al jugador dar la vuelta a una letra que ha sido previamente acertada.
function darLaVuelta(identificador) {
    let elemento = document.getElementById(identificador);
    elemento.classList.toggle('letraFrente');

    for (let i = 0; i < panelesCadena.length; i++) {
        if (i == identificador) {
            panelesCadena[i] = "<div class='letraFrente'>" + cadenaAuxiliar[i]  + "</div>";
            letrasMostradas++;
        }
    }

    if ((letrasMostradas == contadorLetra) && contadorLetra > 0) {
        letrasDeFrente = true;
    }

    textoArray = panelesCadena.join("");
    document.getElementById("texto").innerHTML = textoArray;
}
