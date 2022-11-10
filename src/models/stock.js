export class Stock{



    constructor(id, registro, cantidad, estado, listaTallas){
        this.idProducto = id; 
        this.idRegistro = registro;
        this.cantidadExistencias = cantidad;
        this.estadoStock = estado;
        this.listaTallas = listaTallas;
    }

    get getIdProducto(){
        return this.idProducto;
    }

    get getIdRegistro(){
        return this.idRegistro;
    }

    get getCantidadExistencias(){
        return this.cantidadExistencias;
    }

    get getEstadoStock(){
        return this.estadoStock;
    }

    get getListaTallas(){
        return this.listaTallas;
    }

    /**
     * @param {number} cantidad
     */
    set setCantidadExistencias(cantidad){
        this.cantidadExistencias = cantidad;
    }

    
    /**
     * @param {String} estado
     */
    set setEstadoStock(estado){
        this.estadoStock = estado;
    }

    
    /**
     * @param {Object:{talla:number, cantidad:number}}  lista
     */
    set setListaTallas(lista){
        this.listaTallas = lista;
    }

    toString(){
        return `ID_PRODUCTO: ${this.idProducto} - ID_REGISTRO: ${this.idRegistro} - CANTIDAD_EXISTENCIAS: ${this.cantidadExistencias} - ESTADO STOCK: ${this.estadoStock}`;
    }
}