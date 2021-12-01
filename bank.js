

//const e = document.getElementById("emp");

function emprunter(){
    var argent = sessionStorage.getItem("argent");
    let dettes = sessionStorage.getItem("dettes");
    let date = JSON.parse(sessionStorage.getItem("date"));
    const e = document.getElementById("emp");
    var evalue =  parseFloat(e.value,10);
    argent = parseFloat(argent,10) + evalue;
    document.getElementById("emp").value = '';
    sessionStorage.setItem("argent",argent);
    argent = sessionStorage.getItem("argent");
    dettes = parseFloat(dettes,10) + evalue;
    sessionStorage.setItem("dettes",dettes);
    headerprint();
}
