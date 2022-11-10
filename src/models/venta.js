export class Venta {

    constructor(idVenta, total, fecha, estado, idCliente, nombreCliente){
        this.idVenta = idVenta;
        this.totalVenta = total;
        this.fechaRegistroVenta = fecha;             
        this.estadoVenta = estado;
        this.idCliente = idCliente;
        this.nombreCliente = nombreCliente;   
    }

    get getIdVenta(){
        return this.idVenta;
    }

    get getTotalVenta(){
        return this.totalVenta;
    }

    get getFechaRegistroVenta(){
        return this.fechaRegistroVenta;
    }

    get getEstadoVenta(){
        return this.estadoVenta;
    }

    get getIdCliente(){
        return this.idCliente;
    }

    get getNombreCliente(){
        return this.nombreCliente;
    }

    
    /**
     * @param {String} id
     */
    set setIdVenta(id){
        this.idVenta = id;
    }


    /**
     * @param {numeric} total
     */
    set setTotalVenta(total){
        this.totalVenta = total;
    }
    
    /**
     * @param {Date} fecha
     */
    set setFechaRegistroVenta(fecha){
        this.fechaRegistroVenta = fecha;
    }


    /**
     * @param {String} estado
     */
    set setEstadoVenta(estado){
        this.estadoVenta = estado;
    }


    /**
     * @param {numeric} id
     */
    set setIdCliente(id){
        this.idCliente = id;
    }

    
    /**
     * @param {String} nombre
     */
    set setNombreCliente(nombre){
        this.nombreCliente = nombre;
    }

}