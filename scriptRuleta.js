let ultimasCasillas = [];
let contadorVerde = 0;
let contadorSinBait = 0; // Nuevo contador para llevar la cuenta de los turnos sin "bait"
let coins = 0;
let limiteCoins = 0;
let intervaloEnCurso = false;
var rondasApuestaBait = 1;
var coinsIniciales = coins;

function iniciarGiroRuleta() {
    if (intervaloEnCurso) {
        return;
    }

    intervaloEnCurso = true;

    const intervalo = setInterval(() => {
        var elemCoins = document.querySelector('[class="currency-value ng-star-inserted"]');
        coins = elemCoins.innerText;

        const contadorValor = parseFloat(document.querySelector('[data-test="roulette-roll-values"]').innerText);

        if ((contadorValor >= 14.00) && (contadorValor <= 14.99)) {
            clearInterval(intervalo);
            const resultado = obtenerResultadoRuleta();
            guardarResultado(resultado);
            contarRachas(resultado);

            // Incrementar el contador si no es "bait", reiniciar si es "bait"
            

            console.log('Color:', resultado);
            console.log('Racha de verdes:', contadorVerde);
            console.log('Racha sin bait:', contadorSinBait);
            console.log('---------------------------------');

            // Reiniciar el proceso después de cada giro
            intervaloEnCurso = false;
            iniciarGiroRuleta();

            // Comprobar si se alcanzó el contador de turnos sin "bait"
            
        }
    }, 1000);
}


// Función para realizar la apuesta "bait" (deberás implementar esta función)
function apuestaBait() {
    if(rondasApuestaBait == 1){
        coinsIniciales = coins;
    }
    
    var aInicial = 0.01;

    console.log('Apuesta: ', apuestaaa(aInicial));

    hacerApuestaBait(apuestaaa(aInicial));

    
}

async function introducirValor(cajaApuestas, cantidad) {
    for (let i = 0; i < cantidad.length; i++) {
        await sleep(Math.random() * 0.2); 
        cajaApuestas.value += cantidad[i];
        console.log(cantidad[i]);
    }
}

async function hacerApuestaBait(a) {
    
        var cajaApuestas = document.querySelector('input[data-test="bet-amount-input-fields"]');

        await introducirValor(cajaApuestas, a);
        await sleep(Math.random() * 0.5); 

    var botonBobo = document.querySelector('.mat-focus-indicator.mat-button-3d.mat-flat-button.mat-button-base.mat-bait.gt-sm');
    var botonPlaceBet = botonBobo.querySelector('.mat-ripple.mat-button-ripple');
    if (botonPlaceBet) {
        await sleep(Math.random() * 0.5);
        botonPlaceBet.click();
    }

}

function apuestaaa(a) {

    while (coins - a + (a * 7) <= coinsIniciales) {
        a += 0.01;
    }

    console.log('Apuesta: ', a);
    console.log('Coins Iniciales: ', coinsIniciales);
    console.log('Coins: ', coins);

    return a;
}


function obtenerResultadoRuleta() {

    var divElement = document.querySelector('.rolls');
    var primerElemento = divElement.querySelector('a');
    var bait = primerElemento.innerHTML;
    var clase = primerElemento.className;

    var color;
    if (clase.includes('bg-green')) {
        color = 'verde';
    } else if (clase.includes('bg-red')) {
        color = 'rojo';
        if(bait.includes('bait')){
            color = 'bait'
        }
    } else if (clase.includes('bg-black')) {
        color = 'negro';
        if(bait.includes('bait')){
            color = 'bait'
        }
    } else {
        color = 'desconocido'; 
    }

    return color;
}

function guardarResultado(resultado) {
    ultimasCasillas.unshift(resultado);
    if (ultimasCasillas.length > 10) {
        ultimasCasillas.pop();
    }
}

function contarRachas(color) {
    switch (color) {

        case 'negro':
            contadorVerde = 0;
            contadorSinBait++;
            break;
        case 'rojo':
            contadorVerde = 0;
            contadorSinBait++;
            break;
        case 'verde':
            contadorVerde++;
            contadorSinBait++;
            break;
        case 'bait':
            contadorVerde = 0;
            contadorSinBait = 0;
            rondasApuestaBait = 1;
            coinsIniciales = 0;
            break;

    }

    if (contadorVerde === 2) {
        notificarRacha(color, 2);
        if(comprobarCondiciones()){
            hacerApuestaJackpot();
        }
    }

    if (contadorSinBait >= 10) {
        apuestaBait();
        rondasApuestaBait++;
    }
    
}

async function hacerApuestaJackpot() {
    if (comprobarCondiciones()) {
        var cajaApuestas = document.querySelector('input[data-test="bet-amount-input-fields"]');

        if ((coins - limiteCoins) < 16) {
            await realizarApuesta(cajaApuestas, 0.5);
        } else {
            await realizarApuesta(cajaApuestas, 1);
        }
    }

    var botonBobo = document.querySelector('.mat-focus-indicator.mat-button-3d.mat-flat-button.mat-button-base.mat-green.gt-sm');
    var botonPlaceBet = botonBobo.querySelector('.mat-ripple.mat-button-ripple');
    if (botonPlaceBet) {
        botonPlaceBet.click();
    }
}


async function realizarApuesta(cajaApuestas, cantidad) {

    await sleep(Math.random() * 0.5);
    cajaApuestas.click();
    await sleep(Math.random() * 0.5);
    cajaApuestas.value = '';
    await sleep(Math.random() * 0.5);
    cajaApuestas.value = cantidad;
    await sleep(Math.random() * 0.5);

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms * 1000));
}


function comprobarCondiciones() {

    var boteElemento = document.querySelector('.jackpot-total.cw-pretty-balance.span[data-test="value"]');
    
    if (boteElemento) {

        var bote = parseFloat(boteElemento.textContent.replace(',', '').trim()); 
        var b = false;

        if (bote > 30000) {
            b = true;
        }

        return b;
    } 
}

function notificarRacha(color, cantidad) {
    const nombre = "¡Racha!";
    const mensaje = "Racha de : " + cantidad + " " + color + ".";
    const notificacion = new Notification(nombre, { body: mensaje });
}

iniciarGiroRuleta();
