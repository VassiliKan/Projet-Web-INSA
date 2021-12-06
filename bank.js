

//const e = document.getElementById("emp");

function emprunter(){
    var argent = sessionStorage.getItem("argent");
    let dettes = sessionStorage.getItem("dettes");
    let date = JSON.parse(sessionStorage.getItem("date"));
    const e = document.getElementById("emp");
    var evalue =  parseFloat(e.value,10);
    if (e.value ==''){
        document.getElementById("emp").value = '';
    }else if (document.getElementById("emprunter").checked){
        argent = parseFloat(argent,10) + evalue;
        document.getElementById("emp").value = '';
        sessionStorage.setItem("argent",argent);
        argent = sessionStorage.getItem("argent");
        dettes = parseFloat(dettes,10) + evalue;
        sessionStorage.setItem("dettes",dettes);
        headerprint();
    }else{
        var cond = parseFloat(argent,10) - evalue < 0;
        if (cond < 0){
            alert("pas assez d\'argent")
        }
        else{
            argent = parseFloat(argent,10) - evalue;
            document.getElementById("emp").value = '';
            sessionStorage.setItem("argent",argent);
            argent = sessionStorage.getItem("argent");
            sessionStorage.setItem("dettes",dettes);
            headerprint();
        }
    }
}
