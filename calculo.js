calculo();

function calculo() {

    var coins = 700;

    var semanas = 27;

    for (let i = 0; i < semanas; i++) {

        coins = coins * 1.03;

        if ((i === 4) || (i === 8) || (i === 12) || (i === 16) || (i === 20) || (i === 24)) {
            coins = coins + 100;
        }

        if (i === 7) {
            coins = coins + 200;
        }

        console.log("Semana: " + i + " / Coins: " + coins);

    }

    console.log(coins); 

}
