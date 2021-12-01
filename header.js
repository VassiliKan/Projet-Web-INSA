headerprint = function(){
    var argent = sessionStorage.getItem("argent");
    let dettes = sessionStorage.getItem("dettes");
    let date = JSON.parse(sessionStorage.getItem("date"));
    document.getElementById("argent_courant2").innerHTML = Math.round(argent);
    document.getElementById("dettes").innerHTML = Math.round(dettes);
    document.getElementById("date_jeu").innerHTML = date.jour +" / " + date.mois + " / " + date.annee;
}

document.addEventListener('DOMContentLoaded', function() {
    headerprint();
 }, false);


// let date = sessionStorage.getItem("date");
//document.getElementById("date").html(jour);
/**
 * Date.prototype.setDate()
 * Date.prototype.setFullYear()
 * Date.prototype.setMonth()
 */

