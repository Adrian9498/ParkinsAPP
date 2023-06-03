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
        element.style.width = '93%';
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
        element.style.width = '93%';
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
        element.style.width = '93%';
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
        element.style.width = '93%';
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
        element.style.width = '93%';
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

function ocultarGrafica(element){
    
    let nombre = element.getAttribute("ref");
   
    let graficaVisible = document.getElementById(nombre);
    let botones = document.getElementById("botones")
    let padre = document.getElementById("pacientes_container");
    for(const hijo of padre.children){
        hijo.style.display = 'none';
    }
    botones.style.display = 'flex';
    graficaVisible.style.display = "flex";
    document.querySelector('.fa-arrow-left').setAttribute('ref',nombre);
}

async function register(){
    let object = {};
    datos = new FormData();
    datos.append("correo",document.getElementById("correo_medico").value);
    datos.append("password",document.getElementById("pass_medico").value);
    datos.append("nombre",document.getElementById("nombre_medico").value);
    datos.append("apellidos",document.getElementById("apellidos_medico").value);
    datos.append("cedula",document.getElementById("cedula_medico").value);
    datos.append("telefono",document.getElementById("numero_medico").value);

    if(document.getElementById("correo_medico").value == ""
        ||document.getElementById("pass_medico").value == ""
        ||document.getElementById("nombre_medico").value == ""
        ||document.getElementById("apellidos_medico").value == ""
        ||document.getElementById("cedula_medico").value == ""
        ||document.getElementById("numero_medico").value == ""){
        mostrarAlerta("Upps", "Revisa tus datos", "error");
        return;
    }

    datos.forEach((value,key) => {
        object[key] = value;
    });

    let jsona = JSON.stringify(object);
    mostrarEspera("Iniciando sesión..");
    await fetch("https://parkinsonapi-production.up.railway.app/api/createDoctor",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:jsona,
    })
        .then(res => res.json())
        .catch( error => console.error('Error:', error))
        .then( data => {

            cerrarMensaje();
            console.log(data.id_doctor);
            
            if(data.id_doctor){
                mostrarAlerta("Info", "Se creo tu registro", "info");
                window.location.href = 'login.html';
                return;
            }
            mostrarAlerta("Upps", "Revisa tus datos", "error");
        })
        .catch( error => console.error('Error:', error))
}

async function registerPaciente(){
    let object = {};
    datos = new FormData();
    datos.append("correo",document.getElementById("correo_paciente").value);
    datos.append("edad",document.getElementById("edad_paciente").value);
    datos.append("nombre",document.getElementById("nombre_paciente").value);
    datos.append("apellidos",document.getElementById("apellidos_paciente").value);
    datos.append("direccion",document.getElementById("direccion_paciente").value);
    datos.append("telefono",document.getElementById("numero_paciente").value);
    datos.append("peso",document.getElementById("peso_paciente").value);
    datos.append("estatura",document.getElementById("estatura_paciente").value);
    datos.append("id_doctor",sessionStorage.getItem("id_medico"));

    if(document.getElementById("correo_paciente").value == ""
        ||document.getElementById("edad_paciente").value == ""
        ||document.getElementById("nombre_paciente").value == ""
        ||document.getElementById("apellidos_paciente").value == ""
        ||document.getElementById("direccion_paciente").value == ""
        ||document.getElementById("peso_paciente").value == ""
        ||document.getElementById("estatura_paciente").value == ""
        ||document.getElementById("numero_paciente").value == ""){
        mostrarAlerta("Upps", "Revisa tus datos", "error");
        return;
    }

    datos.forEach((value,key) => {
        object[key] = value;
    });

    let jsona = JSON.stringify(object);
    mostrarEspera("Iniciando sesión..");
    await fetch("https://parkinsonapi-production.up.railway.app/api/createPaciente",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:jsona,
    })
        .then(res => res.json())
        .catch( error => console.error('Error:', error))
        .then( data => {

            cerrarMensaje();
            console.log(data.id_doctor);
            
            if(data.id_doctor){
                mostrarAlerta("Info", "Se creo tu registro", "info");
                window.location.href = 'medicos.html';
                return;
            }
            mostrarAlerta("Upps", "Revisa tus datos", "error");
        })
        .catch( error => console.error('Error:', error))
}

isSessionOn();


