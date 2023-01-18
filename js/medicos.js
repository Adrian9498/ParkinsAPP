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
                square.innerHTML += "<div id='paciente_square' class='paciente_square'>"+
                                        "<img src='assets/paciente.png' width='100vw'>"+
                                        "<br>"+
                                        "<span>" + element.nombre+ "</span>"+
                                        "<br>"+
                                        "<span>" + element.apellidos+ "</span>"+
                                        "<br>"+
                                        "<span>" + element.telefono+ "</span>"+
                                        "<br>"+
                                        "<span>" + element.correo+ "</span>"+
                                        "<br>"+
                                        "<span>" + element.direccion+ "</span>"+
                                    "</div>";
            });
        })
        .catch( error => console.error('Error:', error))
}


async function mostarGraficas(){

    let peticion = await fetch('http://localhost:3000/api/get-access-token?nombre=ADR7315res.csv'
    )
    .then((res) =>  res.json())
    .then((data) =>  data.id)
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
                complete: async function(results){
                    
                    console.log(results);
                    await results.data.forEach(element => {
                        angulos.push(parseFloat(element.AnguloRodillaDerecha).toFixed(2));
                        labels.push(parseFloat(element.Tiempo).toFixed(2));
                    });

                    const ctx = document.getElementById('myChart');
                    console.log(labels);
                    console.log(angulos);
                    
                    new Chart(ctx,{
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
            });
        });
    })
}

function init(){
    const padre = document.getElementById('pacientes_container');
    const grafica = document.getElementById('myChart');
    padre.addEventListener('click', (event) => {
        if(event.target.id === 'paciente_square' || event.target.parentElement.id  === 'paciente_square'){
            const hijos = padre.children;
            for (const hijo of hijos) {
               if(hijo.id === 'paciente_square'){
                    hijo.style.display = 'none';
               }
            }
            grafica.style.display = 'block';
            mostarGraficas();
        }

        
        
    })
}

init();
esMedico();
pacientes();