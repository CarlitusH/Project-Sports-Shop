/***************************************************************************************** 
 *                   Función que retorna la descripción de la categoría
******************************************************************************************/
export const dataCategoriaProductos = ()=>{
    const mapaCategoria = new Map();
    mapaCategoria.set(1, "Vestimenta");
    mapaCategoria.set(2, "Calzado Trekking");
    mapaCategoria.set(3, "Zapatillas Urbanas");
    mapaCategoria.set(4, "Accesorios");
    mapaCategoria.set(5, "Calzado Casual");
    return mapaCategoria;
}