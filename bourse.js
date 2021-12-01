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
    stock = document.getElementById("stock-select").value;
    volume = document.getElementById("vol").value;
    price = volume * stocksAvailable[stock].unitPrice
    stocksUser = JSON.parse(sessionStorage.getItem("stocksUser"));
    if(document.getElementById("acheter").checked){
        buy();
    } else {
        sell();
    }
}

function buy(){
    if (argent - price < 0){
        window.alert("You don't have enough money to buy this :/ Please contact your bank.");
    } else {
        if(stock in stocksUser){
            stocksUser[stock] = volume;
        } else {
            stocksUser[stock] += volume;
        }
        sessionStorage.setItem("argent",argent - price);
        argent = sessionStorage.getItem("argent");
        sessionStorage.setItem("stocksUser",JSON.stringify(stocksUser));
        stocksUser = JSON.parse(sessionStorage.getItem("stocksUser"));
        //document.getElementById("message").innerHTML = "Vous avez bien acheté " + volume + " actions " + stock;
    }
}


function sell(){
    if(stock in stocksUser && stocksUser[stock] >= volume){
            stocksUser[stock] -= volume;    
            sessionStorage.setItem("argent", argent + price);
            argent = sessionStorage.getItem("argent");
            sessionStorage.setItem("stocksUser",JSON.stringify(stocksUser));
            stocksUser = JSON.parse(sessionStorage.getItem("stocksUser"));
            //document.getElementById("message").innerHTML = "Vous avez bien vendu " + volume + " actions " + stock;
    } else {
        window.alert("You don't have enough stocks to sell :/");    
    }
}




// LISTENERS SUR VOLUME ET PRICE (dépendants)



