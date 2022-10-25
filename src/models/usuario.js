export class Usuario{

    constructor(nombreUsuario, apellidoPaterno, apellidoMaterno, correoUsuario, password, usuario, estado, perfilUsuario){
        this.nombreUsuario = nombreUsuario;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.correoUsuario = correoUsuario;
        this.password = password;
        this.usuario = usuario;
        this.estado = estado;
        this.perfilUsuario = perfilUsuario;
    }
    

    get getNombreUsuario(){
        return this.nombreUsuario;
    }

    get getApellidoPaterno(){
        return this.apellidoPaterno;
    }

    get getApellidoMaterno(){
        return this.apellidoMaterno;
    }

    get getCorreoUsuario(){
        return this.correoUsuario;
    }

    get getPassword(){
        return this.password;
    }

    get  getUsuario(){
        return this.usuario;
    }

    get getEstado(){
        return this.estado;
    }

    get getPerfilUsuario(){
        return this.perfilUsuario;
    }

    
    /**
     * @param {String} nombre
     */
    set setNombreUsuario(nombre){
        this.nombreUsuario = nombre;
    }


    /**
     * @param {String} paterno
     */
    set setApellidoPaterno(paterno){
        this.apellidoPaterno = paterno;
    }


    /**
     * @param {String} materno
     */
    set setApellidoMaterno(materno){
        this.apellidoMaterno = materno;
    }

    /**
     * @param {String} correo
     */
    set setCorreoUsuario(correo){
        this.correoUsuario = correo;
    }

    /**
     * @param {String} pass
     */
    set setPassword(pass){
        this.password = pass;
    }

    /**
     * @param {String} user
     */
    set setUsuario(user){
        this.usuario = user;
    }

    /**
     * @param {boolean} estado
     */
    set setEstado(estado){
        this.estado = estado;
    }

    
    /**
     * @param {number} perfil
     */
    set setPerfilUsuario(perfil){
        this.perfilUsuario = perfil;
    }

    toString(){
        return `USUARIO: ${this.usuario} - NOMBRE: ${this.nombreUsuario}`;
    }

}