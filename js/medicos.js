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

esMedico();
pacientes();