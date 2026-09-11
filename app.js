var prompt = require('prompt-sync')();
const trips = require('./data');


//--------2. Les trajets------------

//------3.Afficher les trajets---------

function AffichageTrajet() {
    console.log("=== TRAJETS DISPONIBLES ===");

    for (let trajet of trips) {
        console.log("");
        console.log("#" + trajet.id + " " + trajet.departure + " → " + trajet.destination);
        console.log("Départ : " + trajet.departureTime);
        console.log("Arrivée : " + trajet.arrivalTime);
        console.log("Prix : " + trajet.price + " DH");
        console.log("Places disponibles : " + trajet.availableSeats);
    }

}

//------4. Acheter un ticket----------

const tickets = [];

function RechercheTrajet(id, trips) {

    for (let trajet of trips) {
        if (trajet.id === id) {
            return trajet;
        }
    }

    return null;
}

function CreateTicket() {

    let name = prompt("Nom du passager : ");
    let idtrip = Number(prompt("Identifiant du trajet : "));

    let trajet = RechercheTrajet(idtrip, trips);

    // Vérifier si le trajet existe
    if (trajet === null) {
        console.log("Trajet introuvable.");
    
    }

    // Vérifier les places
    if (trajet.availableSeats === 0) {
        console.log("Train complet.");
        
    }

    // Numéro de place
    let seatNumber = 50 - trajet.availableSeats + 1;

    // Créer le ticket
    let ticket = {
        id: tickets.length + 1,
        passengerName: name,
        tripId: idtrip,
        seatNumber: seatNumber,
        price: trajet.price
    };

    // Ajouter le ticket a tickets
    tickets.push(ticket);

    // Diminuer le nombre de places
    trajet.availableSeats--;

    console.log("Ticket acheté avec succès.");
    console.log("");
    console.log("");
    console.log("--------------------")
    console.log("Ticket #" + ticket.id);
    console.log("Passager : " + ticket.passengerName);
    console.log("Trajet : " + trajet.departure + " → " + trajet.destination);
    console.log("Place : " + ticket.seatNumber);
    console.log("Prix : " + ticket.price + " DH");
}



//5. Afficher les tickets


function AffichageTickets() {
   
    if (tickets.length === 0) {
        console.log("Aucun ticket enregistré.");
        return;
    }

    for (let ticket of tickets) {
        let trajet = RechercheTrajet(ticket.tripId, trips);
        console.log("=== TICKETS ===")
        console.log("Ticket #" + ticket.id);
        console.log("Passager : " + ticket.passengerName);
        console.log("Trajet : " + trajet.departure + " → " + trajet.destination);
        console.log("Place : " + ticket.seatNumber);
        console.log("Prix : " + ticket.price + " DH");

    }

}
//6. Annuler un ticket

function AnnulerTicket() {

    let idTicket = Number(prompt("Identifiant du ticket : "));

    let index = -2;

    for (let i = 0; i < tickets.length; i++) {

        if (tickets[i].id === idTicket) {
            index = i;
            break;
        }
    }

       if (index === -2) {
        console.log("Ticket introuvable.");
        return;
       }

    let ticket = tickets[index];

    let trajet = RechercheTrajet(ticket.tripId, trips);

    trajet.availableSeats++;

    tickets.splice(index, 1);

    console.log("Ticket annulé avec succès.");
}




function RechercherTicket() {

let nom = prompt("Nom du passager : ");

for (let ticket of tickets) {

  if (ticket.passengerName === nom) {

 let trajet = RechercheTrajet(ticket.tripId, trips);

    console.log("");
     console.log("Ticket #" + ticket.id);
    console.log("Passager : " + ticket.passengerName);
    console.log("Trajet : " + trajet.departure + " → " + trajet.destination);
    console.log("Place : " + ticket.seatNumber);
    console.log("Prix : " + ticket.price + " DH");
   }
}
}
let choix ;

while (choix !== 0) {

    let menu = `
=================================
        RAILWAY MANAGER
=================================

1. Afficher les trajets
2. Acheter un ticket
3. Afficher les tickets
4. Annuler un ticket
5. Rechercher un ticket
0. Quitter
`;

    choix = Number(prompt(menu+"\nVotre choix : "));
     
    switch (choix){

    case 0 :
      console.log("Au revoir !");
      break;

    case 1 :
        AffichageTrajet();
       break;

     case 2 :
        CreateTicket();
        break;
  
     case 3 :
        AffichageTickets();
         break;

     case 4 :
        AnnulerTicket();
         break;

    case 5 :
        RechercherTicket();
        break;
     default:
        console.log("Choix invalide.");
    }



}