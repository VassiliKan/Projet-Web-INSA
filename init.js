function DateJeu(j,m,a,h){
    this.jour = j;
    this.mois = m;
    this.annee = a;
    this.heure = h;
}

function Bank(t,d){
    this.taux = t;
    this.dettes = d;
}

function Stock(name, unitPrice, units){
    this.name = name;
    this.unitPrice = unitPrice;
    this.unitsNumber = units;
}

function StockVariation(name,tab,tab2){
    this.name = name,
    this.variations = tab,
    this.allTime = tab2
}

var boolPlay = false;
sessionStorage.setItem("boolPlay",boolPlay);

var argent = 0;
var dettes = 0;
var taux = 0.1;
var date = new DateJeu(1,1,2021,0);

var stocksUser = {};
stocksUser["airbus"] = new Stock("airbus", 70, 0);
stocksUser["apple"] = new Stock("apple", 315, 0);
stocksUser["boeing"] = new Stock("boeing", 105, 0);
stocksUser["disney"] = new Stock("disney", 45, 0);
stocksUser["facebook"] = new Stock("facebook", 120, 0);
stocksUser["google"] = new Stock("google", 200, 0);
stocksUser["microsoft"] = new Stock("microsoft", 75, 0);
stocksUser["toyota"] = new Stock("toyota", 165, 0);

var stocksVariations = {}
function initVariations(){
    for (var i in stocksUser){
        stocksVariations[i] = new StockVariation(i,[stocksUser[i].unitPrice],[stocksUser[i].unitPrice]);
    }
}
initVariations();
var dateVariations = [date.jour +" / " + date.mois + " / " + date.annee];
var dateAllTime = [date.jour +" / " + date.mois + " / " + date.annee];
sessionStorage.setItem("argent",argent);
sessionStorage.setItem("dettes",dettes);
sessionStorage.setItem("taux",taux);
sessionStorage.setItem("date",JSON.stringify(date));
sessionStorage.setItem("stocksUser",JSON.stringify(stocksUser));
sessionStorage.setItem("stocksVariations",JSON.stringify(stocksVariations));
sessionStorage.setItem("dateVariations",JSON.stringify(dateVariations));
sessionStorage.setItem("dateAllTime",JSON.stringify(dateAllTime));
sessionStorage.setItem("vitesse",200);