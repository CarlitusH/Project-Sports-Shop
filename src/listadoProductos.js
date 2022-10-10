/***************************************************************************************** 
 *                              IMPORTACIONES
******************************************************************************************/
import {Producto} from './models/producto.js';
import {dataCategoriaProductos} from './utils/utilsVarios.js'



/***************************************************************************************** 
 *                              Constantes/variables globales
******************************************************************************************/
const cuerpoTabla = document.getElementById("cuerpo-tabla-productos");



/***************************************************************************************** 
 *                             FUNCIONALIDAD: Evento de carga de Productos
******************************************************************************************/
window.addEventListener("load", (e)=>{
    e.preventDefault();
    const listaDataProductos  = procesarDataProductos();
    cargarDataProductosHtml(listaDataProductos);
})


const cargarDataProductosHtml = (listaProds)=>{
    
    const descripcionCategoria = dataCategoriaProductos();
    
    for (const objProd of listaProds) {
        
        //Nodo contenedor Table Row
		const nodoTR = document.createElement("tr");
        nodoTR.id = objProd.getIdProducto;

        //Nodo Table Header 
		const nodoTH = document.createElement("th");
		nodoTH.scope = "row";
		nodoTH.textContent = objProd.getIdProducto;
        
        //Nodo Nombre
        const nodoTD1 = document.createElement("td");
        nodoTD1.textContent = objProd.getNombreProducto;
        
        //Nodo Descripción
        const nodoTD2 = document.createElement("td");
        nodoTD2.textContent = objProd.getDescripcionProducto;
        
        //Nodo Precio Unitario
        const nodoTD3 = document.createElement("td");
        nodoTD3.textContent = objProd.getPrecioUnitarioProducto;

        //Nodo Descuento
        const nodoTD4 = document.createElement("td");
        nodoTD4.textContent = objProd.getDescuentoProducto + " %";

        //Nodo Categoría
        const nodoTD5 = document.createElement("td");
        nodoTD5.textContent = descripcionCategoria.get(+objProd.getCategoriaProducto);

        //Nodo Precio Final
        const nodoTD6 = document.createElement("td");
        nodoTD6.textContent = objProd.getPrecioFinalProducto;

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
 *                          FUNCIONALIDAD: CARGA DE INFORMACIÓN DE PRODUCTOS
******************************************************************************************/

 const procesarDataProductos = ()=>{
    const listaProductos = [];
    
    const objProducto1 = new Producto(123, "Botines Trekking", "Calzado de aventura gore-tex verde", 710.15, "2", 0, 3);
    objProducto1.setPrecioFinalProducto = objProducto1.calcularPrecioFinalProducto();
    
    const objProducto2 = new Producto(124, "Casaca Térmica", "Cazaca Columbia Omni-Heat", 963.25, "1", 0, 6);
    objProducto2.setPrecioFinalProducto = objProducto2.calcularPrecioFinalProducto();
    
    const objProducto3 = new Producto(125, "Zapatilla Merrell", "Calzado trekking merrell, planta vibrom", 628.50, "2", 0, 5);
    objProducto3.setPrecioFinalProducto = objProducto3.calcularPrecioFinalProducto();
    
    const objProducto4 = new Producto(126, "Botines Mammut", "Calzado de aventura gore-tex azul", 880.18, "2", 0, 6);
    objProducto4.setPrecioFinalProducto = objProducto4.calcularPrecioFinalProducto();
    
    const objProducto5 = new Producto(127, "Botin Nike Air Force I", "Nike Air Force I Corcho", 827.50, "3", 0, 5);
    objProducto5.setPrecioFinalProducto = objProducto5.calcularPrecioFinalProducto();
    
    const objProducto6 = new Producto(128, "Mochila Mammut", "Mochila Impermeable negra", 450.82, "4", 0, 3);
    objProducto6.setPrecioFinalProducto = objProducto6.calcularPrecioFinalProducto();
    
    const objProducto7 = new Producto(129, "Botines Timberland", "Calzado Casual verde", 799.34, "5", 0, 5);
    objProducto7.setPrecioFinalProducto = objProducto7.calcularPrecioFinalProducto();
    
    const objProducto8 = new Producto(131, "Botines Caterpillar", "Calzado casual amarillo", 660.50, "5", 0, 4);
    objProducto8.setPrecioFinalProducto = objProducto8.calcularPrecioFinalProducto();
    
    const objProducto9 = new Producto(132, "Zapatilla Air Jordan Retro 3", "Calzado casual retro verde/blanco", 965.48, "3", 0, 6);
    objProducto9.setPrecioFinalProducto = objProducto9.calcularPrecioFinalProducto();
    
    const objProducto10 = new Producto(133, "Zapatilla Air Jordan Retro 5", "Calzado casual retro negro/blanco", 1050.50, "3", 0, 7);
    objProducto10.setPrecioFinalProducto = objProducto10.calcularPrecioFinalProducto();

    listaProductos.push(objProducto1);
    listaProductos.push(objProducto2);
    listaProductos.push(objProducto3);
    listaProductos.push(objProducto4);
    listaProductos.push(objProducto5);
    listaProductos.push(objProducto6);
    listaProductos.push(objProducto7);
    listaProductos.push(objProducto8);
    listaProductos.push(objProducto9);
    listaProductos.push(objProducto10);
    listarDataProductosConsola(listaProductos);

    return listaProductos.sort((objPro1, objPro2)=>objPro1.getIdProducto - objPro2.getIdProducto);
}   

/**
 * Función que lista todos los productos
 * 
 * @param {Producto[]} lista 
 */

const listarDataProductosConsola = (lista)=>{
    console.info("%c****************************************************** Listado de Productos **************************************************************", "color:red");

    for (const objProd of lista) {
        console.log("%c"+ objProd, "color:lightblue");
    }
}