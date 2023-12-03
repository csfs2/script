
calculo();

function calculo() {
    var coinsActual = 131;
    var coinsInicial = 131;

    for (var i = 0; i < 100; i++) {
        var apuesta = 0.01;

        coinsActual = parseFloat(coinsActual.toFixed(2));
        apuesta = parseFloat(apuesta.toFixed(2));


        while (((coinsActual - apuesta) + (apuesta * 14)) <= coinsInicial.toFixed(2)) {
            apuesta += 0.01;
        }

        coinsActual -= apuesta;

        // Simular la ruleta solo en la última ronda
        var ma = parseFloat(coinsActual.toFixed(2));
        var aa = parseFloat((apuesta * 14).toFixed(2));
        var ganancia = (ma + aa);

        console.log("Ronda " + (i + 1) + ": Apuesta = " + apuesta.toFixed(2) + ", Monedas restantes = " + coinsActual.toFixed(2) + ", Ganancias = " + ganancia);

    }
}
