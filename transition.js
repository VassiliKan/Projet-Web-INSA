transition = function(bool) {
    /** date */
    console.log('debut');
    var allTime = false;
    let date = JSON.parse(sessionStorage.getItem("date"));
    if (date.heure == 23){
            date.heure = 0;
            allTime = true;
            var dateAllTime = JSON.parse(sessionStorage.getItem("dateAllTime"));
            dateAllTime.push(date.jour +" / " + date.mois + " / " + date.annee);
            sessionStorage.setItem("dateAllTime",JSON.stringify(dateAllTime));
        if (date.jour == 31) {
            date.jour = 1;
            if (date.mois == 12){
                date.mois = 1;
                date.annee = date.annee + 1;
            }
            else {
                date.mois=date.mois +1;
            }
        }
        else {
            date.jour = date.jour +1;
        }
    }
    else {
        date.heure +=1;
    }
    sessionStorage.setItem("date",JSON.stringify(date));
    /** bank */
    var dettes = parseFloat(sessionStorage.getItem("dettes"),10);
    var taux = parseFloat(sessionStorage.getItem("taux"),10);
    dettes = dettes * (1+taux/(31*24));
    taux = taux * (1 + 1/(31*24*10));
    sessionStorage.setItem("dettes",dettes);
    sessionStorage.setItem("taux",taux);
    /** actions */
    var teta = 0.000003;
    var dt = 1;
    var stocksUser = JSON.parse(sessionStorage.getItem("stocksUser"));
    var stocksVariations = JSON.parse(sessionStorage.getItem("stocksVariations"));
    for (var i in stocksUser){
        var p =  Math.random();
        var sigma = 0.005*stocksUser[i].unitPrice;
        if (p<1/2){
            var dw = -1;
        }
        else{
            var dw = 1;
        }
        stocksUser[i].unitPrice = stocksUser[i].unitPrice * (1 + dt * teta) + dw * sigma * dt;
        /**
        * tableau des variations omg
        */
       (stocksVariations[i].variations).push(stocksUser[i].unitPrice);
       if (allTime){
        (stocksVariations[i].allTime).push(stocksUser[i].unitPrice);
       }
    }
    sessionStorage.setItem("stocksVariations",JSON.stringify(stocksVariations));
    dateVariations = JSON.parse(sessionStorage.getItem("dateVariations"));
    dateVariations.push(date.jour +" / " + date.mois + " / " + date.annee);
    sessionStorage.setItem("dateVariations",JSON.stringify(dateVariations));
    sessionStorage.setItem("stocksUser",JSON.stringify(stocksUser));
    headerprint();
    if (bool){
        if (window.location.href.includes("bourse.html")){
            modifieTabBourse();
            modifieTabVariations(allTime);
            updateMontant();
        }
    }
}

transitionDay = function(){
    for (let i=0; i<24; i++){
        transition(false);
    }
    if (window.location.href.includes("bourse.html")){
        modifieTabBourse();
        modifieTabVariations(true);
    }
}

transitionPlay =  function ()
{
    var vitesse = JSON.parse(sessionStorage.getItem("vitesse"));
    var boolLaunch = JSON.parse(sessionStorage.getItem("boolLaunch"));
    if (!(boolLaunch)){
        var intervalId = setInterval(transition,vitesse,[true]);
        sessionStorage.setItem("intervalId",JSON.stringify(intervalId));
        boolLaunch = true;
        sessionStorage.setItem("boolLaunch",boolLaunch);
    }
}


transitionStop =  function ()
{   
    var boolLaunch = JSON.parse(sessionStorage.getItem("boolLaunch"));
    if (boolLaunch){
    var intervalId = JSON.parse(sessionStorage.getItem("intervalId"));
    clearInterval(intervalId);
    }
    var boolLaunch = false;
    sessionStorage.setItem("boolLaunch",boolLaunch);
}
document.addEventListener('DOMContentLoaded', function() {
    var boolLaunch = JSON.parse(sessionStorage.getItem("boolLaunch"));
    if (boolLaunch){
        boolLaunch = false;
        sessionStorage.setItem("boolLaunch",boolLaunch);
        transitionPlay();
    }
}, false);
