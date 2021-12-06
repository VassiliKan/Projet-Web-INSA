var argent = sessionStorage.getItem("argent");
let bank = JSON.parse(sessionStorage.getItem("bank"));
let date = JSON.parse(sessionStorage.getItem("date"));
var stocksUser = JSON.parse(sessionStorage.getItem("stocksUser"));
var stock, volume, price;

/*User.prototype.getStocks = function (){
    str = ""
    for(var key in this.stocks){
        str += key + " ";
    }
    return str;
}

User.prototype.getStocksValue = function (){
    sum = 0
    for(var key in this.stocks){
        sum += this.stocks[key];
    }
    return sum;
}*/

function retrieveData(){
    const stock = document.getElementById("stock-select").value;
    const volume = document.getElementById("vol").value;
    var stocksUser = JSON.parse(sessionStorage.getItem("stocksUser"));
    const price = volume * stocksUser[stock].unitPrice
    console.log(stocksUser[stock]);
    if(document.getElementById("acheter").checked){
        buy(stock,volume,price);
    } else {
        sell(stock,volume,price);
    }
}

function buy(stock,volume,price){
    var argent = parseFloat(sessionStorage.getItem("argent"));
    var stocksUser = JSON.parse(sessionStorage.getItem("stocksUser"));
    if (argent - parseFloat(price) < 0){
        window.alert("You don't have enough money to buy this :/ Please contact your bank.");
    } else {
        if(stocksUser[stock].unitsNumber == 0){
            stocksUser[stock].unitsNumber = volume;
        } else {
            stocksUser[stock].unitsNumber = parseFloat(stocksUser[stock].unitsNumber) + parseFloat(volume);
        }
        sessionStorage.setItem("argent",argent - parseFloat(price));
        sessionStorage.setItem("stocksUser",JSON.stringify(stocksUser));
        //document.getElementById("message").innerHTML = "Vous avez bien acheté " + volume + " actions " + stock;
    }
}


function sell(stock,volume,price){
    var argent = parseFloat(sessionStorage.getItem("argent"));
    var stocksUser = JSON.parse(sessionStorage.getItem("stocksUser"));
    if(parseFloat(stocksUser[stock].unitsNumber) >= parseFloat(volume)){
            stocksUser[stock].unitsNumber = parseFloat(stocksUser[stock].unitsNumber) - parseFloat(volume);    
            sessionStorage.setItem("argent", argent + parseFloat(price));
            sessionStorage.setItem("stocksUser",JSON.stringify(stocksUser));
            //document.getElementById("message").innerHTML = "Vous avez bien vendu " + volume + " actions " + stock;
    } else {
        window.alert("You don't have enough stocks to sell :/");    
    }
}

//création tableau

function initTabBourse() {
    var refTable = document.getElementById("table_bourse");
    var stocksUser = JSON.parse(sessionStorage.getItem("stocksUser"));
    var c=2;
    for (i in stocksUser){
            var nouvelleLigne = refTable.insertRow(c);
  
            // Nom
            var nouvelleCellule = nouvelleLigne.insertCell(0);
            nouvelleCellule.setAttribute("id",i+"_name");
            var nouveauTexte = document.createTextNode(stocksUser[i].name);
            nouvelleCellule.appendChild(nouveauTexte);
            // Prix
            nouvelleCellule = nouvelleLigne.insertCell(1);
            nouvelleCellule.setAttribute("id",i+"_prix");
            nouveauTexte = document.createTextNode(Math.round(100*stocksUser[i].unitPrice)/100);
            nouvelleCellule.appendChild(nouveauTexte);
            // Nb possédé
            nouvelleCellule = nouvelleLigne.insertCell(2);
            nouvelleCellule.setAttribute("id",i+"_unitsNumber");
            nouveauTexte = document.createTextNode(stocksUser[i].unitsNumber);
            nouvelleCellule.appendChild(nouveauTexte);
            c+=1;
    }

}

function modifieTabBourse(){
    var refTable = document.getElementById("table_bourse");
    var stocksUser = JSON.parse(sessionStorage.getItem("stocksUser"));
    for (i in stocksUser){
            nouvelleCellule = document.getElementById(i+"_name");
            var nouveauTexte = document.createTextNode(stocksUser[i].name);
            nouvelleCellule.removeChild(nouvelleCellule.firstChild);
            nouvelleCellule.appendChild(nouveauTexte);

            nouvelleCellule = document.getElementById(i+"_prix");
            nouveauTexte = document.createTextNode(Math.round(100*stocksUser[i].unitPrice)/100);
            nouvelleCellule.removeChild(nouvelleCellule.firstChild);
            nouvelleCellule.appendChild(nouveauTexte);
            // Nb possédé
            nouvelleCellule = document.getElementById(i+"_unitsNumber");
            nouveauTexte = document.createTextNode(stocksUser[i].unitsNumber);
            nouvelleCellule.removeChild(nouvelleCellule.firstChild);
            nouvelleCellule.appendChild(nouveauTexte);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    initTabBourse();
    modifieTabBourse();
    initTabVariations();
}, false);

function initTabVariations(){
    var dateVariations = JSON.parse(sessionStorage.getItem("dateVariations"));
    var refTable = document.getElementById("table_variations");
    var stocksVariations = JSON.parse(sessionStorage.getItem("stocksVariations"));
    //var tabChart = JSON.parse(sessionStorage.getItem("tabChart"));
    var c=2;
    for (i in tabChartHeure){
        (tabChartHeure[i]).destroy();
    }
    for (i in tabChartDay){
        (tabChartDay[i]).destroy();
    }
    for (i in stocksVariations){
            var nouvelleLigne = refTable.insertRow(c);

            // Tab Tout temps
            var nouvelleCellule = nouvelleLigne.insertCell(0);
            var dateAllTime = JSON.parse(sessionStorage.getItem("dateAllTime"));
            nouvelleCellule.setAttribute("id",i+"_name");
            nouvelleCellule.setAttribute("class","td_name");
            var nouveauTexte = document.createTextNode(stocksVariations[i].name);
            nouvelleCellule.appendChild(nouveauTexte);
                // Chart
            nouvelleCellule = nouvelleLigne.insertCell(1);
            nouvelleCellule.setAttribute("id",i+"_cell");
            var chart = document.createElement("canvas");
            chart.setAttribute("id", i + "_chart");
            nouvelleCellule.setAttribute("class","td_graph");
            nouvelleCellule.appendChild(chart);
            var data = {
                labels: dateAllTime,
                datasets: [{
                    label: 'test',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: stocksVariations[i].allTime,
                }]
            };
            var config = {
                type: 'line',
                data: data,
                options: {
                    animation: {
                        duration: 0
                    }
                }
            };
            myChart = new Chart(
                document.getElementById(i+"_chart"),
                config
            );
            tabChartDay.push(myChart);
            if (dateVariations.length>168){
                var len = 168;
            }
            else{
                var len = dateVariations.length;
            }
            // Tab semaine
            var nouvelleCellule = nouvelleLigne.insertCell(0);
            nouvelleCellule.setAttribute("id",i+"_name2");
            nouvelleCellule.setAttribute("class","td_name");
            var nouveauTexte = document.createTextNode(stocksVariations[i].name);
            nouvelleCellule.appendChild(nouveauTexte);
                // Chart
            nouvelleCellule = nouvelleLigne.insertCell(1);
            nouvelleCellule.setAttribute("id",i+"_cell2");
            var chart = document.createElement("canvas");
            chart.setAttribute("id", i + "_chart2");
            nouvelleCellule.setAttribute("class","td_graph");
            nouvelleCellule.appendChild(chart);
            dateVariation = dateVariations.slice(-len);
            sessionStorage.setItem("dateVariation",JSON.stringify(dateVariation));
            stocksVariations[i].variations = (stocksVariations[i].variations).slice(-len);
            sessionStorage.setItem("stocksVariations",JSON.stringify(stocksVariations));
            var data = {
                labels: dateVariation,
                datasets: [{
                    label: 'test',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: stocksVariations[i].variations,
                }]
            };
            var config = {
                type: 'line',
                data: data,
                options: {
                    animation: {
                        duration: 0
                    }
                }
            };
            myChart = new Chart(
                document.getElementById(i+"_chart2"),
                config
            );
            tabChartHeure.push(myChart);
            c+=1;
    }
}
function modifieTabVariations(bool){
    var dateVariations = JSON.parse(sessionStorage.getItem("dateVariations"));
    var refTable = document.getElementById("table_variations");
    var stocksVariations = JSON.parse(sessionStorage.getItem("stocksVariations"));
    for (i in tabChartHeure){
        (tabChartHeure[i]).destroy();
    }
    if (bool){
        for (i in tabChartDay){
            (tabChartDay[i]).destroy();
        }
    }
    for (i in stocksVariations){
        //Tableau Tout temps
        if (bool){
        var dateAllTime = JSON.parse(sessionStorage.getItem("dateAllTime"));
        var data = {
            labels: dateAllTime,
            datasets: [{
                label: 'test',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: stocksVariations[i].allTime,
            }]
        };
        var config = {
            type: 'line',
            data: data,
            options: {
                animation: {
                    duration: 0
                }
            }
        };
        var myChart = new Chart(
            document.getElementById(i+"_chart"),
            config
        );
        tabChartDay.push(myChart);
        }
        //Tableau sur la semaine
        //document.getElementById(i+"_chart").destroy();
        if (dateVariations.length>168){
            var len = 168;
        }
        else{
            var len = dateVariations.length;
        }
        //nouvelleCellule = document.getElementById(i + "_cell2");
        //var chart = document.createElement("canvas");
        //chart.setAttribute("id", i + "_chart2");
        //nouvelleCellule.removeChild(nouvelleCellule.firstChild);
        //console.log(nouvelleCellule);
        //nouvelleCellule.appendChild(chart);
        var data = {
            labels: dateVariations.slice(-len),
            datasets: [{
                label: 'test',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data:(stocksVariations[i].variations).slice(-len),
            }]
        };
        var config = {
            type: 'line',
            data: data,
            options: {
                animation: {
                    duration: 0
                }
            }
        };
        var myChart = new Chart(
            document.getElementById(i+"_chart2"),
            config
        );
        tabChartHeure.push(myChart);
    }
    //sessionStorage.setItem("tabChart",JSON.stringify(tabChart));
}

// Met a jour le contenu des dropdown en fonction de si l utilisateur souhaite acheter ou vendre. S il souhaite acheter, toutes les actions disponibles sont affichees. Sinon, seulement 
// celles qu il possede le sont
function updateSelect(isAcheter){
    var stocksUser = JSON.parse(sessionStorage.getItem("stocksUser"));
    var dropdown = document.getElementById("stock-select");
    removeAllChildren(dropdown);
    if(isAcheter){
        for(i in stocksUser){
            var newOpt = document.createElement("option");
            newOpt.innerHTML = i;
            dropdown.appendChild(newOpt);
        }
    } else {
        for(i in stocksUser){
            if(stocksUser[i] != null) {
                if(stocksUser[i].unitsNumber != 0){
                    var newOpt = document.createElement("option");
                    newOpt.innerHTML = i;
                    dropdown.appendChild(newOpt);
                }
            }
        }
    }

}

updateSelect(1);

// Fonction pour supprimer tous les elements child d un element parent
function removeAllChildren(node){
    while (node.firstChild) {
        node.removeChild(node.lastChild);
      }
}

// Met a jour le montant total de la transaction en cours (en fonction du prix de l action et du nombre d action concernees)
function updateMontant(){
    const stock = document.getElementById("stock-select").value;
    const volume = document.getElementById("vol").value;
    var stocksUser = JSON.parse(sessionStorage.getItem("stocksUser"));
    // Verifie si le volume est bien un nombre 
    if(!isNaN(volume) && volume !=null){
        const price = Math.round(100 * volume * stocksUser[stock].unitPrice)/100;
        document.getElementById("montant").innerText = "Montant : " + price ;
    }
}

