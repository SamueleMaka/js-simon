// Dichiarazione degli array di elementi HTML tramite gli id degli input
const numeri = [
    document.getElementById("num-1"),
    document.getElementById("num-2"),
    document.getElementById("num-3"),
    document.getElementById("num-4"),
    document.getElementById("num-5")
];

// Elementi HTML per la visualizzazione dei punteggi, timer e numeri casuali
const output = document.getElementById("punteggio");
const tempo = document.getElementById("timer");
const numeriRandom = document.getElementById("numeri");
const invia = document.getElementById("conferma");
const inizia = document.getElementById("start");
const containerNumeri = document.getElementById("containerNumeri");
const outputContainer = document.getElementById("outputContainer");
const pulsante = document.getElementsByClassName("pulsante");

// Aggiunta degli event listeners ai pulsanti
inizia.addEventListener("click", start); // Avvia il gioco
invia.addEventListener("click", inviaDati); // Invio dei dati una volta che l'utente ha completato il gioco

// Variabili per memorizzare i numeri generati casualmente, numeri inseriti dall'utente e soluzioni
const generatiRandom = [];
const numeriUtente = [];
const soluzioni = [];
let interval = null; // Variabile per gestire l'intervallo del timer

// Funzione che resetta lo stato del gioco e nasconde le informazioni relative
function resetGioco(){
    invia.style.display = "none"; // Nasconde il bottone "invia"
    outputContainer.style.display = "none"; // Nasconde il contenitore dell'output
    containerNumeri.style.display = "none"; // Nasconde il contenitore dei numeri da inserire

    generatiRandom.length = 0; // Resetta l'array dei numeri generati
    numeriUtente.length = 0; // Resetta l'array dei numeri inseriti dall'utente
    soluzioni.length = 0; // Resetta l'array delle soluzioni

    numeri.forEach(input => input.value = ""); // Pulisce i campi di input
    invia.style.display = "none"; // Rende invisibile il bottone "invia"
    outputContainer.style.display = "none"; // Rende invisibile il contenitore dell'output
    containerNumeri.style.display = "none"; // Rende invisibile il contenitore dei numeri
    tempo.style.display = "block"; // Mostra il timer
    inizia.style.display = "none"; // Nasconde il pulsante "inizia"
    numeriRandom.style.display = "block"; // Mostra il contenitore dei numeri casuali
    output.innerHTML = ""; // Pulisce l'output del punteggio
    numeriRandom.innerHTML = ""; // Pulisce i numeri casuali mostrati
}

// Funzione che avvia il gioco, resettando prima e poi avviando il timer
function start(event){
    resetGioco();
    event.preventDefault();
    timer(); // Inizia il timer
}

// Funzione per generare e mostrare 5 numeri casuali tra 1 e 100
function generaMostraRandom(){
    for(let i=0; i<5; i++){
        generatiRandom.push(Math.floor(Math.random() * 100) + 1); // Aggiunge un numero casuale tra 1 e 100 all'array
    }
    numeriRandom.innerHTML = generatiRandom.join(","); // Mostra i numeri casuali come stringa separata da virgole
}

// Funzione che gestisce il timer
function timer(){
    if(interval !== null){
        return; // Se c'è già un intervallo attivo, non ne avvia un altro
    }
    generaMostraRandom(); // Genera e mostra i numeri casuali
    let counter = 5; // Imposta il contatore iniziale
    interval = setInterval(function(){
        if(counter === 0){ // Quando il timer raggiunge 0
            tempo.innerHTML = counter; // Mostra 0 come tempo rimanente
            clearInterval(interval); // Ferma l'intervallo
            interval = null; // Resetta la variabile dell'intervallo
            containerNumeri.style.display = "flex"; // Mostra i campi di input per i numeri
            invia.style.display = "block"; // Mostra il bottone per inviare i dati
            tempo.style.display = "none"; // Nasconde il timer
            inizia.style.display = "none"; // Nasconde il bottone "inizia"
            numeriRandom.style.display = "none"; // Nasconde i numeri casuali
        } else {
            tempo.innerHTML = counter + "s"; // Mostra il tempo rimanente con "s"
            counter--; // Decrementa il contatore
        }
    }, 1000); // Imposta il timer per un aggiornamento ogni secondo
}

// Funzione per salvare i numeri inseriti dall'utente
function salvaNumeri(){
    for(let i=0; i<numeri.length; i++){
        numeriUtente.push(parseInt(numeri[i].value)); // Converte il valore degli input in numeri interi e li salva nell'array
    }
}

// Funzione che confronta i numeri inseriti dall'utente con quelli generati casualmente
function controllaNumeri(){
    for(let i=0; i<generatiRandom.length; i++){
        for(let j=0; j<numeriUtente.length; j++){
            if(numeriUtente[j] === generatiRandom[i]){ // Se un numero dell'utente corrisponde a un numero generato
                soluzioni.push(numeriUtente[j]); // Aggiungi il numero all'array delle soluzioni
                break; // Esci dal ciclo interno non appena trovi una corrispondenza
            }
        }
    }
}

// Funzione che invia i dati e mostra il risultato del gioco
function inviaDati(event){
    event.preventDefault();
    salvaNumeri(); // Salva i numeri inseriti dall'utente
    controllaNumeri(); // Confronta i numeri inseriti con quelli generati
    console.log(soluzioni); // Logga i numeri corretti trovati
    outputContainer.style.display = "block"; // Mostra il contenitore del punteggio
    output.innerHTML = "Hai indovinato: " + soluzioni.join(", "); // Mostra i numeri corretti indovinati
    inizia.style.display = "block"; // Mostra il bottone "inizia" per ricominciare
}
