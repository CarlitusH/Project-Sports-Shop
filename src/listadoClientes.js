/***************************************************************************************** 
 *                              IMPORTACIONES
******************************************************************************************/
import {Cliente} from './models/cliente.js';




/***************************************************************************************** 
 *                              Constantes/variables globales
******************************************************************************************/
const cuerpoTabla = document.getElementById("cuerpo-tabla");
const btnFiltroNombre = document.getElementById("btnFiltroNombre");


/***************************************************************************************** 
 *                  FUNCIONALIDAD: Evento carga, carga inicial de Clientes
******************************************************************************************/
window.addEventListener("load", (e)=>{

    e.preventDefault();    
    const listaDataClientes = procesarDataClientes();
    cargarDataClientesHtml(listaDataClientes);

});

const cargarDataClientesHtml = (arregloClientes)=>{

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

        nodoTR.appendChild(nodoTH);
		nodoTR.appendChild(nodoTD1);
		nodoTR.appendChild(nodoTD2);
		nodoTR.appendChild(nodoTD3);
		nodoTR.appendChild(nodoTD4);
		nodoTR.appendChild(nodoTD5);
		nodoTR.appendChild(nodoTD6);

        cuerpoTabla.appendChild(nodoTR);
    }

}

/***************************************************************************************** 
 * FUNCIONALIDAD: Evento click, filtro de clientes por contenido en el txtFiltroNombre
******************************************************************************************/
btnFiltroNombre.addEventListener("click", (e)=>{
    e.preventDefault();
    
    const listaDataClientes = procesarDataClientes();
    let valorFiltro = document.getElementById("txtFiltroNombre").value;
    const listaFiltrada = listaDataClientes.filter(objCli=>objCli.getNombreCliente.toUpperCase().includes(valorFiltro.toUpperCase().trim()));
    funcionLimpiarTabla();
    cargarDataClientesHtml(listaFiltrada);

})


/*****************************************************************************************
 *                          FUNCIONALIDAD: CARGA DE INFORMACIÓN DE CLIENTES
******************************************************************************************/

const procesarDataClientes = ()=>{
    const listaClientes = [];

    const objClient1 = new Cliente(321, "Miguel", "Perez", "Rojas", "mperezr@mail.com", new Date(1995,11,12),true);
    const objClient2 = new Cliente(312, "Carlos", "Sanchez", "Rivas", "csanchezr@mail.com", new Date(1991,9,22),true);
    const objClient3 = new Cliente(322, "Juan", "Luna", "Galvez", "jlunag@mail.com", new Date(1990,10,15),true);
    const objClient4 = new Cliente(332, "Diego", "Fernandez", "Vela", "dfernandezv@mail.com", new Date(1989,2,25),true);
    const objClient5 = new Cliente(351, "Daniel", "Murga", "Flores", "dmurgaf@mail.com", new Date(1992,7,3),true);
    const objClient6 = new Cliente(343, "César", "Nizama", "Hurtado", "cnizamah@mail.com", new Date(1999,5,21),true);
    const objClient7 = new Cliente(362, "Jorge", "Cáceres", "Lecca", "jcaceresl@mail.com", new Date(1989,3,23),true);
    const objClient8 = new Cliente(336, "Carlos", "Rubio", "Prieto", "crubiov@mail.com", new Date(1982,9,18),true);
    const objClient9 = new Cliente(376, "Augusto", "Morelli", "Miranda", "amorellim@mail.com", new Date(1979,6,14),true);
    const objClient10 = new Cliente(381, "Angel", "García", "García", "agarciaa@mail.com", new Date(1981,11,23),true);

    listaClientes.push(objClient1);
    listaClientes.push(objClient2);
    listaClientes.push(objClient3);
    listaClientes.push(objClient4);
    listaClientes.push(objClient5);
    listaClientes.push(objClient6);
    listaClientes.push(objClient7);
    listaClientes.push(objClient8);
    listaClientes.push(objClient9);
    listaClientes.push(objClient10);

    //listarDataClientesConsola(listaClientes);

    return listaClientes.sort((objCli1, objCli2)=> objCli1.getIdCliente - objCli2.getIdCliente);
}

/**
 * Función que lista todos los clientes en consola
 * 
 * @param {Cliente[]} lista 
 */

const listarDataClientesConsola = (lista)=>{
    console.info("%c****************************************************** Listado de Clientes **************************************************************", "color:red");
    for (const objCli of lista) {
        console.log("%c"+objCli, "color:cyan");
    }
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