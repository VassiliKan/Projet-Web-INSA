headerprint = function(){
    var argent = sessionStorage.getItem("argent");
    let dettes = sessionStorage.getItem("dettes");
    let date = JSON.parse(sessionStorage.getItem("date"));
    document.getElementById("argent_courant2").innerHTML = Math.round(argent);
    document.getElementById("dettes").innerHTML = Math.round(dettes);
    document.getElementById("date_jeu").innerHTML = date.jour +" / " + date.mois + " / " + date.annee + " " + "heure : " + date.heure +"h";
    updateValeurActionsPossede();
}

document.addEventListener('DOMContentLoaded', function() {
    headerprint();
 }, false);

 // Affiche la valeur totale des actions que possede l utilisateur 
 function updateValeurActionsPossede(){
    const stocksUser = JSON.parse(sessionStorage.getItem("stocksUser"));
    var sum = 0;
    for(i in stocksUser){
        if(stocksUser[i] != null) {
            if(stocksUser[i].unitsNumber != 0){
                sum += stocksUser[i].unitsNumber * stocksUser[i].unitPrice;
                console.log(stocksUser[i].unitPrice);
            }
        }
    }
    document.getElementById("actifs").innerText = Math.round(100 * sum)/100;
}
