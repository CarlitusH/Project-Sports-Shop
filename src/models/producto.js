export class Producto {

    constructor(id, nombre, descripcion, precioUnitario, categoria, precioFinal, imagen ,descuento=0){
        this.idProducto = id; 
        this.nombreProducto = nombre;
        this.descripcionProducto = descripcion;
        this.precioUnitarioProducto = precioUnitario;
        this.descuentoProducto =  descuento;
        this.categoriaProducto = categoria;
        this.precioFinalProducto = precioFinal;
        this.imagenProducto = imagen;
    }

    get getIdProducto(){
        return this.idProducto;
    }

    get getNombreProducto(){
        return this.nombreProducto;
    }

    get getDescripcionProducto(){
        return this.descripcionProducto;
    }

    get getPrecioUnitarioProducto(){
        return this.precioUnitarioProducto;
    }

    get getDescuentoProducto(){
        return this.descuentoProducto;
    }

    get getCategoriaProducto(){
        return this.categoriaProducto;
    }

    get getPrecioFinalProducto(){
        return this.precioFinalProducto;
    }


    get getImagenProducto(){
        return this.imagenProducto;
    }

    //Setters

    /**
     * @param {string} nombre
     */
    set setNombreProducto(nombre){
        this.nombreProducto = nombre;
    }

    /**
     * @param {string} descripcion
     */
    set setDescripcionProducto(descripcion){
        this.descripcionProducto = descripcion;
    }

    /**
     * @param {number} precioU
     */
    set setPrecioUnitarioProducto(precioU){
        this.precioUnitarioProducto = precioU;
    }

    /**
     * @param {number} descuento
     */
    set setDescuentoProducto(descuento){
        this.descuentoProducto = descuento;
    }

    /**
     * @param {string} categoria
     */
    set setCategoriaProducto(categoria){
        this.categoriaProducto = categoria;
    }

    
    /**
     * @param {number} precioFinal
     */
    set setPrecioFinalProducto(precioFinal){
        this.precioFinalProducto = precioFinal;
    }

    
    /**
     * @param {String} imagen
     */
    set setImagenProducto(imagen){
        this.imagenProducto = imagen;
    }

    /** 
     * Calcular PrecioFinal
    */
    calcularPrecioFinalProducto(){
        let descuentoFinal = 0;
        
        if(this.precioUnitarioProducto>0 && this.descuentoProducto>=0){    
            if(this.descuentoProducto <= 10 && this.descuentoProducto>2 && this.precioUnitarioProducto>500){
                descuentoFinal = (this.descuentoProducto/100) * this.precioUnitarioProducto;
            }else{
                descuentoFinal = 2/100 * this.precioUnitarioProducto;
            }
            return (this.precioUnitarioProducto - descuentoFinal).toFixed(2);
        }else{
            throw new Exception("Error, los datos de precio unitario y descuento son obligatorios");
        }
    }

    //MODIFICANDO EL MÉTODO toString()
    toString(){
        return `Id: ${this.idProducto} - NOMBRE: ${this.nombreProducto} - DESCRIPCIÓN: ${this.descripcionProducto} - PRECIO UNITARIO: ${this.precioUnitarioProducto} - CATEGORÍA: ${this.categoriaProducto} - PRECIO FINAL: ${this.precioFinalProducto} - DESCUENTO: ${this.descuentoProducto}%`;
    }
}