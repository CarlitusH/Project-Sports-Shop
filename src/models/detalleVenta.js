export class DetalleVenta {


    constructor(idVenta, idProducto, cantidad, precioUnitario, descripcionProducto){
        this.idVenta = idVenta;
        this.idProducto = idProducto;
        this.cantidadVenta = cantidad;
        this.precioUnitario = precioUnitario;
        this.descripcionProducto = descripcionProducto;
    }

    get getIdVenta(){
        return this.idVenta;
    }

    get getIdProducto(){
        return this.idProducto;
    }

    get getCantidadVenta(){
        return this.cantidadVenta;
    }

    get getPrecioUnitario(){
        return this.precioUnitario;
    }

    get getDescripcionProducto(){
        return this.descripcionProducto;
    }

    
    /**
     * @param {String} id
     */
    set setIdVenta(id){
        this.idVenta = id;
    }

    
    /**
     * @param {number} idPro
     */
    set setIdProducto(idPro){
        this.idProducto = idPro;
    }

    
    /**
     * @param {number} cantidad
     */
    set setCantidadVenta(cantidad){
        this.cantidadVenta = cantidad;
    }


    /**
     * @param {number} precio
     */
    set setPrecioUnitario(precio){
        this.precioUnitario = precio;
    }

 
    /**
     * @param {String} descripcion
     */
    set setDescripcionProducto(descripcion){
        this.descripcionProducto = descripcion;
    }

}