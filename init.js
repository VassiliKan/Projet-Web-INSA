function DateJeu(j,m,a){
    this.jour = j;
    this.mois = m;
    this.annee = a;
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

var stockUser = {}

var argent = 0;

var dettes = 0;
var taux = 0.1;

var date = new DateJeu(1,1,2021);

var stocksAvailable = {};
stocksAvailable["airbus"] = new Stock("airbus", 70, 150000);
stocksAvailable["apple"] = new Stock("apple", 315, 1000000);
stocksAvailable["boeing"] = new Stock("boeing", 105, 140000);
stocksAvailable["disney"] = new Stock("disney", 45, 100000);
stocksAvailable["facebook"] = new Stock("facebook", 120, 1000000);
stocksAvailable["google"] = new Stock("google", 200, 1100000);
stocksAvailable["microsoft"] = new Stock("microsoft", 75, 800000);
stocksAvailable["toyota"] = new Stock("toyota", 165, 750000);

sessionStorage.setItem("argent",argent);
//sessionStorage.setItem("bank",bank);
sessionStorage.setItem("dettes",dettes);
sessionStorage.setItem("taux",taux);
sessionStorage.setItem("date",JSON.stringify(date));
//sessionStorage.setItem("date",date);
sessionStorage.setItem("stocksAvailable",JSON.stringify(stocksAvailable));
sessionStorage.setItem("stocksUser",JSON.stringify(stocksUser));