function showColocacion(element){
    
    const padre = element.parentNode;
    const sensores  = document.querySelector(".sensores");
    const container2  = document.querySelector(".container2");
    const container3  = document.querySelector(".container3");
    if(element.style.height != '100vh'){
        
        
        container2.style.display = "none";
        container3.style.display = "none";
        sensores.style.display = 'none';
        element.style.zIndex = 2;
        padre.style.display = 'inline';
        element.style.height = '100vh';
        element.style.width = '100vw';
        element.style.flexDirection = 'column';
        for(const child of element.children){
            child.style.display = 'flex';
        }
    }else{
        padre.style = '';
        element.style = '';
        sensores.style = '';
        container2.style = '';
        container3.style = '';
        for(const child of element.children){
            child.style = '';
        }
    }
    
}

function showSensores(element){
    
    const padre = element.parentNode;
    const sensores  = document.querySelector(".colocacion");
    const container2  = document.querySelector(".container2");
    const container3  = document.querySelector(".container3");
    if(element.style.height != '100vh'){
        
        container2.style.display = "none";
        container3.style.display = "none";
        sensores.style.display = 'none';
        element.style.zIndex = 2;
        padre.style.display = 'inline';
        element.style.height = '100vh';
        element.style.width = '100vw';
        element.style.flexDirection = 'column';
        for(const child of element.children){
            child.style.display = 'inline';
        }
    }else{
        padre.style = '';
        element.style = '';
        sensores.style = '';
        container2.style = '';
        container3.style = '';
        for(const child of element.children){
            child.style = '';
        }
    }
    
}

function showEjercicio(element){
    
    const padre = element.parentNode;
    //const sensores  = document.querySelector(".colocacion");
    const container2  = document.querySelector(".container");
    const container3  = document.querySelector(".container3");
    if(element.style.height != '100vh'){
        
        container2.style.display = "none";
        container3.style.display = "none";
        //sensores.style.display = 'none';
        element.style.zIndex = 2;
        padre.style.display = 'inline';
        element.style.height = '100vh';
        element.style.width = '100vw';
        element.style.flexDirection = 'column';
        for(const child of element.children){
            child.style.display = 'inline';
        }
    }else{
        padre.style = '';
        element.style = '';
        //sensores.style = '';
        container2.style = '';
        container3.style = '';
        for(const child of element.children){
            child.style = '';
        }
    }
    
}

function showonOff(element){
    
    const padre = element.parentNode;
    const sensores  = document.querySelector(".calendario");
    const container2  = document.querySelector(".container");
    const container3  = document.querySelector(".container2");
    if(element.style.height != '100vh'){
        
        container2.style.display = "none";
        container3.style.display = "none";
        sensores.style.display = 'none';
        element.style.zIndex = 2;
        padre.style.display = 'inline';
        element.style.height = '100vh';
        element.style.width = '100vw';
        element.style.flexDirection = 'column';
        for(const child of element.children){
            child.style.display = 'inline';
        }
    }else{
        padre.style = '';
        element.style = '';
        sensores.style = '';
        container2.style = '';
        container3.style = '';
        for(const child of element.children){
            child.style = '';
        }
    }
    
}

function showCalendario(element){
    
    const padre = element.parentNode;
    const sensores  = document.querySelector(".onoff");
    const container2  = document.querySelector(".container");
    const container3  = document.querySelector(".container2");
    if(element.style.height != '100vh'){
        
        container2.style.display = "none";
        container3.style.display = "none";
        sensores.style.display = 'none';
        element.style.zIndex = 2;
        padre.style.display = 'inline';
        element.style.height = '100vh';
        element.style.width = '100vw';
        element.style.flexDirection = 'column';
        for(const child of element.children){
            child.style.display = 'inline';
        }
    }else{
        padre.style = '';
        element.style = '';
        sensores.style = '';
        container2.style = '';
        container3.style = '';
        for(const child of element.children){
            child.style = '';
        }
    }
    
}

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function isSessionOn(){
    if(sessionStorage.getItem("cedula_medico")){
        
        if(window.location.pathname == "/login.html"){
            window.location.href = "index.html"
        }
        document.getElementById("loginBar").style.display = "none";
    }else{
        document.getElementById("medicosBar").style.display = "none";
        document.getElementById("close").style.display = "none";
       
    }
}

function closeSession(){
    sessionStorage.clear();
}

//Funcion que sirve para graficar y leer csv, falta leer archivo desde drive
function leerCsv(){
    let angulos = [];
    let labels = [];
    Papa.parse("../assets/out.csv",{
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results){
            
            console.log(results);
            results.data.forEach(element => {
                angulos.push(parseFloat(element.Angulos).toFixed(2));
                labels.push(parseFloat(element.Tiempo).toFixed(2));
            });

            
        }
    });

    const ctx = document.getElementById('myChart');
    console.log(labels);
    console.log(angulos);
    let myChart = new Chart(ctx,{
        type:"line",
        data:{
            labels: labels,
            datasets:[{
                label: "Angulos",
                data: angulos,
                fill: false,
            }]
        }
    });

}

async function hola(){
    //https://www.googleapis.com/drive/v3/files/{fileId}?alt=media&key={APIKey}
    //https://www.googleapis.com/drive/v3/files/1CIeB0C8k5exJvAOC6g-Vb4Vo9eHoCRqG
    let peticion = await fetch('https://www.googleapis.com/drive/v3/files/1CIeB0C8k5exJvAOC6g-Vb4Vo9eHoCRqG?alt=media&key=AIzaSyAWcWx3H-TNL-pEXd_dtnGdjZ21hsBF5e8')
    .then((res) => { return res.blob(); })
    .then((data) => {
        let angulos = [];
        let labels = [];
        Papa.parse(data,{
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results){
            
            console.log(results);
            results.data.forEach(element => {
                angulos.push(parseFloat(element.Angulos).toFixed(2));
                labels.push(parseFloat(element.Tiempo).toFixed(2));
        });

            
        }
        });
        const ctx = document.getElementById('myChart');
        console.log(labels);
        console.log(angulos);
        let myChart = new Chart(ctx,{
            type:"line",
            data:{
                labels: labels,
                datasets:[{
                    label: "Angulos",
                    data: angulos,
                    fill: false,
                }]
            }
        });
    });

}

hola();
isSessionOn();
//leerCsv();

