/******************************************************************************************
 *                              IMPORTACIONES
 ******************************************************************************************/
import { Producto } from "./models/producto.js";
import { Stock } from "./models/stock.js";
import { dataCategoriaProductos, recuperarParametrosUrl, validarDatosInput } from "./utils/utilsVarios.js";
import { recuperarDataLocalStorage, modificarListaLocalStorage } from "./functions/recuperarDataLocal.js";

/******************************************************************************************
 *                              Constantes/variables globales
 ******************************************************************************************/
const cuerpoTabla = document.getElementById("cuerpo-tabla-productos");
const btnFiltroProducto = document.getElementById("btnFiltroProducto");

const btnActualizarProducto = document.getElementById("btnActualizarProducto");
const txtIdProducto = document.getElementById("txtIdProducto");
const txtNombreProducto = document.getElementById("txtNombreProducto");
const txtDescripcionProducto = document.getElementById("txtDescripcionProducto");
const txtPrecioProducto = document.getElementById("txtPrecioProducto");
const txtPrecioFinalProducto = document.getElementById("txtPrecioFinalProducto");
const txtDescuentoProducto = document.getElementById("txtDescuentoProducto");
const cboCategoriaProducto = document.getElementById("cboCategoriaProducto");
const imgImagenProducto = document.getElementById("imgImagenProducto");
const fileImagenProducto = document.getElementById("fileImagenProducto");
const formSubmitContacto = document.getElementById("form-submit-contacto"); 

const btnActualizarStock = document.getElementById("btnActualizarStock");
const txtCantidadTotalStock = document.getElementById("txtCantidadTotalStock");
const cuerpoTablaStock = document.getElementById("cuerpo-tabla-stock"); 

const file = "infoProductos.json";
const keyDataProducto = "productos";

const fileStock = "infoStockProducto.json";
const keyDataStock = "stock";


/******************************************************************************************
 * FUNCIONALIDAD: Evento Inicial de carga de Productos
 ******************************************************************************************/
if (cuerpoTabla && btnFiltroProducto) {
  window.addEventListener("load", (e) => {
    e.preventDefault();
    recuperarDataLocalStorage(file, keyDataProducto)
      .then((listaProd) => {
        const listaProductoParse = parsearDataProductos(listaProd);
        recuperarDataLocalStorage(fileStock, keyDataStock)
          .then(dataStock=>{
            cargarDataProductosHtml(listaProductoParse, parsearDataStock(dataStock));
          })
        
      })
      .catch((error) => console.error(error));
  });
}

/******************************************************************************************
 * FUNCIONALIDAD: CARGA DE PRODUCTOS Y STOCK PARA LISTADO DE PRODUCTOS (listadoProducto.html)
 ******************************************************************************************/
const cargarDataProductosHtml = (listaProds, dataStock) => {
  const descripcionCategoria = dataCategoriaProductos();
  let urlInicial = document.URL;
  for (const objProd of listaProds) {
    //Nodo contenedor Table Row
    const nodoTR = document.createElement("tr");
    nodoTR.id = objProd.getIdProducto;

    //Accediendo al stock por idProducto
    const {idProducto, cantidadExistencias, estadoStock, listaTallas, idRegistro} = dataStock.find(obj=>obj.getIdProducto === objProd.getIdProducto);

    //Nodo Table Header
    const nodoTH = document.createElement("th");
    nodoTH.scope = "row";
    nodoTH.textContent = objProd.getIdProducto;

    //Nodo Nombre
    const nodoTD1 = document.createElement("td");
    nodoTD1.textContent = objProd.getNombreProducto;

    //Nodo Descripción
    const nodoTD2 = document.createElement("td");
    nodoTD2.textContent = objProd.getDescripcionProducto;

    //Nodo Precio Unitario
    const nodoTD3 = document.createElement("td");
    nodoTD3.textContent = objProd.getPrecioUnitarioProducto;

    //Nodo Descuento
    const nodoTD4 = document.createElement("td");
    nodoTD4.textContent = objProd.getDescuentoProducto + " %";

    //Nodo Categoría
    const nodoTD5 = document.createElement("td");
    nodoTD5.textContent = descripcionCategoria.get(+objProd.getCategoriaProducto);

    //Nodo Precio Final
    const nodoTD6 = document.createElement("td");
    nodoTD6.textContent = objProd.getPrecioFinalProducto;

    //Nodo Enlace actualización
    const nodoTD7 = document.createElement("td");
    nodoTD7.style.textAlign = "center";
    nodoTD7.innerHTML = `<a href="./actualizarProducto.html?id=${objProd.getIdProducto}&nombre=${objProd.getNombreProducto}&descripcion=${objProd.getDescripcionProducto}&unitario=${objProd.getPrecioUnitarioProducto}&categoria=${objProd.getCategoriaProducto}&final=${objProd.getPrecioFinalProducto}&descuento=${objProd.getDescuentoProducto}&imagen=${objProd.getImagenProducto.split("/")[2]}" id="linkUpdateProducto"> <img src="../img/update.png" alt="actualizar Producto"></a>`;

    //Nodo Enlace para borrar un registro
    const enlaceBorrar = document.createElement("a");
    enlaceBorrar.innerHTML = `<img src="../img/delete.png" alt="Borrar Producto">`;
    enlaceBorrar.href = `${urlInicial}`;
    enlaceBorrar.onclick = (e) => {
      e.preventDefault();
      Swal.fire({
        title: `Estas seguro de borrar el Producto ${objProd.getNombreProducto}?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Borrar Producto",
        denyButtonText: `Cancelar Borrado`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Registro Borrado correctamente!", "", "success");
          modificarListaLocalStorage("id",objProd.getIdProducto,{},keyDataProducto,file,2);
          setTimeout(() => {
            location.reload();
          }, 1000);
        } else if (result.isDenied) {
          Swal.fire("Solicitud cancelada", "", "info");
        }
      });
    };
    const nodoTD8 = document.createElement("td");
    nodoTD8.style.textAlign = "center";
    nodoTD8.appendChild(enlaceBorrar);

    
    //Nodo para ver detalle de tallas
    const nodoTD9 = document.createElement("td");
    nodoTD9.innerHTML = crearModalTallasHtml(idProducto, objProd.getImagenProducto,objProd.getNombreProducto,cantidadExistencias, estadoStock, listaTallas, idRegistro)
    
    nodoTR.appendChild(nodoTH);
    nodoTR.appendChild(nodoTD1);
    nodoTR.appendChild(nodoTD2);
    nodoTR.appendChild(nodoTD3);
    nodoTR.appendChild(nodoTD4);
    nodoTR.appendChild(nodoTD5);
    nodoTR.appendChild(nodoTD6);
    nodoTR.appendChild(nodoTD7);
    nodoTR.appendChild(nodoTD8);
    nodoTR.appendChild(nodoTD9);
    
    cuerpoTabla.appendChild(nodoTR);
    
  }
};


/******************************************************************************************
 * FUNCIONALIDAD: Evento click, filtro de Productos por contenido en el txtFiltroNombreProd
 ******************************************************************************************/
if (cuerpoTabla && btnFiltroProducto) {
  btnFiltroProducto.addEventListener("click", (e) => {
    e.preventDefault();
    recuperarDataLocalStorage(file, keyDataProducto)
      .then((data) => {
        const listaDataProducto = parsearDataProductos(data);
        recuperarDataLocalStorage(fileStock, keyDataStock)
          .then(dataStock=>{  
            let valorFiltro = document.getElementById("txtFiltroNombrePro").value;
            const listaFiltrada = listaDataProducto.filter((objPro) => 
                                  objPro.getNombreProducto.toUpperCase().includes(valorFiltro.toUpperCase().trim()));
            funcionLimpiarTabla();
            cargarDataProductosHtml(listaFiltrada, parsearDataStock(dataStock));
          })
      })
      .catch((error) => console.log(error));
  });
}


/************************************************************************************************************************
 * FUNCIONALIDAD: Crear contenido HTML. Incluye link y modal por cada producto, con el detalle las tallas y cantidades
 ************************************************************************************************************************/
const crearModalTallasHtml = (idProducto, imagenProducto, nombreProducto,cantidadExistencias, estadoStock, listaTallas, idRegistro)=>{
  const htmlModalLink = ` <a href="#" style="color: red;" class="main-nav-link" id="tallasModal" data-bs-toggle="modal" data-bs-target="#tallasDetalleModal${idProducto}">Ver     Tallas</a>
    <div style="margin-top: 6rem;" class="modal fade" id="tallasDetalleModal${idProducto}" tabindex="-1" aria-labelledby="tallasDetalleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tallasDetalleModalLabel">Detalle Tallas</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="modalBodyTallas">
              <div class="modal-contenedor">
                <div>
                  <img class="img-fluid cart-image" style="width: 280px; height: 310px;" src="${imagenProducto}"/>
                </div>
                <div></div>
                <p>Producto: ${nombreProducto}</p>
                <p>Cantidad: ${cantidadExistencias}</p>
                <p>Estado: ${estadoStock}</p>
                <p>Id: ${idProducto}</p>
                <div><a  class="btn btn-outline-success" href="./actualizarTallas.html?id=${idProducto}&nombre=${nombreProducto}&imagen=${imagenProducto.split("/")[2]}&registro=${idRegistro}&tallaInicial=${listaTallas[0].talla}&estado=${estadoStock}"  style="margin-bottom: 2rem;">Modificar Stock</a></div>
                  ${listaTallas.map((obj)=>
                    {return "<div style='margin-right:1rem; padding:1rem ;border: 1px solid rgb(170, 167, 167); margin-top:0; margin-bottom:0'>Talla: "+ obj.talla + 
                    " Cantidad: " + obj.cantidadUnitaria + "</div>"})}
              </div>
            </div>
            <div class="modal-footer"  style="margin-top: 4rem;">
            </div>
        </div>
      </div>
    </div>`;
                    
  return htmlModalLink;
}


/******************************************************************************************
 *   FUNCIONALIDAD: PARSEO DE DATOS PARA CREAR OBJETOS DE TIPO PRODUCTO
 ******************************************************************************************/
const parsearDataProductos = (data) => {
  const listaProductos = [];
  data.forEach(
    ({ id, nombre, descripcion, unitario, categoria, final, descuento,imagen }) => {
      const objProducto = new Producto(id, nombre, descripcion, unitario, categoria, final,`../img/${imagen}`,descuento);
      
      if(imagen === "" || imagen === null || imagen === "null"){
        objProducto.setImagenProducto = "../img/jorda-retro3-white.jpg";
      }

      objProducto.setPrecioFinalProducto =
      objProducto.calcularPrecioFinalProducto();
      listaProductos.push(objProducto);
    }
  );

  return listaProductos.sort((objPro1, objPro2) => objPro1.getIdProducto - objPro2.getIdProducto);
};


/*****************************************************************************************
 * FUNCIONALIDAD: Limpia la tabla principal para aplicar el filtro
 *****************************************************************************************/
const funcionLimpiarTabla = () => {
  for (let i = cuerpoTabla.childNodes.length; i > 0; i--) {
    if (cuerpoTabla.childNodes[i] === undefined) {
      continue;
    }
    cuerpoTabla.removeChild(cuerpoTabla.childNodes[i]);
  }
};


/******************************************************************************************
 * FUNCIONALIDAD: CARGA INFORMACIÓN DE UN PRODUCTO EN ESPECÍFICO, PREVIAMENTE SE VALIDA
 *                QUE EXISTA EL CONTROL DE BOTÓN QUE ACTUALIZA INFORMACIÓN, FUNCIÓN HECHA
 *                PARA EL HTML: actualizarProducto.html
 ******************************************************************************************/
if (btnActualizarProducto) {
  window.addEventListener("load", (e) => {
    e.preventDefault();

    //Carga de categoría Inicial:
    const descripcionCategoria = dataCategoriaProductos();
    descripcionCategoria.forEach((valor, key) => {
      const opcion = document.createElement("option");
      opcion.value = +key;
      opcion.text = valor;
      cboCategoriaProducto.appendChild(opcion);
    });

    //Carga de datos desde la URL
    const paramUrl = recuperarParametrosUrl();

    txtIdProducto.value = +paramUrl.get("id");
    txtNombreProducto.value = paramUrl.get("nombre");
    txtDescripcionProducto.value = paramUrl.get("descripcion");
    txtPrecioProducto.value = +paramUrl.get("unitario");
    txtPrecioFinalProducto.value = +paramUrl.get("final");
    txtDescuentoProducto.value = +paramUrl.get("descuento");
    cboCategoriaProducto.value = paramUrl.get("categoria");
    
    imgImagenProducto.setAttribute("src",`../img/${paramUrl.get("imagen")}`);
    imgImagenProducto.style.width ="250px";
    imgImagenProducto.style.height ="280px";

  });

  /******************************************************************************************
   * FUNCIONALIDAD: EVENTO DE ACTUALIZACIÓN DE INFORMACIÓN DE PRODUCTOS EN LOCALSTORAGE
   ******************************************************************************************/
  formSubmitContacto.addEventListener("submit", () => {

    //Validamos datos previo al envío
    const objInputValidador = {
      nombre: {
        valor: txtNombreProducto.value,
        tipo: "alfanumerico",
      },
      descripcion: {
        valor: txtDescripcionProducto.value,
        tipo: "alfanumerico",
      },
      precioUnitario: {
        valor: +txtPrecioProducto.value,
        tipo: "decimal2",
      },
      precioFinal: {
        valor: +txtPrecioFinalProducto.value,
        tipo: "decimal2",
      },
      descuento:{
        valor:+txtDescuentoProducto.value,
        tipo:"entero"
      }
    };
    
    const rptaValidacionInput = validarDatosInput(objInputValidador);
    
    if(rptaValidacionInput.mensaje === ""){
      const paramUrl = recuperarParametrosUrl();
      const objProductoMod = {
        id:+txtIdProducto.value,
        nombre:txtNombreProducto.value,
        descripcion:txtDescripcionProducto.value,
        unitario:+txtPrecioProducto.value,
        categoria:+cboCategoriaProducto.value,
        final:+txtPrecioFinalProducto.value,
        descuento:+txtDescuentoProducto.value,
        imagen: fileImagenProducto.value === "" || null? `${paramUrl.get("imagen")}`:(fileImagenProducto.value+"").split("\\").at(-1)
      };
      modificarListaLocalStorage("id", objProductoMod.id,objProductoMod,keyDataProducto,file,1);
      setTimeout(()=>{
        location.href = "./listadoProductos.html";
      },1000);

    }else{
      const divAlert = document.getElementById("mensaje-error");
      divAlert.className = "alert alert-danger";
      divAlert.role = "alert";
      divAlert.textContent = rptaValidacionInput.mensaje;
    }
  });
}


if(btnActualizarStock){

/******************************************************************************************
* FUNCIONALIDAD: EVENTO LOAD, CARGA DE STOCK PARA ACTUALIZACIÓN DE DATA
******************************************************************************************/
  window.addEventListener("load", (event)=>{
    event.preventDefault();
    //Carga de datos desde la URL
    const paramUrl = recuperarParametrosUrl();
    
    txtNombreProducto.value = paramUrl.get("nombre");
    
    imgImagenProducto.setAttribute("src",`../img/${paramUrl.get("imagen")}`);
    imgImagenProducto.style.width ="250px";
    imgImagenProducto.style.height ="280px";

    recuperarDataLocalStorage(fileStock, keyDataStock)
      .then((listStock)=>{
        const objStockFilterById = listStock.find((objStock)=> +objStock.idPro === +paramUrl.get("id"));

        txtCantidadTotalStock.value = objStockFilterById.cantidad;
        let contador = 1;
        for (const objTalla of objStockFilterById.tallas) {
          const nodoTR = document.createElement("tr");
          
          //Nodo Table Header
          const nodoTH = document.createElement("th");
          nodoTH.scope = "row";
          nodoTH.textContent = contador;

          //Talla
          const nodoTD1 = document.createElement("td");
          nodoTD1.textContent = objTalla.talla;

          //Cantidad
          const nodoTD2 = document.createElement("td");
          const txtCantidadUnitaria = document.createElement("input");
          txtCantidadUnitaria.type = "number";
          txtCantidadUnitaria.value = objTalla.cantidadUnitaria;
          txtCantidadUnitaria.name = "cantidadUnitaria";
          txtCantidadUnitaria.min = 0;
          txtCantidadUnitaria.style.textAlign = "center";
          
          nodoTD2.appendChild(txtCantidadUnitaria);

          const nodoTD3 = document.createElement("td");
          nodoTD3.textContent = objStockFilterById.estado;

          nodoTR.appendChild(nodoTH);
          nodoTR.appendChild(nodoTD1);
          nodoTR.appendChild(nodoTD2);
          nodoTR.appendChild(nodoTD3);

          cuerpoTablaStock.appendChild(nodoTR);
          contador++;
        }

      })
      .catch((error)=>console.error(error));
  })


/******************************************************************************************
*   FUNCIONALIDAD: EVENTO CLICK, ACTUALIZACIÓN DEL STOCK POR PRODUCTO Y TALLA
******************************************************************************************/
  btnActualizarStock.addEventListener("click", (event)=>{
    event.preventDefault();

    const paramUrl = recuperarParametrosUrl();
    const idProducto = +paramUrl.get("id");
    
    const objModStock = {
      idPro:idProducto,
      registro:+paramUrl.get("registro"),
      cantidad:0,
      estado: paramUrl.get("estado"),
      tallas:[]
    };
    
    const listaCantidadUnitaria = document.getElementsByName("cantidadUnitaria");
    let tallaInicial = +paramUrl.get("tallaInicial")==="" || undefined?7.5:+paramUrl.get("tallaInicial");
    
    for(const elementoCantidad of listaCantidadUnitaria) {
      objModStock.cantidad += (+elementoCantidad.value);
      objModStock.tallas.push({talla:tallaInicial, cantidadUnitaria:+elementoCantidad.value});
      tallaInicial+=0.5;
    };


    modificarListaLocalStorage("idPro", objModStock.idPro,objModStock,keyDataStock,fileStock,1);    
    setTimeout(()=>{
      location.href = "./listadoProductos.html";
    },1000);

  });

}


/******************************************************************************************
 *   FUNCIONALIDAD: PARSEO DE DATOS PARA CREAR OBJETOS DE TIPO STOCK
 ******************************************************************************************/
 const parsearDataStock = (listaStock) => {
  const listaStockRecuperada = [];
  listaStock.forEach(({idPro, registro, cantidad, estado, tallas})=>{
    const objNewStock = new Stock(idPro, registro,cantidad, estado, tallas);
    listaStockRecuperada.push(objNewStock);
  });
  return listaStockRecuperada;
}