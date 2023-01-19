async function logIn(){
    let object = {};
    datos = new FormData();
    datos.append("correo",document.getElementById("correo_medico").value);
    datos.append("password",document.getElementById("pass_medico").value);
    
    datos.forEach((value,key) => {
        object[key] = value;
    });

    let jsona = JSON.stringify(object);
    mostrarEspera("Iniciando sesión..");
    await fetch("https://parkinsonapi-production.up.railway.app/api/login",{
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
            console.log(data[0]);
            
            if(data.length > 0){
                sessionStorage.setItem("id_medico",data[0].id_doctor);
                sessionStorage.setItem("cedula_medico",data[0].cedula);
                sessionStorage.setItem("correo_medico",data[0].correo);
                sessionStorage.setItem("nombre_medico",data[0].nombre);
                sessionStorage.setItem("apellidos_medico",data[0].apellidos);
                sessionStorage.setItem("telefono_medico",data[0].telefono);
                window.location.href = 'medicos.html';
                return;
            }
            mostrarAlerta("Upps", "Revisa tus credenciales", "error");
        })
        .catch( error => console.error('Error:', error))
}

