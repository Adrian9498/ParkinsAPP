var access_token; 
function inClient() {
    const client = google.accounts.oauth2.initTokenClient({
        client_id: '749662371198-vgqiahi6cqfg079i2n2k0nase6tcm7st.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/drive.readonly',
        callback: (response) => {
         access_token = response.access_token;
        },
      });
    client.requestAccessToken();

    
}


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

async function hola(){
    
    //console.log(GoogleAuth);
    //APIKEY AIzaSyAWcWx3H-TNL-pEXd_dtnGdjZ21hsBF5e8
    // CLIENTID 749662371198-vgqiahi6cqfg079i2n2k0nase6tcm7st.apps.googleusercontent.com
    //https://www.googleapis.com/drive/v3/files?q=name%3D%20%27res.csv%27&key=AIzaSyAWcWx3H-TNL-pEXd_dtnGdjZ21hsBF5e8
    let peticion = await fetch('https://www.googleapis.com/drive/v3/files?q=name%3D%20%27out.csv%27&key=AIzaSyAWcWx3H-TNL-pEXd_dtnGdjZ21hsBF5e8',{
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    })
    .then((res) =>  res.json())
    .then((data) =>  data.files[0].id)
    .then(async (id) => {
        let peticion2 = await fetch('https://www.googleapis.com/drive/v3/files/'+id+'?alt=media&key=AIzaSyAWcWx3H-TNL-pEXd_dtnGdjZ21hsBF5e8')
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
    })


}


inClient();
isSessionOn();
//leerCsv();

