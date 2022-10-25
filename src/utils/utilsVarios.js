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

/**
 * Función que lista información de un arreglo
 * 
 * @param {array[]} lista
 * @param {String} tipo
 */

export const listarDataConsola = (lista, tipo)=>{
    console.info("%c****************************************************** Listado de "+ tipo + " **************************************************************", "color:red");
    for (const objGenerico of lista) {
        console.log("%c"+objGenerico, "color:cyan");
    }
}


/***************************************************************************************** 
 *              Función que retorna todos los parámetros de una url
******************************************************************************************/
export const recuperarParametrosUrl=()=>{
    const paramsUrlSearch = window.location.search;
    const paramUrl = new URLSearchParams(paramsUrlSearch);
    return paramUrl;
}


/***************************************************************************************** 
 *  FUNCIÓN QUE VALIDA SI LOS CAMPOS REQUERIDOS CUMPLAN CON EL FORMATO. EL DATO INPUT:
 * 
 *  @param {campo:{valor:, tipo:}} objDataInput: Objeto que actua como entrada. 
 * 
******************************************************************************************/
export const validarDatosInput = (objDataInput)=>{
    const objRpta = {mensaje:"", campo:""};
    for (const key in objDataInput) {

        let rpta=true;

        if(objDataInput[key].tipo === "texto"){
            rpta = /^[a-zA-ZÀ-ÿ ]+$/.test(objDataInput[key].valor)?true:`El campo ${key} debe contener solo letras, mínimo 3 letras, máximo 50`;
            
            if(objDataInput[key].valor.length<3){
               rpta= `El campo ${key} debe contener solo letras, mínimo 3 letras, máximo 50`;
            }
            
        }else if(objDataInput[key].tipo === "entero"){
            rpta = /^[0-9]+$/.test(objDataInput[key].valor)?true:`El campo ${key} debe contener SOLO Números Enteros`;
        }else if(objDataInput[key].tipo === "correo"){
            rpta = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(objDataInput[key].valor)
                   ?true:`El campo ${key} No cumple con el formato de correo, ejemplo: cuenta@mail.com`;
        }

        if(rpta!==true){
            objRpta.campo = key;
            objRpta.mensaje = rpta;
            break;
        }
    }

    return objRpta;
}