/**********************************************************************************************************************************
 * FUNCIONALIDAD: RECUPERA INFORMACIÓN DE LOCALSTORAGE, EN CASO NO LA ENCUENTRE LA CARGA DESDE UN ARCHIVO QUE ACTUA COMO BD
 * 
 * @param {String} keyData: Valor del key con el que se guardó la información en localstorage
 * @param {String} file: Valor del archivo base (.json) que actua como bd temporal
 * 
***********************************************************************************************************************************/
export const recuperarDataLocalStorage = async(file,keyData="")=>{

    let rptaRecuperado=localStorage.getItem(keyData);

    if(rptaRecuperado===null){
        const rptaLecturaDataInicial = await fetch('./data/'+file);
        const rptaJson = await rptaLecturaDataInicial.json();
        console.log(rptaJson);
        localStorage.setItem(keyData, JSON.stringify(rptaJson));
        rptaRecuperado=localStorage.getItem(keyData);
    }
    return JSON.parse(rptaRecuperado);
}


/**********************************************************************************************************************************
 * FUNCIONALIDAD: ACTUALIZA INFORMACIÓN EN EL LOCALSTORAGE, RECIBE LOS SIGUIENTES PARÁMETROS:
 * 
 * @param {String} idCampo: Nombre del campo que actuará como id.
 * @param {String} idValor: Valor del campo que actuará como id.
 * @param {Object} objNuevo: Objeto que reemplazará al modificado, debe contener el mismo orden de los campos y 
 *                           formato con el que fue guardado el original.
 * @param {String} keyData: Valor del key con el que se guardó la información en localstorage
 * @param {String} file: Valor del archivo base (.json) que actua como bd temporal
 * @param {String} tipoAccion: Acción que se realizará (tipoAccion===1 --> Actualizar) (tipoAccion===2 --> Borrar)
***********************************************************************************************************************************/
export const modificarListaLocalStorage = (idCampo,idValor, objNuevo,keyData, file, tipoAccion)=>{
    
    recuperarDataLocalStorage(file,keyData)
    .then(listaRecuperada=>{
        const nuevaListaGenerada= [];
        let flagGrabar=true;
        listaRecuperada.forEach(objGen =>{

            if(objGen[idCampo] === +idValor){
                if(tipoAccion===1){
                    objGen = objNuevo;
                }else if(tipoAccion===2){
                    flagGrabar=false;
                }
            }

            if(flagGrabar){
                nuevaListaGenerada.push(objGen);
            }
            flagGrabar=true;
        });
    
        localStorage.setItem(keyData, JSON.stringify(nuevaListaGenerada));
        return nuevaListaGenerada;

    })
    .catch(error=>console.log(error));
}