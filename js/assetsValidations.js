/**
 * Funcion que ayuda como selector Id
 * @param {*} id parametro que se envia
 * @returns retorna el id seleccionado
 */
const selectId = id => document.getElementById(id)

 /**
  * 
  * @param {*} nombreClase 
  * @param {*} clase 
  */
const quitarClase = (nombreClase, clase) => {
	for (var i = 0; i<nombreClase.length; i++) {
		nombreClase[i].classList.remove(clase);
	}
}

/**
 * 
 * @param {*} nombreClase 
 * @param {*} clase 
 */
const agregarClase = (nombreClase, clase) => {
	for (var i = 0; i<nombreClase.length; i++) {
		nombreClase[i].classList.add(clase);
	}
}

 /**
  * 
  * @param {*} id 
  * @param {*} mensaje 
  * @param {*} boleano 
  */
 const mostrarError = (id, mensaje, boleano) => {
     $('#'+id).tooltip({
         boundary: "window",
         template:'<div class="tooltip tooltip-custom" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
         title: mensaje
     });
     if(boleano){
        $('#'+id).tooltip("show")
    }else{
        $('#'+id).tooltip("dispose")
    }
}

/**
 * 
 * @param {*} id identificador del error
 * @param {*} nombre nombre del campo
 * @param {*} mensaje Mensaje del error, puede ser un error personalizado.
 */
const validarCamposVacios = (id, nombre = "campo", mensaje = "El " + nombre + " es requerido") => {
    const campo = selectId(id)
    if(campo.value == "" || campo.value == undefined){
        mostrarError(id, mensaje, true)
    }else{
        mostrarError(id, "", false)
    }
}

const validarCamposVaciosFacturacion = (id, nombre = "campo", mensaje = "El " + nombre + " es requerido") => {
    const campo = selectId(id)
    if(campo.value == "" || campo.value == undefined){
        selectId("frmRegErrMsg").innerHTML = mensaje
        // mostrarError(id, mensaje, true)
    }else{
        selectId("frmRegErrMsg").innerHTML = ""
        // mostrarError(id, "", false)
    }
}

/**
 * 
 * @param {*} data 
 * @returns 
 */
 const validarFormulario = data => {
    let form = new FormData(data)
    $flag = 0;
    for (const [key, valor] of form.entries()) {
        let campo = selectId(key)
        const atributo = campo.getAttribute("type");
        if(atributo != "hidden"){
            if(campo.value == "" || campo.value == undefined || campo.value == NaN){
                validarCamposVacios(key);
                $flag++
            }
        }
    }
    if($flag > 0){
        return false;
    }
    return true;
}

const validarFormularioFacturacion = data => {
    let form = new FormData(data)
    $flag = 0;
    for (const [key, valor] of form.entries()) {
        let campo = selectId(key)
        const atributo = campo.getAttribute("type");
        if(atributo != "hidden"){
            if(campo.value == "" || campo.value == undefined || campo.value == NaN){
                validarCamposVaciosFacturacion(key);
                $flag++
            }
        }
    }
    if($flag > 0){
        return false;
    }
    return true;
}


/**
 * FUncion que obteene la edad de una fecha con respecto a la fecha actual
 * @param {String} fecha  Fecha de naciemiento
 * @returns {integer} edad Edad respecto a fecha
 */
const calcularEdad = fecha => {
    let hoy = new Date()
    // let split = fecha.split("-")
    let cumpleanos = new Date(fecha);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    let resta = hoy.getMonth() - cumpleanos.getMonth();
    if (resta < 0 || (resta === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
	return edad;
}

/**
 * Cambia el valor de input para que la primera letra sea mayúscula
 * @param {String} id Identificador de imput 
*/
const firstMayus = id => {
    let campo = selectId(id)
    let str = campo.value.replace(/[^A-Za-zñÑáéíóúÁÉÍÓÚ\s]/g, "");
    let words = str.split(' ');
    if(words.length>0){
        let valueComplete = "";
        words.forEach(e => {
            let cad = e;
            let tam = e.length;
            let aux = "";
            if(tam > 0){ 
                aux = cad[0].toUpperCase() + "" + cad.substring(1,tam).toLowerCase();
            }
            valueComplete += " " + aux;
        });
        campo.value = valueComplete.trim();
    }
}

/**
 * Convierte todo el valor del input a minúsculas
 * @param {String} id Identificador de input 
 */
const allMinus = id => {
    let str = selectId(id)
    if (str.value != undefined  && str.value.length > 0){
        str.value = str.value.toLowerCase().trim();
    }
}

const soloLetras = (e) => {
   let key = e.keyCode || e.which;
   let tecla = String.fromCharCode(key);
   let letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZáéíóúabcdefghijklmnñopqrstuvwxyz";
   let especiales = [8, 32, 37, 39, 46]
   let tecla_especial = false;
   for(var i in especiales){
        if(key == especiales[i]){
            tecla_especial = true;
            break;
        }
    }
    if(letras.indexOf(tecla)==-1 && !tecla_especial){
        return false;
    }
}

/**
 * 
 * @param {*} titulo 
 * @param {*} texto 
 * @param {*} tipo 
 */
const mostrarAlerta = (titulo = null ,texto, tipo) => {
    Swal.fire({
        title: titulo,
        text: texto,
        icon: tipo,
        showConfirmButton: false,
        timer: 4000,
    })
}

const mostrarEspera = (mensaje = "Procesando pago...") => {
    Swal.fire({
        allowOutsideClick: false,
         text: mensaje,
         icon: "info"
     });
     Swal.showLoading();
}

const cerrarMensaje = () => {
    Swal.close();
}

/**
 * funcion para obtener el ultimo dia de cada mes
 * @param {*} year 
 * @param {*} month 
 * @returns 
 */
 const ultimoDia = (year, month) => {
	const ultimoDia = new Date(year, month, 0).getDate();
	return ultimoDia
}

/**
 * Funcion para asignar valores a las fechas
 * @param {*} anio 
 * @param {*} mes 
 * @param {*} dia 
 */
const setUltimoDia = (anio, mes, dia) => {
	document.querySelectorAll('#'+anio+', #'+mes).forEach( item => 
		item.addEventListener("change", () => {
			let year = selectId(anio).value
			let month = selectId(mes).value
			if(year != '' && month != ''){
				let day = selectId(dia)
				day.innerHTML = "<option value=''>Dia</option>"
				day.value = ""
				for (var i = 1; i <= ultimoDia(year,month); i++) {
					j = i < 10 ? "0"+i : i
					let option = document.createElement("option")
					option.setAttribute("value", j)
					option.innerHTML = j
					day.append(option);
				}
			}
		})
	)
}

/**
 * Funcion para asignar los años actuales 
 * @param {*} id Identificador del campo
 * @param {*} inicio Se puede colocar un año de inicio dependiendo las edades
 */
const setRangoAnios = (id, min = 18) => {
    let anoActual = (new Date).getFullYear()
    let inicio = anoActual - 64
    let fin = anoActual - min

	for (var i = inicio; i <= fin; i++) {
		let elemento = selectId(id)
		let option = document.createElement("option")
		option.setAttribute("value", i)
		option.innerHTML = i
		elemento.append(option)
	}
}

const limpiarFormulario = () => {
    let clases = document.getElementsByClassName("reset");
    for (var i = 0; i<clases.length; i++) {
		clases[i].value = "";
	}
}

const validacionEdad = (anio, mes, dia, edadMinima = 18) => {
    let anioId = selectId(anio).value;
    let mesId = selectId(mes).value;
    let diaId = selectId(dia).value;
    if(anioId != '' && mesId != '' && diaId != ''){
        let fecha = anioId +'/'+ mesId +'/'+ diaId
        let edad = calcularEdad(fecha)
        if(edad < edadMinima){
            mostrarAlerta("Upps", "La edad debe ser mayor a "+edadMinima, "info");
            selectId(dia).value = "";
        }
    }
}

const validarEdadFamiliares = () => {
    // aqui debo validar la edad o mejor dicho las alertas
}

// tenemos varias opciones
// menores de 64
//  mayores a 18
// menores de 21 si ya existe uno de 64
// titular siempre es mayor de 18 y menor de 64
// beneficario de muerte siempre es mayor de 18 y menor de 64
// familiares es 1 mayor de 18 y hasta 64
// dos menores de 21
// la validacion de edad de titular y benefiairio de muerte es la misma
// debo tener un filtro con las edades de todos los familiares