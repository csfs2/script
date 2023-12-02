let ultimasCasillas = [];

let contadorNegras = 0;
let contadorRojas = 0;
let contadorVerde = 0;

let recordNegro = 8;
let recordRojo = 8;

// Variable para llevar el conteo de turnos sin cada color
let turnosSinNegro = 0;
let turnosSinRojo = 0;
let turnosSinVerde = 0;

// Variables para los récords sin color
let recordSinNegro = 8;
let recordSinRojo = 8;
let recordSinVerde = 50;

let coins = 0; 
let limiteCoins = 150;

// Función para simular el giro de la ruleta después de 15 segundos
function iniciarGiroRuleta() {
    const intervalo = setInterval(() => {

        var elemCoins = document.querySelector('[class="currency-value ng-star-inserted"]')
        coins = elemCoins.innerText;
        // Obtener el valor del contador
        const contadorValor = parseFloat(document.querySelector('[data-test="roulette-roll-values"]').innerText);

        // Verificar si el contador ha alcanzado el umbral deseado (por ejemplo, 14.00)
        if ((contadorValor >= 14.00) && (contadorValor <= 14.99)) {
            clearInterval(intervalo); // Detener el intervalo
            const resultado = obtenerResultadoRuleta();
            guardarResultado(resultado);
            contarRachas(resultado);
            contarRachasSinColor(resultado);
            console.log(coins);
            iniciarGiroRuleta(); // Reiniciar el proceso después de cada giro
        }
    }, 1000); // Intervalo de 1 segundo
}

// Función para obtener el resultado de la ruleta
function obtenerResultadoRuleta() {
    // Obtén el div por su clase
    var divElement = document.querySelector('.rolls');

    // Obtén el primer elemento <a> dentro del div
    var primerElemento = divElement.querySelector('a');

    // Obtén la clase del primer elemento <a>
    var clase = primerElemento.className;

    // Crea una nueva variable llamada color y asígnale el color correspondiente
    var color;
    if (clase.includes('bg-green')) {
        color = 'verde';
    } else if (clase.includes('bg-red')) {
        color = 'rojo';
    } else if (clase.includes('bg-black')) {
        color = 'negro';
    } else {
        color = 'desconocido'; // Manejo de caso no previsto
    }

    // Accede a cualquier propiedad o realiza operaciones con la nueva variable color
    console.log('Color:', color);

    return color;
}

// Función para guardar el resultado en el historial de últimas casillas
function guardarResultado(resultado) {
    ultimasCasillas.unshift(resultado);
    if (ultimasCasillas.length > 10) {
        ultimasCasillas.pop();
    }
}

// Función para contar las rachas de colores
function contarRachas(color) {
    switch (color) {
        case 'negro':
            contadorNegras++;
            contadorRojas = 0;
            contadorVerde = 0;
            if (contadorNegras > recordNegro) {
                recordNegro = contadorNegras;
                notificarRacha(color, recordNegro);
            }
            break;
        case 'rojo':
            contadorRojas++;
            contadorNegras = 0;
            contadorVerde = 0;
            if (contadorRojas > recordRojo) {
                recordRojo = contadorRojas;
                notificarRacha(color, recordRojo);
            }
            break;
        case 'verde':
            contadorVerde++;
            contadorNegras = 0;
            contadorRojas = 0;
            break;
    }

    // Avisar cuando haya una racha de verde de 2
    if (contadorVerde === 2) {
        notificarRacha(color, 2);

        if(comprobarCondiciones()){
            hacerApuestaJackpot();
        }

    }
}

function hacerApuestaJackpot() {

    if((coins - limiteCoins) < 16) {
        // Apuesta 0.5
    }

    else {
        // Apuesta 1
    }

}

function comprobarCondiciones() {

    var bote = document.querySelector('[]');
    var b = false;

    if(bote > 50000) {
        b = true;
    }

    return b;

}

// Función para enviar la notificación
function notificarRacha(color, cantidad) {
    const nombre = "¡Racha!";
    const mensaje = "Racha de : " + cantidad + " " + color + ".";
    const notificacion = new Notification(nombre, { body: mensaje });
}

function contarRachasSinColor(color) {
    switch (color) {
        case 'negro':
            turnosSinNegro = 0;
            turnosSinRojo++;
            turnosSinVerde++;
            // Verificar si se rompió el récord sin negro
            if (turnosSinRojo > recordSinRojo) {
                recordSinRojo = turnosSinRojo;
                notificarRachaSinColor('rojo', recordSinRojo);
            }
            else if (turnosSinVerde > recordSinVerde) {
                recordSinVerde = turnosSinVerde;
                notificarRachaSinColor('verde', recordSinVerde);
            }
            break;
        case 'rojo':
            turnosSinRojo = 0;
            turnosSinNegro++;
            turnosSinVerde++;
            // Verificar si se rompió el récord sin rojo
            if (turnosSinNegro > recordSinNegro) {
                recordSinNegro = turnosSinNegro;
                notificarRachaSinColor('negro', recordSinNegro);
            }
            else if (turnosSinVerde > recordSinVerde) {
                recordSinVerde = turnosSinVerde;
                notificarRachaSinColor('verde', recordSinVerde);
            }
            break;
        case 'verde':
            turnosSinVerde = 0;
            turnosSinNegro++;
            turnosSinRojo++;
            // Verificar si se rompió el récord sin verde
            if (turnosSinNegro > recordSinNegro) {
                recordSinNegro = turnosSinNegro;
                notificarRachaSinColor('negro', recordSinNegro);
            }
            else if (turnosSinRojo > recordSinRojo) {
                recordSinRojo = turnosSinRojo;
                notificarRachaSinColor('rojo', recordSinRojo);
            }
            break;
    }
}

// Función para enviar la notificación de racha sin color
function notificarRachaSinColor(color, record) {
    const nombre = "¡Racha Sin " + color.charAt(0).toUpperCase() + color.slice(1) + "!";
    const mensaje = "Racha SIN " + color + ". Nuevo récord: " + record + " turnos.";
    const notificacion = new Notification(nombre, { body: mensaje });
}

// Iniciar el proceso de la ruleta
iniciarGiroRuleta();
