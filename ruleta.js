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
// ¡Actualizado para incluir COMODIN y COCHE!
let ruleta = [0, 25, 50, 75, 100, 150, 200, 300, "PIERDE TURNO", 400, 500, "QUIEBRA", 700, 800, 900, 1000, "COMODIN", "COCHE"];

// Creamos un objeto por cada jugador, donde almacenamos su puntuación general, y si es su turno o no.

// Jugador uno.
let jugadorUno = {
    puntuacion : 0,
    turno: true,
    tieneCoche: false, // ¡NUEVO! Controla si tiene el gajo COCHE
    tieneComodin: false, // ¡NUEVO! Controla si tiene el gajo COMODIN
};

// Jugador dos.
let jugadorDos = {
    puntuacion : 0,
    turno: false,
    tieneCoche: false, // ¡NUEVO!
    tieneComodin: false, // ¡NUEVO!
};

// Jugador tres.
let jugadorTres = {
    puntuacion : 0,
    turno: false,
    tieneCoche: false, // ¡NUEVO!
    tieneComodin: false, // ¡NUEVO!
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
        frase: "Recepcion Almacenamiento y Expedicion",
        pista: "Almacen",
        resuelto : false,
        letrasIntroducidas : [],
        puntuacionJugadorUno : 0,
        puntuacionJugadorDos : 0,
        puntuacionJugadorTres : 0
        
    },
    {
        frase: "Kaisen Kanban y 5S",
        pista: "Metodologias de optimizacion",
        resuelto : false,
        letrasIntroducidas : [],
        puntuacionJugadorUno : 0,
        puntuacionJugadorDos : 0,
        puntuacionJugadorTres : 0
    },
    {
        frase: "Cross docking Centralizado y Regional",
        pista: "Tipos de almacen",
        resuelto : false,
        letrasIntroducidas : [],
        puntuacionJugadorUno : 0,
        puntuacionJugadorDos : 0,
        puntuacionJugadorTres : 0
    },
    {
        frase: "cobertura obsolescancia y ruptura de stock",
        pista: "indicadores de almacen",
        resuelto : false,
        letrasIntroducidas : [],
        puntuacionJugadorUno : 0,
        puntuacionJugadorDos : 0,
        puntuacionJugadorTres : 0
    },

    {
        frase: "terrestres aereos y multimodales",
        pista: "tipos de transporte",
        resuelto : false,
        letrasIntroducidas : [],
        puntuacionJugadorUno : 0,
        puntuacionJugadorDos : 0,
        puntuacionJugadorTres : 0
    }
];

// Cargar paneles adicionales desde localStorage (agregados desde el panel de admin)
const panelesDelStorage = localStorage.getItem('panelesRuleta');
if (panelesDelStorage) {
    try {
        const panelesAdicionales = JSON.parse(panelesDelStorage);
        panelesObjeto = panelesObjeto.concat(panelesAdicionales);
    } catch (e) {
        console.error('Error al cargar paneles del almacenamiento:', e);
    }
}

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
                
                // Gajos de dinero
                if (typeof valor === 'number') {
                    // Se nos muestra el valor por el que vamos a jugar.
                    swal({
                        title: "Has caído en la casilla (" + valor + ")",
                        text: "Escribe una letra por: " + valor + "€",
                        icon: "info"
                    });
                } 
                // Gajo COMODIN
                else if (valor == "COMODIN") {
                    swal({
                        title: "¡Has ganado un COMODÍN!",
                        text: "Úsalo para no perder turno al fallar una consonante o para comprar una vocal gratis.",
                        icon: "success"
                    });
                    // Asignar el comodín al jugador actual
                    if (jugadorUno.turno) {
                        jugadorUno.tieneComodin = true;
                    } else if (jugadorDos.turno) {
                        jugadorDos.tieneComodin = true;
                    } else if (jugadorTres.turno) {
                        jugadorTres.tieneComodin = true;
                    }
                }
                // Gajo CERVEZA
                else if (valor == "CERVEZA") {
                    swal({
                        title: "¡Has caído en el mejor premio!",
                        text: "Si resuelves el panel, ¡te llevas una cervecita gratis (NIEVES PAGA)!",
                        icon: "success"
                    });
                    // Asignar el gajo CERVEZA al jugador actual
                    if (jugadorUno.turno) {
                        jugadorUno.tieneCoche = true;
                    } else if (jugadorDos.turno) {
                        jugadorDos.tieneCoche = true;
                    } else if (jugadorTres.turno) {
                        jugadorTres.tieneCoche = true;
                    }
                }
                // Gajo PIERDE TURNO
                else if (valor == "PIERDE TURNO") {
                    // El jugador pierde el turno.
                    swal({
                        title: "Has caído en pierde turno",
                        text: "Pierdes tu turno.",
                        icon: "error"
                    });
                    perder_turno();
                }
                // Gajo QUIEBRA
                else if (valor == "QUIEBRA") {
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
                let jugadorActual; // Variable para simplificar la lógica del comodín

                if (jugadorUno.turno) jugadorActual = jugadorUno;
                else if (jugadorDos.turno) jugadorActual = jugadorDos;
                else if (jugadorTres.turno) jugadorActual = jugadorTres;
        
                // Comprobamos si la letra ya se ha introducido previamente.
                for (let i = 0; i < panelesObjeto[panelAzar].letrasIntroducidas.length; i++) {
                    if (letra == panelesObjeto[panelAzar].letrasIntroducidas[i]) {
                        letraRepetida = true;
                    }
                }
    
                // Si se introduce una vocal, se perderá el turno (a menos que tenga comodín)
                if (letra == 'A' || letra == 'E' || letra == 'I' || letra == 'O' || letra == 'U') {
                    if (jugadorActual.tieneComodin) {
                        swal({
                            title: "¡COMODÍN usado!",
                            text: "No puedes usar una vocal, pero tu Comodín te salva de perder el turno.",
                            icon: "info"
                        });
                        jugadorActual.tieneComodin = false; // El comodín se gasta
                    } else {
                        swal({
                            title: "Pierdes tu turno",
                            text: "Las vocales sólo se pueden comprar.",
                            icon: "error"
                        });
                        perder_turno();
                    }
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
                        // Lógica del COMODÍN al fallar una consonante
                        if (jugadorActual.tieneComodin) {
                            swal({
                                title: "¡COMODÍN usado!",
                                text: "La ''" + letra + "'' no está. Tu Comodín evita que pierdas el turno.",
                                icon: "info"
                            });
                            jugadorActual.tieneComodin = false; // El comodín se gasta
                            ruletaTirada = true; // Permite tirar la ruleta de nuevo
                        } else {
                            swal({
                                title: "Has fallado",
                                text: "La ''" + letra + "'' no está en el panel. Pierdes tu turno.",
                                icon: "error"
                            });               
                            perder_turno();
                        }
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
                        // Lógica para el Gajo COCHE
                        if (jugadorUno.tieneCoche) {
                            swal({ title: "¡PREMIO CERVEZA!", text: "¡Has resuelto con el gajo Cerveza activo! ¡Te llevas una cervecita!", icon: "success" });
                            jugadorUno.tieneCoche = false; 
                        }
                    } else if (jugadorDos.turno) {
                        panelesObjeto[panelAzar].puntuacionJugadorDos += 500;
                        jugadorDos.puntuacion += panelesObjeto[panelAzar].puntuacionJugadorDos;
                        // Lógica para el Gajo COCHE
                        if (jugadorDos.tieneCoche) {
                            swal({ title: "¡PREMIO CERVEZA!", text: "¡Has resuelto con el gajo Cerveza activo! ¡Te llevas una cervecita!", icon: "success" });
                            jugadorDos.tieneCoche = false;
                        }
                    } else if (jugadorTres.turno) {
                        panelesObjeto[panelAzar].puntuacionJugadorTres += 500;
                        jugadorTres.puntuacion += panelesObjeto[panelAzar].puntuacionJugadorTres;
                        // Lógica para el Gajo COCHE
                        if (jugadorTres.tieneCoche) {
                            swal({ title: "¡PREMIO CERVEZA!", text: "¡Has resuelto con el gajo Cerveza activo! ¡Te llevas una cervecita!", icon: "success" });
                            jugadorTres.tieneCoche = false;
                        }
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

        let jugadorActual;
        if (jugadorUno.turno) jugadorActual = jugadorUno;
        else if (jugadorDos.turno) jugadorActual = jugadorDos;
        else if (jugadorTres.turno) jugadorActual = jugadorTres;
        
        // Verifica si tiene dinero SUFICIENTE o tiene el COMODÍN activo
        const tieneDinero = (jugadorUno.turno && panelesObjeto[panelAzar].puntuacionJugadorUno >= 1000) || 
                            (jugadorDos.turno && panelesObjeto[panelAzar].puntuacionJugadorDos >= 1000) || 
                            (jugadorTres.turno && panelesObjeto[panelAzar].puntuacionJugadorTres >= 1000);

        const comodinActivo = jugadorActual.tieneComodin;

        if (acierto && (tieneDinero || comodinActivo)) {
            
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
                        } else if (vocal == "U" && cadenaAuxiliar.charAt(i) == "Ú") { // Nota: Corregí "Á" por "Ú" aquí
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
                            // Se añade al array de letras introducidas SÓLO si es la primera vez que se pone la vocal
                            if (!panelesObjeto[panelAzar].letrasIntroducidas.includes(vocal)) {
                                panelesObjeto[panelAzar].letrasIntroducidas.push(vocal);
                            }
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
                        // El comodín NO salva si se compra vocal y se falla (regla del juego original)
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

                        let coste = 50 * contadorLetra;
                        let mensajeGasto = "";

                        // Se resta la cantidad de dinero corrspondiente (o se usa comodín)
                        if (comodinActivo) {
                            // Uso el comodín en lugar de gastar dinero
                            jugadorActual.tieneComodin = false; // Gasto el comodín
                            mensajeGasto = "Tu COMODÍN te ha permitido comprar esta vocal GRATIS.";
                        } else {
                            // Gasto dinero
                            if (jugadorUno.turno) {
                                panelesObjeto[panelAzar].puntuacionJugadorUno -= coste;
                            } else if (jugadorDos.turno) {
                                panelesObjeto[panelAzar].puntuacionJugadorDos -= coste;
                            } else if (jugadorTres.turno) {
                                panelesObjeto[panelAzar].puntuacionJugadorTres -= coste;
                            }
                            mensajeGasto = `Se te han restado ${coste}€ (50€ x ${contadorLetra}).`;
                        }

                        // Se muestra un mensaje indicando que se ha acertado y la cantidad de dinero que se pierde.
                        swal({
                            title: "Has acertado",
                            text: `La ''${vocal}'' está en el panel ${contadorLetra} veces.\n${mensajeGasto}`,
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
            // Si no se tiene suficiente dinero para comprar vocales O no se ha acertado una letra
            let mensaje;
            if (!acierto) {
                 mensaje = "Se debe acertar una letra antes de comprar vocal.";
            } else if (!tieneDinero && !comodinActivo) {
                 mensaje = "Debes tener 1000€ acumulados en este panel para comprar vocales (o el Comodín).";
            }

            swal({
                title: "No puedes comprar vocales",
                text: mensaje,
                icon: "info"
            });
            letrasDeFrente = true;
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