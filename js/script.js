// Compare prima il timer e il resto sparisce, all'avvio dell'app immagino

// poi appaiono i campi di imput e spariscono i numeri allo scadere del timer

// ed infine compare la scritta dell'esito della partita una volta mandato invio

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
const numeriOutput = [];

let interval = null;
let generatiRandom = [];

invia.addEventListener("click", inviaDati);
inizia.addEventListener("click", start);

function mostraNumeri(){
    for(let i=0; i<numeri.length; i++){
        generatiRandom.push(Math.floor(Math.random() * 100) + 1);
    }
    numeriRandom.innerHTML = generatiRandom;
}
function nascondiNumeri(){

}


function inviaDati(event){
    event.preventDefault();
    for(let i=0; i<numeri.length; i++){
        numeriOutput.push(numeri[i].value);
    }
    console.log(numeriOutput)
}

function timer(event){
    if(interval!== null){
        return;
    }
    mostraNumeri();
    let counter = 30;
    interval = setInterval(function(){
        if(counter === 0){
            tempo.innerHTML = counter;
            clearInterval(interval);
            interval = null;
        }else{
            tempo.innerHTML = counter;
            counter--;
        }
    }, 1000);
}
function controllaNumeri(){
    for(let i=0; i<generatiRandom.length; i++){
        for(let j=0; j<numeriRandom.length; j++){
            
        }
    }
}

function start(event){
    event.preventDefault();
    timer();
}