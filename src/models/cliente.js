export class Cliente {


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
        return `ID: ${this.idCliente} - NOMBRE: ${this.nombresCliente} - APELLIDO PATERNO: ${this.apellidoPaternoCliente} - APELLIDO MATERNO: ${this.apellidoMaternoCliente} - CORREO: ${this.correoCliente} - ESTADO: ${this.estadoRegistroCliente?"Activo":"Inactivo"} - FECHA NACIMIENTO: ${formatearFecha(this.fechaNacimientoCliente)}`;
    }
}