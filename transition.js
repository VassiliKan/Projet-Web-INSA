transition = function() {
    /** date */
    console.log('debut');
    let date = JSON.parse(sessionStorage.getItem("date"));
    if (date.heure == 23){
            date.heure = 0;
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
    var teta = 0.05;
    var p =  Math.random();
    if (p<1/2){
        var dw = -1;
    }
    else{
        var dw = 1;
    }
    var sigma = 4;
    var dt = 1;
    var stocksAvailable = JSON.parse(sessionStorage.getItem("stocksAvailable"));
    for (var i in stocksAvailable){
        stocksAvailable['' + i].unitprice = stocksAvailable['' + i].unitprice * (1 + dt * teta) + dw * sigma * dt;
    }
    sessionStorage.setItem("stocksAvailable",JSON.stringify(stocksAvailable));
    stocksAvailable = JSON.parse(sessionStorage.getItem("stocksAvailable"));
    headerprint();
}

transitionPlay =  function ()
{
    var intervalId = setInterval(transition,100);
    sessionStorage.setItem("intervalId",JSON.stringify(intervalId));
}


transitionStop =  function ()
{
    var intervalId = JSON.parse(sessionStorage.getItem("intervalId"));
    clearInterval(intervalId);
}