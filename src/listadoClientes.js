/***************************************************************************************** 
 *                              IMPORTACIONES
******************************************************************************************/
import {Cliente} from './models/cliente.js';
import {recuperarDataLocalStorage,modificarListaLocalStorage} from './functions/recuperarDataLocal.js';
import {recuperarParametrosUrl,validarDatosInput} from "./utils/utilsVarios.js";


/***************************************************************************************** 
 *                              Constantes globales/Controles Html
******************************************************************************************/
const cuerpoTabla = document.getElementById("cuerpo-tabla");
const btnFiltroNombre = document.getElementById("btnFiltroNombre");
const btnActualizarCliente =  document.getElementById("btnActualizarCliente");

const txtId = document.getElementById("txtId");
const txtNombre = document.getElementById("nombre");
const txtPaterno =  document.getElementById("paterno");       
const txtMaterno =  document.getElementById("materno");       
const txtEmail =  document.getElementById("email");       
const dtpNacimiento =  document.getElementById("nacimiento");
const rbtEstado = document.getElementsByName("estado");       



const file = "infoClientes.json";
const keyDataCliente = "clientes";


/***************************************************************************************** 
 *     FUNCIONALIDAD: Evento carga, carga inicial de Clientes: listadoClientes.html
******************************************************************************************/
if(cuerpoTabla){
    window.addEventListener("load", (e)=>{
        
        e.preventDefault();
        recuperarDataLocalStorage(file, keyDataCliente)
        .then(data=>{
            const dataRecuperada = parsearDataClientes(data);
            cargarDataClientesHtml(dataRecuperada);
        })
        .catch(error=>console.log(error));
    });
}
    
const cargarDataClientesHtml = (arregloClientes)=>{

    let urlInicial = document.URL;
    for (const objCliente of arregloClientes) { 
        
        //Nodo contenedor Table Row
		const nodoTR = document.createElement("tr");
        nodoTR.id = objCliente.getIdCliente;

        //Nodo Table Header 
		const nodoTH = document.createElement("th");
		nodoTH.scope = "row";
		nodoTH.textContent = objCliente.getIdCliente;
        
        //Nodo Nombre
        const nodoTD1 = document.createElement("td");
        nodoTD1.textContent = objCliente.getNombreCliente;
        
        //Nodo Apellido Paterno
        const nodoTD2 = document.createElement("td");
        nodoTD2.textContent = objCliente.getApellidoPaternoCliente;
        
        //Nodo Apellido Materno
        const nodoTD3 = document.createElement("td");
        nodoTD3.textContent = objCliente.getApellidoMaternoCliente;

        //Nodo Correo
        const nodoTD4 = document.createElement("td");
        nodoTD4.textContent = objCliente.getCorreoCliente;

        //Nodo Estado
        const nodoTD5 = document.createElement("td");
        nodoTD5.textContent = objCliente.getEstadoRegistroCliente?"Activo":"Inactivo";

        //Nodo Fecha Nacimiento
        const nodoTD6 = document.createElement("td");
        nodoTD6.textContent = objCliente.formatearFecha(objCliente.getFechaNacimientoCliente);

        //Nodo Enlace actualización
        const nodoTD7 = document.createElement("td");
        nodoTD7.style.textAlign="center";
        nodoTD7.innerHTML = 
        `<a href="./actualizarCliente.html?id=${objCliente.getIdCliente}&nombre=${objCliente.getNombreCliente}&paterno=${objCliente.getApellidoPaternoCliente}&materno=${objCliente.getApellidoMaternoCliente}&email=${objCliente.getCorreoCliente}&nacimiento=${objCliente.getFechaNacimientoCliente}&estado=${objCliente.getEstadoRegistroCliente}" id="linkUpdateCliente"> <img src="../img/update.png" alt="actualizar Cliente"></a>`;
        
        //Nodo Enlace para borrar un registro
        const enlaceBorrar = document.createElement("a");
        enlaceBorrar.innerHTML =  `<img src="../img/delete.png" alt="Borrar Cliente">`;
        enlaceBorrar.href = `${urlInicial}`;
        enlaceBorrar.onclick = (e)=>{
            e.preventDefault();
            Swal.fire({
                title: "Estas seguro de borrar el registro?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Borrar Registro",
                denyButtonText: `Cancelar Borrado`,
              }).then((result) => {
            
                if (result.isConfirmed) {
                    Swal.fire("Registro Borrado correctamente!", "", "success");
                    modificarListaLocalStorage("id", objCliente.getIdCliente ,{},keyDataCliente,file,2);
                    setTimeout(()=>{
                        location.reload();
                    },2000)
                }else if (result.isDenied) {
                    
                    Swal.fire("Solicitud cancelada", "", "info");
                }
            });

        }
        const nodoTD8 = document.createElement("td");
        nodoTD8.style.textAlign="center";
        nodoTD8.appendChild(enlaceBorrar);
      
        nodoTR.appendChild(nodoTH);
		nodoTR.appendChild(nodoTD1);
		nodoTR.appendChild(nodoTD2);
		nodoTR.appendChild(nodoTD3);
		nodoTR.appendChild(nodoTD4);
		nodoTR.appendChild(nodoTD5);
		nodoTR.appendChild(nodoTD6);
        nodoTR.appendChild(nodoTD7);
        nodoTR.appendChild(nodoTD8);
        urlInicial="";

        cuerpoTabla.appendChild(nodoTR);
    }
}


/***************************************************************************************** 
 * FUNCIONALIDAD: Evento click, filtro de clientes por contenido en el txtFiltroNombre
******************************************************************************************/
if(cuerpoTabla && btnFiltroNombre){

    btnFiltroNombre.addEventListener("click", (e)=>{
        e.preventDefault();
        
        recuperarDataLocalStorage(file, keyDataCliente)
        .then(data=>{
            const listaDataClientes = parsearDataClientes(data);
            let valorFiltro = document.getElementById("txtFiltroNombre").value;
            const listaFiltrada = listaDataClientes.filter(objCli=>objCli.getNombreCliente.toUpperCase().includes(valorFiltro.toUpperCase().trim()));
            funcionLimpiarTabla();
            cargarDataClientesHtml(listaFiltrada);
        })
        .catch(error=>console.log(error));
    })
}


/*****************************************************************************************
 *            FUNCIONALIDAD: PARSEO DE DATOS PARA CREAR OBJETOS DE TIPO CLIENTE
******************************************************************************************/
const parsearDataClientes = (data)=>{

    const listaClientes = [];
    data.forEach(({id, nombre, paterno, materno, email, nacimiento:{anio, mes, dia}, estado})=>{
        const objCliente = new Cliente(id, nombre, paterno, materno, email, new Date(anio, mes, dia), estado);
        listaClientes.push(objCliente);
    })    

    return listaClientes.sort((objCli1, objCli2)=> objCli1.getIdCliente - objCli2.getIdCliente);
}


/**
 * Función que limpia la tabla principal para aplicar el filtro
 * 
 */
const funcionLimpiarTabla = ()=>{
    for (let i = cuerpoTabla.childNodes.length; i>0; i--) {
        
        if(cuerpoTabla.childNodes[i] === undefined){
            continue;
        }
        cuerpoTabla.removeChild(cuerpoTabla.childNodes[i]);
    }
}


/***************************************************************************************** 
 * FUNCIONALIDAD: CARGA INFORMACIÓN DE UN CLIENTE EN ESPECÍFICO, PREVIAMENTE SE VALIDA 
 *                QUE EXISTA EL CONTROL DE BOTÓN QUE ACTUALIZA INFORMACIÓN, FUNCIÓN HECHA 
 *                PARA EL HTML: actualizarCliente.html
******************************************************************************************/
if(btnActualizarCliente){

    window.addEventListener("load", (e)=>{
        e.preventDefault();
  
        //Asignando valores a los controles 
        const paramUrl = recuperarParametrosUrl();
        txtId.value = paramUrl.get("id");
        txtNombre.value = paramUrl.get("nombre");
        txtPaterno.value =  paramUrl.get("paterno");
        txtMaterno.value =  paramUrl.get("materno");
        txtEmail.value =  paramUrl.get("email");
        
        if(paramUrl.get("estado") === "true"){
            rbtEstado.item(0).checked = true;
        }else{
            rbtEstado.item(1).checked = true;
        }
        
        const fecha = new Date(paramUrl.get("nacimiento"));
        let objFormater = new Intl.DateTimeFormat("default",{"day":"2-digit", "month":"2-digit", "year":"numeric"});
        
        const separador = objFormater.format(fecha).includes("-")?"-":"/";
        
        let formato = objFormater.format(fecha).split(separador);
        
        let mes = Number.parseInt(formato[1]);
        mes = mes<10?`0${mes}`:`${mes}`;
        dtpNacimiento.value  = `${formato[2]}-${mes}-${formato[0]}`;
    
    });


/***************************************************************************************** 
 * FUNCIONALIDAD: EVENTO DE ACTUALIZACIÓN DE INFORMACIÓN EN LOCALSTORAGE
******************************************************************************************/
    btnActualizarCliente.addEventListener("click", (e)=>{
        e.preventDefault();
        
        //Validamos datos previo al envío
        const objInputValidador = {
            nombre:{    
                valor:txtNombre.value,
                tipo:"texto"
            },
            paterno:{
                valor: txtPaterno.value,
                tipo:"texto"
            },
            materno:{
                valor:txtMaterno.value,
                tipo:"texto"
            },
            email:{
                valor:txtEmail.value,
                tipo:"correo"
            },
        }
        
        const rptaValidacionInput = validarDatosInput(objInputValidador);
        if(rptaValidacionInput.mensaje===""){
            const valorEstado =  rbtEstado.item(0).checked===true?true:false;
            const valorFecha = dtpNacimiento.value.split("-");
            const mes = +valorFecha[1]===0?0:+valorFecha[1]-1;
            const objClienteMod = {
                id:+txtId.value,
                nombre:txtNombre.value,
                paterno:txtPaterno.value,
                materno:txtMaterno.value,
                email:txtEmail.value,
                nacimiento:{
                    anio:+valorFecha[0],
                    mes:mes,
                    dia:+valorFecha[2]
                },
                estado:valorEstado
            };
            
            modificarListaLocalStorage("id", objClienteMod.id,objClienteMod,keyDataCliente,file,1);
            location.href = "./listadoClientes.html";
        }else{
            const divAlert = document.getElementById("mensaje-error");
            divAlert.className = "alert alert-danger";
            divAlert.role = "alert";
            divAlert.textContent = rptaValidacionInput.mensaje;
        }
    })
}