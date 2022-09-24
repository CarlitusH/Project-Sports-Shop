/****************************************************************************************
 * 
 * FUNCIONALIDAD: LISTAR PRODUCTOS
 */

class Producto {

    constructor(id, nombre, descripcion, precioUnitario, categoria, precioFinal, descuento=0){
        this.idProducto = id; 
        this.nombreProducto = nombre;
        this.descripcionProducto = descripcion;
        this.precioUnitarioProducto = precioUnitario;
        this.descuentoProducto =  descuento;
        this.categoriaProducto = categoria;
        this.precioFinalProducto = precioFinal;
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

/**
 * Función que procesa la carga y listado de productos
 */
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
    listarTodosProductos(listaProductos);
}   

/**
 * Función que lista todos los productos
 * 
 * @param {Producto[]} lista 
 */

const listarTodosProductos = (lista)=>{
    console.info("%c****************************************************** Listado de Productos **************************************************************", "color:red");

    for (const objProd of lista) {
        console.log("%c"+ objProd, "color:lightblue");
    }
}


/****************************************************************************************
 * 
 * FUNCIONALIDAD: LISTAR CLIENTES
 */

 class Cliente {


    constructor( id, nombres, apellidoPat, apellidoMat ,mail, fechaNacimiento, estado=true){
        
        this.idCliente = id;
        this.nombresCliente = nombres;  
        this.apellidoPaternoCliente = apellidoPat;
        this.apellidoMaternoCliente = apellidoMat;
        this.correoCliente = mail;
        this.estadoRegistroCliente = estado;
        this.fechaNacimientoCliente = fechaNacimiento;
    }

    
    get getFechaNacimientoCliente(){
        return this.fechaNacimientoCliente;
    }

    get getIdCliente(){
        return this.idCliente;
    }

    get getNombreCliente(){
        return this.nombresCliente;
    }

    get getApellidoPaternoCliente(){
        return this.apellidoPaternoCliente;
    }

    get getApellidoMaternoCliente(){
        return this.apellidoMaternoCliente
    }

    get getCorreoCliente(){
        return this.correoCliente;
    }

    get getEstadoRegistroCliente(){
        return this.estadoRegistroCliente;
    }

    get getFechaNacimientoCliente(){
        return this.fechaNacimientoCliente;
    }
    
    /**
     * @param {string} name
     */
    set setNombreCliente(name){
        this.nombresCliente = name;
    }

    /**
     * @param {string} paterno
     */
    set setApellidoPaternoCliente(paterno){
        this.apellidoPaternoCliente = paterno;
    }
    
    /**
     * @param {string} materno
     */
    set setApellidoMaternoCliente(materno){
        this.apellidoMaternoCliente = materno;
    }

    /**
     * @param {string} mail
     */
    set setCorreoCliente(mail){
        this.correoCliente = mail;
    }

    /**
     * @param {boolean} estado
     */
    set setEstadoRegistroCliente(estado){
        this.estadoRegistroCliente = estado;
    }

    /**
     * @param {Date} nacimiento
     */
    set setFechaNacimientoCliente(nacimiento){
        this.fechaNacimientoCliente = nacimiento;
    }

    formatearFecha(fecha){
        let objFormater = new Intl.DateTimeFormat("default",{"day":"2-digit", "month":"long", "year":"numeric"});
        return objFormater.format(fecha);
    }

    toString(){
        return `ID: ${this.idCliente} - NOMBRE: ${this.nombresCliente} - APELLIDO PATERNO: ${this.apellidoPaternoCliente} - APELLIDO MATERNO: ${this.apellidoMaternoCliente} - CORREO: ${this.correoCliente} - ESTADO: ${this.estadoRegistroCliente?"Activo":"Inactivo"} - FECHA NACIMIENTO: ${this.formatearFecha(this.fechaNacimientoCliente)}`;
    }
}


const procesarDataClientes = ()=>{
    const listaClientes = [];

    const objClient1 = new Cliente(321, "Miguel", "Perez", "Rojas", "mperezr@mail.com", new Date(1995,11,12),true);
    const objClient2 = new Cliente(312, "Carlos", "Sanchez", "Rivas", "csanchezr@mail.com", new Date(1991,9,22),true);
    const objClient3 = new Cliente(322, "Juan", "Luna", "Galvez", "jlunag@mail.com", new Date(1990,10,15),true);
    const objClient4 = new Cliente(332, "Diego", "Fernandez", "Vela", "dfernandezv@mail.com", new Date(1989,2,25),true);
    const objClient5 = new Cliente(351, "Daniel", "Murga", "Flores", "dmurgaf@mail.com", new Date(1992,7,3),true);
    const objClient6 = new Cliente(343, "César", "Nizama", "Hurtado", "cnizamah@mail.com", new Date(1999,5,21),true);
    const objClient7 = new Cliente(362, "Jorge", "Cáceres", "Lecca", "jcaceresl@mail.com", new Date(1989,3,23),true);
    const objClient8 = new Cliente(336, "Carlos", "Rubio", "Veliz", "crubiov@mail.com", new Date(1982,9,18),true);
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

    listarDataClientes(listaClientes);
}

const listarDataClientes = (lista)=>{
    console.info("%c****************************************************** Listado de Clientes **************************************************************", "color:red");
    for (const objCli of lista) {
        console.log("%c"+objCli, "color:cyan");
    }
}

//Aquí dependiendo de la rpta, se listan los productos o los clientes
const rpta = confirm("ACEPTA para listar PRODUCTOS o CANCELA para listar CLIENTES")?procesarDataProductos():procesarDataClientes();



