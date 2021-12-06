var argent = sessionStorage.getItem("argent");
let bank = JSON.parse(sessionStorage.getItem("bank"));
let date = JSON.parse(sessionStorage.getItem("date"));
var stocksAvailable = JSON.parse(sessionStorage.getItem("stocksAvailable"));
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
    var stocksAvailable = JSON.parse(sessionStorage.getItem("stocksAvailable"));
    const price = volume * stocksAvailable[stock].unitPrice
    console.log(stocksAvailable[stock]);
    if(document.getElementById("acheter").checked){
        buy(stock,volume,price);
    } else {
        sell(stock,volume,price);
    }
}

function buy(stock,volume,price){
    var argent = parseFloat(sessionStorage.getItem("argent"));
    var stocksAvailable = JSON.parse(sessionStorage.getItem("stocksAvailable"));
    if (argent - parseFloat(price) < 0){
        window.alert("You don't have enough money to buy this :/ Please contact your bank.");
    } else {
        if(stocksAvailable[stock].unitsNumber == 0){
            stocksAvailable[stock].unitsNumber = volume;
        } else {
            stocksAvailable[stock].unitsNumber = parseFloat(stocksAvailable[stock].unitsNumber) + parseFloat(volume);
        }
        sessionStorage.setItem("argent",argent - parseFloat(price));
        sessionStorage.setItem("stocksAvailable",JSON.stringify(stocksAvailable));
        //document.getElementById("message").innerHTML = "Vous avez bien acheté " + volume + " actions " + stock;
    }
}


function sell(stock,volume,price){
    var argent = parseFloat(sessionStorage.getItem("argent"));
    var stocksAvailable = JSON.parse(sessionStorage.getItem("stocksAvailable"));
    if(parseFloat(stocksAvailable[stock].unitsNumber) >= parseFloat(volume)){
            stocksAvailable[stock].unitsNumber = parseFloat(stocksAvailable[stock].unitsNumber) - parseFloat(volume);    
            sessionStorage.setItem("argent", argent + parseFloat(price));
            sessionStorage.setItem("stocksAvailable",JSON.stringify(stocksAvailable));
            //document.getElementById("message").innerHTML = "Vous avez bien vendu " + volume + " actions " + stock;
    } else {
        window.alert("You don't have enough stocks to sell :/");    
    }
}

//création tableau

function initTabBourse() {
    var refTable = document.getElementById("table_bourse");
    var stocksAvailable = JSON.parse(sessionStorage.getItem("stocksAvailable"));
    var c=2;
    for (i in stocksAvailable){
            var nouvelleLigne = refTable.insertRow(c);
  
            // Nom
            var nouvelleCellule = nouvelleLigne.insertCell(0);
            nouvelleCellule.setAttribute("id",i+"_name");
            var nouveauTexte = document.createTextNode(stocksAvailable[i].name);
            nouvelleCellule.appendChild(nouveauTexte);
            // Prix
            nouvelleCellule = nouvelleLigne.insertCell(1);
            nouvelleCellule.setAttribute("id",i+"_prix");
            nouveauTexte = document.createTextNode(Math.round(100*stocksAvailable[i].unitPrice)/100);
            nouvelleCellule.appendChild(nouveauTexte);
            // Nb possédé
            nouvelleCellule = nouvelleLigne.insertCell(2);
            nouvelleCellule.setAttribute("id",i+"_unitsNumber");
            nouveauTexte = document.createTextNode(stocksAvailable[i].unitsNumber);
            nouvelleCellule.appendChild(nouveauTexte);
            c+=1;
    }

}

function modifieTabBourse(){
    var refTable = document.getElementById("table_bourse");
    var stocksAvailable = JSON.parse(sessionStorage.getItem("stocksAvailable"));
    for (i in stocksAvailable){
            nouvelleCellule = document.getElementById(i+"_name");
            var nouveauTexte = document.createTextNode(stocksAvailable[i].name);
            nouvelleCellule.removeChild(nouvelleCellule.firstChild);
            nouvelleCellule.appendChild(nouveauTexte);

            nouvelleCellule = document.getElementById(i+"_prix");
            nouveauTexte = document.createTextNode(Math.round(100*stocksAvailable[i].unitPrice)/100);
            nouvelleCellule.removeChild(nouvelleCellule.firstChild);
            nouvelleCellule.appendChild(nouveauTexte);
            // Nb possédé
            nouvelleCellule = document.getElementById(i+"_unitsNumber");
            nouveauTexte = document.createTextNode(stocksAvailable[i].unitsNumber);
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
    var c=2;
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
                c+=1;
    }
}
function modifieTabVariations(bool){
    var dateVariations = JSON.parse(sessionStorage.getItem("dateVariations"));
    var refTable = document.getElementById("table_variations");
    var stocksVariations = JSON.parse(sessionStorage.getItem("stocksVariations"))
    for (i in stocksVariations){
        //Tableau Tout temps
        if (bool){
        var dateAllTime = JSON.parse(sessionStorage.getItem("dateAllTime"));
        nouvelleCellule = document.getElementById(i + "_cell");
        var chart = document.createElement("canvas");
        chart.setAttribute("id", i + "_chart");
        //document.getElementById(i+"_chart2").destroy();
        nouvelleCellule.removeChild(nouvelleCellule.firstChild);
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
        var myChart = new Chart(
            document.getElementById(i+"_chart"),
            config
        );
        }
        //Tableau sur la semaine
        if (dateVariations.length>168){
            var len = 168;
        }
        else{
            var len = dateVariations.length;
        }
        nouvelleCellule = document.getElementById(i + "_cell2");
        var chart = document.createElement("canvas");
        chart.setAttribute("id", i + "_chart2");
        nouvelleCellule.removeChild(nouvelleCellule.firstChild);
        nouvelleCellule.appendChild(chart);

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
    }
}
// LISTENERS SUR VOLUME ET PRICE (dépendants)

//Graphiques
/**
const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];
const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {}
};
const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
*/
