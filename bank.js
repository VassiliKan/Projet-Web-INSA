
function retrieveData(){
    const e = parseInt(document.getElementById("emp").value);
    if(!(isNaN(e)) && Number.isInteger(e)){
        emprunter();
    } else {
        window.alert("Please enter a valid number");
        reset();
    }
}

//Fonction permettant d'emprunter et de rembourser 
function emprunter(){
    var argent = sessionStorage.getItem("argent");
    let dettes = sessionStorage.getItem("dettes");
    let date = JSON.parse(sessionStorage.getItem("date"));
    const e = document.getElementById("emp");
    var evalue =  parseFloat(e.value,10);
    if (e.value ==''){
        document.getElementById("emp").setAttribute("value",'');
    }else if (document.getElementById("emprunter").checked){        
        argent = parseFloat(argent,10) + evalue;
        document.getElementById("emp").setAttribute("value",'');
        sessionStorage.setItem("argent",argent);
        argent = sessionStorage.getItem("argent");
        dettes = parseFloat(dettes,10) + evalue * (1.1);
        sessionStorage.setItem("dettes",dettes);
        headerprint();
    }else{
        var cond = parseFloat(argent,10) - evalue;
        if (cond < 0){
            alert("pas assez d\'argent");
        }
        else if (parseFloat(dettes,10) - evalue<0){
            alert("vous n(avez pas autant d'emprunts");
        }
        else{
        argent = parseFloat(argent,10) - evalue;
        dettes = parseFloat(dettes,10) - evalue;
        document.getElementById("emp").setAttribute("value",'');
        sessionStorage.setItem("argent",argent);
        argent = sessionStorage.getItem("argent");
        sessionStorage.setItem("dettes",dettes);
        headerprint();
        }
    }
}

function addmoney(money){
    const e = document.getElementById("emp");
    e.value = money;
}


function reset(){
    document.getElementById("emp").value = "";
}
