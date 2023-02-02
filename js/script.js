


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

isSessionOn();


