
/***************************************************************************************** 
 *                              Constantes globales/Controles Html
******************************************************************************************/
const carritoModal = document.getElementById("carritoModal");
const btnBorrarCarrito = document.getElementById("btnBorrarCarrito");
const btnIrResumenCarrito = document.getElementById("btnIrResumenCarrito");


/***************************************************************************************** 
 *     FUNCIONALIDAD: Evento de carga de modal, detalle de carrito
******************************************************************************************/
carritoModal.addEventListener("click", (event)=>{
    event.preventDefault();

})



/**
 * 
 * @param {
 * } event 
 * @param {*} id 
 */
const agregarProducto = (event, id)=>{
    event.preventDefault();
    console.log("Agregando Producto");
    console.log(id);
    
};

