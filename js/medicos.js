let tiempo = [];
let angulos_rodilla_derecha = [];
let angulos_rodilla_izquierda = [];
let angulos_pie_derecho = [];
let angulos_pie_izquierdo = [];
let angulos_tobillo_derecho = [];
let angulos_tobillo_izquierdo = [];

let graph1;
let graph2;
let graph3;
let graph4;
let graph5;
let graph6;

const registrarPacientes = () => {
    window.location = "registro.html"
}

const esMedico = () =>{
    const medico = sessionStorage.getItem('cedula_medico');
    
    let cedula = document.getElementById('cedula');
    let nombre = document.getElementById('nombre');
    let apellidos = document.getElementById('apellidos');
    let numero = document.getElementById('numero');
    let correo = document.getElementById('correo');
    
    if(medico){
        cedula.innerHTML = "Cedula: " + sessionStorage.getItem('cedula_medico');
        nombre.innerHTML =  sessionStorage.getItem('nombre_medico');
        apellidos.innerHTML = sessionStorage.getItem('apellidos_medico');
        numero.innerHTML = sessionStorage.getItem('telefono_medico');
        correo.innerHTML = sessionStorage.getItem('correo_medico');
    }else{
        window.location.href = 'index.html';
    }
}

const pacientes = async () => {
    let square = document.getElementById('pacientes_container');
    await fetch("https://parkinsonapi-production.up.railway.app/api/pacientes/"+sessionStorage.getItem("id_medico"),{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .catch( error => console.error('Error:', error))
        .then( data => {
            data.forEach(element => {
                let cadencia = element.cadencia;
                
                let paso = element.paso;
                
                if(cadencia == null){
                    cadencia = "Sin registro"
                }

                if(paso == null){
                    paso = "Sin registro"
                }
                square.innerHTML += "<div id='paciente_square' class='paciente_square'>"+
                                        "<img src='assets/paciente.png' width='100vw'>"+
                                        "<br>"+
                                        "<span id='nombre_paciente'>" + element.nombre+ "</span>"+
                                        "<br>"+
                                        "<span id='apellidos_paciente'>" + element.apellidos+ "</span>"+
                                        "<br>"+
                                        "<span id='telefono_paciente'>" + element.telefono+ "</span>"+
                                        "<br>"+
                                        "<span>" + element.correo+ "</span>"+
                                        "<br>"+
                                        "<span>" + element.direccion+ "</span>"+
                                        "<br>"+
                                        "<span> Cadencia: " + cadencia+ "</span>"+
                                        "<br>"+
                                        "<span>Largo de paso: " +paso+ "</span>"+
                                    "</div>";
            });
        })
        .catch( error => console.error('Error:', error))
}


async function mostarGraficas(clave){
    const botones = document.getElementById("botones");
    botones.style.display = 'flex';
    const arrow = document.querySelector('.fa-arrow-left');
    arrow.style.display = "flex";
    mostrarEspera("Obteniendo graficas..");
    let peticion = await fetch('https://parkinsonapi-production.up.railway.app/api/get-access-token?nombre='+clave+'res.csv'
    )
    .then((res) =>  res.json())
    .then((data) =>  data.id)
    .then(async (id) => {
        if(id == ""){
            cerrarMensaje();  
            mostrarAlerta("Upps", "No se encontraron mediciones", "error");
            const padre = document.getElementById('pacientes_container');
            const hijos = padre.children;
            
            for (const hijo of hijos) {
               if(hijo.id === 'paciente_square'){
                    hijo.style= '';
               }
            }
            botones.style = '';
            arrow.style.display = "";
            let achedos = document.getElementById('pacienteh2');
            achedos.innerHTML = "Pacientes";
            return;
        }
        let peticion2 = await fetch('https://www.googleapis.com/drive/v3/files/'+id+'?alt=media&key=AIzaSyAWcWx3H-TNL-pEXd_dtnGdjZ21hsBF5e8')
        .then((res) => { return res.blob(); })
        .then((data) => {
            
            Papa.parse(data,{
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: async function(results){
                    
                    
                    await results.data.forEach(element => {
                        angulos_rodilla_derecha.push(parseFloat(element.AnguloRodillaDerecha).toFixed(2));
                        angulos_rodilla_izquierda.push(parseFloat(element.AnguloRodillaIzquierda).toFixed(2));
                        angulos_pie_derecho.push(parseFloat(element.AngulosPieDerecho).toFixed(2));
                        angulos_pie_izquierdo.push(parseFloat(element.AngulosPieIzquierdo).toFixed(2));
                        angulos_tobillo_derecho.push(parseFloat(element.AngulosTobilloDerecho).toFixed(2));
                        angulos_tobillo_izquierdo.push(parseFloat(element.AngulosTobilloIzquierdo).toFixed(2));
                        tiempo.push(parseFloat(element.Tiempo).toFixed(2));
                    });

                    const rodillaD = document.getElementById('rodillaD');
                    const rodillaI = document.getElementById('rodillaI');
                    const pieD = document.getElementById('pieD');
                    const pieI = document.getElementById('pieI');
                    const tobilloD = document.getElementById('tobilloD');
                    const tobilloI = document.getElementById('tobilloI');
                   
                    
                    graph1 = new Chart(rodillaD,{
                        type:"line",
                        data:{
                            labels: tiempo,
                            datasets:[{
                                label: "Angulos Rodilla Derecha",
                                data: angulos_rodilla_derecha,
                                fill: false,
                                borderColor: '#f2ac41',
                                backgroundColor: '#f2ac41',
                            }]
                        },
                        options:{
                            scales:{
                                y:{
                                    title:{
                                        display: true,
                                        text: 'Angulos[°]'
                                    } 
                                },
                                x:{
                                    title:{
                                        display: true,
                                        text: 'Tiempo[s]'
                                    } 
                                }
                            },
                            plugins: {
                                zoom: {
                                    zoom: {
                                        wheel: {
                                            enabled: true,
                                        },
                                        pinch: {
                                            enabled: true
                                        },
                                        mode: 'xy',
                                    }
                                }
                            }
                        }
                    });

                    graph2 = new Chart(rodillaI,{
                        type:"line",
                        data:{
                            labels: tiempo,
                            datasets:[{
                                label: "Angulos Rodilla Izquierda",
                                data: angulos_rodilla_izquierda,
                                fill: false,
                                borderColor: '#f28541',
                                backgroundColor: '#f28541'
                            }]
                        },
                        options:{
                            scales:{
                                y:{
                                    title:{
                                        display: true,
                                        text: 'Angulos[°]'
                                    } 
                                },
                                x:{
                                    title:{
                                        display: true,
                                        text: 'Tiempo[s]'
                                    } 
                                }
                            },
                            plugins: {
                                zoom: {
                                    zoom: {
                                        wheel: {
                                            enabled: true,
                                        },
                                        pinch: {
                                            enabled: true
                                        },
                                        mode: 'xy',
                                    }
                                }
                            }
                        }
                    });

                    graph3 = new Chart(pieD,{
                        type:"line",
                        data:{
                            labels: tiempo,
                            datasets:[{
                                label: "Angulos Pie Derecho",
                                data: angulos_pie_derecho,
                                fill: false,
                                borderColor: '#50d136',
                                backgroundColor: '#50d136'
                                
                            }]
                        },
                        options:{
                            scales:{
                                y:{
                                    title:{
                                        display: true,
                                        text: 'Angulos[°]'
                                    } 
                                },
                                x:{
                                    title:{
                                        display: true,
                                        text: 'Tiempo[s]'
                                    } 
                                }
                            },
                            plugins: {
                                zoom: {
                                    zoom: {
                                        wheel: {
                                            enabled: true,
                                        },
                                        pinch: {
                                            enabled: true
                                        },
                                        mode: 'xy',
                                    }
                                }
                            }
                        }
                    });

                    graph4 = new Chart(pieI,{
                        type:"line",
                        data:{
                            labels: tiempo,
                            datasets:[{
                                label: "Angulos Pie Izquierdo",
                                data: angulos_pie_izquierdo,
                                fill: false,
                                borderColor: '#1db331',
                                backgroundColor: '#1db331'
                                
                            }]
                        },
                        options:{
                            scales:{
                                y:{
                                    title:{
                                        display: true,
                                        text: 'Angulos[°]'
                                    } 
                                },
                                x:{
                                    title:{
                                        display: true,
                                        text: 'Tiempo[s]'
                                    } 
                                }
                            },
                            plugins: {
                                zoom: {
                                    zoom: {
                                        wheel: {
                                            enabled: true,
                                        },
                                        pinch: {
                                            enabled: true
                                        },
                                        mode: 'xy',
                                    }
                                }
                            }
                        }
                    });

                    graph5 = new Chart(tobilloD,{
                        type:"line",
                        data:{
                            labels: tiempo,
                            datasets:[{
                                label: "Angulos Tobillo Derecho",
                                data: angulos_tobillo_derecho,
                                fill: false,
                                borderColor: '#36d1ba',
                                backgroundColor: '#36d1ba'
                                
                            }]
                        },
                        options:{
                            scales:{
                                y:{
                                    title:{
                                        display: true,
                                        text: 'Angulos[°]'
                                    } 
                                },
                                x:{
                                    title:{
                                        display: true,
                                        text: 'Tiempo[s]'
                                    } 
                                }
                            },
                            plugins: {
                                zoom: {
                                    zoom: {
                                        wheel: {
                                            enabled: true,
                                        },
                                        pinch: {
                                            enabled: true
                                        },
                                        mode: 'xy',
                                    }
                                }
                            }
                        }
                    });

                    graph6 = new Chart(tobilloI,{
                        type:"line",
                        data:{
                            labels: tiempo,
                            datasets:[{
                                label: "Angulos Tobillo Izquierdo",
                                data: angulos_tobillo_izquierdo,
                                fill: false,
                                borderColor: '#368bd1',
                                backgroundColor: '#368bd1'
                            }]
                        },
                        options:{
                            scales:{
                                y:{
                                    title:{
                                        display: true,
                                        text: 'Angulos[°]'
                                    } 
                                },
                                x:{
                                    title:{
                                        display: true,
                                        text: 'Tiempo[s]'
                                    } 
                                }
                            },
                            plugins: {
                                zoom: {
                                    zoom: {
                                        wheel: {
                                            enabled: true,
                                        },
                                        pinch: {
                                            enabled: true
                                        },
                                        mode: 'xy',
                                    }
                                }
                            }
                        }
                    });
                    document.getElementById("start_button").click();
                    cerrarMensaje();
                }
            });
        });
    })
}

const regresarPacientes = (element) =>{
    const botones = document.getElementById("botones");
    const arrow = document.querySelector('.fa-arrow-left');
    const padre = document.getElementById('pacientes_container');
    const hijos = padre.children;
    let achedos = document.getElementById('pacienteh2');
    let grafica = document.getElementById(element.getAttribute("ref"));
    let graficas  = [graph1,graph2,graph3,graph4,graph5,graph6]; 
    grafica.style.display = "none";    
    for (const hijo of hijos) {
        if(hijo.id === 'paciente_square'){
            hijo.style= '';
        }
    }
    botones.style = '';
    arrow.style.display = "";

    for (const graph of graficas) {
        graph.destroy();
    }
   
    tiempo = [];
    angulos_rodilla_derecha = [];
    angulos_rodilla_izquierda = [];
    angulos_pie_derecho = [];
    angulos_pie_izquierdo = [];
    angulos_tobillo_derecho = [];
    angulos_tobillo_izquierdo = [];
    achedos.innerHTML = "Pacientes";
}

function init(){
    const padre = document.getElementById('pacientes_container');
    let achedos = document.getElementById('pacienteh2');
    let nombre = ""
    let telefono = ""
    let apellidos = ""
    padre.addEventListener('click', (event) => {
        if(event.target.parentElement.id  === 'paciente_square'){
            nombre = event.target.parentElement.children.nombre_paciente.innerHTML;
            telefono = event.target.parentElement.children.telefono_paciente.innerHTML;
            apellidos = event.target.parentElement.children.apellidos_paciente.innerHTML
        }else{
            nombre = event.target.children.nombre_paciente.innerHTML;
            telefono = event.target.children.telefono_paciente.innerHTML;
            apellidos = event.target.children.apellidos_paciente.innerHTML
        }
        console.log(nombre,telefono)
        if(event.target.id === 'paciente_square' || event.target.parentElement.id  === 'paciente_square'){
            const hijos = padre.children;
            for (const hijo of hijos) {
               if(hijo.id === 'paciente_square'){
                    hijo.style.display = 'none';
               }
            }
            
            let clave = nombre.substring(0,3).toUpperCase() + telefono.slice(-4);
            achedos.innerHTML = nombre+" "+apellidos;
            mostarGraficas(clave);
        }

        //comentario redeploy
        
    })
}



init();
esMedico();
pacientes();