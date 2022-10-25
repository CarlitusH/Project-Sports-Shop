/***************************************************************************************** 
 *                              IMPORTACIONES
******************************************************************************************/
import {recuperarDataLocalStorage} from "../src/functions/recuperarDataLocal.js";
import {Usuario} from "../src/models/usuario.js";

/***************************************************************************************** 
 *                              Constantes/variables globales
******************************************************************************************/
const btnRegistro = document.getElementById("btn-registro");
const btnUsuariosSesion = document.getElementById("btnUsuariosSesion");
const formulario = document.getElementById("formRegistroUsers");
const file = "infoUsuarios.json";

/***************************************************************************************** 
 *       FUNCIONALIDAD: Cambio de página hacia el registro de Clientes
******************************************************************************************/
if(btnRegistro){
    btnRegistro.addEventListener("click", (e)=>{
        e.preventDefault();
        setTimeout(() => {
            location.href = "./registro.html";
        }, 500)
    
    });
}

if(btnUsuariosSesion){
/***************************************************************************************** 
*       FUNCIONALIDAD: Evento Click - Validación de Login de usuarios
******************************************************************************************/
    btnUsuariosSesion.addEventListener("click", (e)=>{
        
        e.preventDefault();
        const txtUsuarioId = document.getElementById("txtUsuarioId");
        const txtPassword = document.getElementById("password");
        
        recuperarDataLocalStorage(file,"usuarios")
        .then(dataUsuarios=>{
            const usuarioFilter = parsearDataUsuarios(dataUsuarios).find(objUser=>objUser.getUsuario === txtUsuarioId.value && objUser.getPassword === txtPassword.value);
            
            const divMensajeError = document.createElement("div");
            divMensajeError.id = "div-error";
            if(!usuarioFilter){
                divMensajeError.style.marginTop = "2rem";
                divMensajeError.className = "alert alert-danger";
                divMensajeError.role = "alert";
                divMensajeError.textContent = "Error, con la validación de credenciales, vuelva a intentarlo";
                formulario.appendChild(divMensajeError);
            }else{
                location.href = "../index.html?usuario="+usuarioFilter.getUsuario;
            }

        })
        .catch(error=>console.log(error));
    })


/*****************************************************************************************
 *            FUNCIONALIDAD: PARSEO DE DATOS PARA CREAR OBJETOS DE TIPO USUARIO
******************************************************************************************/
    const parsearDataUsuarios = (data)=>{

        const listaUsuarios = [];
        data.forEach(({usuario, nombre, paterno, materno, correo, estado, password, perfil})=>{
        const objUsuario = new Usuario(nombre, paterno, materno, correo, password, usuario,estado,perfil);
        listaUsuarios.push(objUsuario);
        })    

        return listaUsuarios.sort((objUser1, objUser2)=> objUser1.getPerfilUsuario - objUser2.getPerfilUsuario);
    }

}