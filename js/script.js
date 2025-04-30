// Compare prima il timer e il resto sparisce, all'avvio dell'app immagino

// poi appaiono i campi di imput e spariscono i numeri allo scadere del timer

// ed infine compare la scritta dell'esito della partita una volta mandato invio
/*
nascondere roba, fare il controllo, e il reset
*/

/*
indicazione
*/

const numeri = [
    document.getElementById("num-1"),
    document.getElementById("num-2"),
    document.getElementById("num-3"),
    document.getElementById("num-4"),
    document.getElementById("num-5")
]
const output = document.getElementById("punteggio");
const tempo = document.getElementById("timer");
const numeriRandom = document.getElementById("numeri");
const invia = document.getElementById("conferma");
const inizia = document.getElementById("start");
const containerNumeri = document.getElementsByClassName("containerNumeri");
const outputContainer = document.getElementsByClassName("outputContainer");
const pulsante = document.getElementsByClassName("pulsante");


//invia.addEventListener("click", inviaDati);
inizia.addEventListener("click", start);
invia.addEventListener("click", inviaDati);

// variabili ed array da usare nel programma
const generatiRandom = [];
const numeriUtente = [];
const soluzioni = [];
let interval = null;


function start(event){
    // aggiungere un bel reset generale
    event.preventDefault();
    timer();
}
function generaMostraRandom(){
    for(let i=0; i<5; i++){
        generatiRandom.push(Math.floor(Math.random() * 100) + 1);
    }
    numeriRandom.innerHTML = generatiRandom.join(",");
}
function timer(){
    if(interval!== null){
        return;
    }
    generaMostraRandom();
    let counter = 5;
    interval = setInterval(function(){
        if(counter === 0){
            tempo.innerHTML = counter;
            clearInterval(interval);
            interval = null;
            containerNumeri.classList.remove("d-none");
            containerNumeri.classList.add("d-flex")
            pulsante.classList.remove("d-none");
            pulsante.classList.add("d-block")
        }else{
            tempo.innerHTML = counter+"s";
            counter--;
        }
    }, 1000);
}
function salvaNumeri(){
    for(let i=0; i<numeri.length; i++){
        numeriUtente.push(parseInt(numeri[i].value));
    }
}
function controllaNumeri(){
    for(let i=0; i<generatiRandom.length; i++){
        for(let j=0; j<numeriUtente.length; j++){
            if(numeriUtente[j] === generatiRandom[i]){
                soluzioni.push(numeriUtente[j]);
                break;
            }
        }
    }
}

function inviaDati(event){
    event.preventDefault();
    salvaNumeri();
    controllaNumeri();
    console.log(soluzioni);
    output.innerHTML = "Hai indovinato: " + soluzioni.join(", ");
}