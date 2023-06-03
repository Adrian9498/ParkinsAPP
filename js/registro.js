

const esMedicoRegistro = () =>{
    const medico = sessionStorage.getItem('cedula_medico');

    if(!medico){
        window.location.href = 'index.html';
    }
}

esMedicoRegistro();