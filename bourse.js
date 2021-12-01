var argent = sessionStorage.getItem("argent");
let bank = JSON.parse(sessionStorage.getItem("bank"));
let date = JSON.parse(sessionStorage.getItem("date"));
var stocksAvailable = JSON.parse(sessionStorage.getItem("stocksAvailable"));
var stocksUser = JSON.parse(sessionStorage.getItem("stocksuser"));
/**
const stocksAvailable = {};
stocksAvailable["airbus"] = new Stock("airbus", 70, 150000);
stocksAvailable["apple"] = new Stock("apple", 315, 1000000);
stocksAvailable["boeing"] = new Stock("boeing", 105, 140000);
stocksAvailable["disney"] = new Stock("disney", 45, 100000);
stocksAvailable["facebook"] = new Stock("facebook", 120, 1000000);
stocksAvailable["google"] = new Stock("google", 200, 1100000);
stocksAvailable["microsoft"] = new Stock("microsoft", 75, 800000);
stocksAvailable["toyota"] = new Stock("toyota", 165, 750000);*/

/** 
function Stock(name, unitPrice, units){
    this.name = name;
    this.unitPrice = unitPrice;
    this.unitsNumber = units;
}

Stock.prototype.getPrice = function() {
    return this.unitPrice;
}
*/

User.prototype.getStocks = function (){
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
}


function buy(){
    var stock = document.getElementById("stock-select").value;
    var volume = document.getElementById("vol").value;
    var price = volume * stocksAvailable[stock].unitPrice;
    if (user.getMoney() - price < 0){
        window.alert("You don't have enough money to buy this :/ Please contact your bank.");
    } else {
    user.getStocks()[stock] = volume;
    sessionStorage.setItem("argent",argent - price);
    argent = sessionStorage.getItem("argent");
    /**changer le dico utilisateur avec etst si il possède déjà des actions ou non */
    sessionStorage.setItem("stocksUser",JSON.stringify(stocksUser));
    var stocksUser = JSON.parse(sessionStorage.getItem("stocksuser"));
    document.getElementById("message").innerHTML = "vous avez bien acheté " + volume + " actions " + stock;
    }
}



// LISTENERS SUR VOLUME ET PRICE (dépendants)



