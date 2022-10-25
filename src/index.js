/**
 * Agregamos al main-nav una clase (main-nav--mostrar)
 *
 */
const container_nav = document.getElementById("main-nav");
const container_toogle = document.getElementById("toogle");

if (container_toogle !== null) {
  container_toogle.addEventListener("click", (e) => {
    e.preventDefault();
    container_nav.classList.toggle("main-nav--mostrar");
  });
}

window.addEventListener("load", ({ target }) => {
  console.log(target.location.pathname);

  const paramsUrlSearch = window.location.search;
  const paramUrl = new URLSearchParams(paramsUrlSearch);
  const usuario = paramUrl.get("usuario");

  if (usuario) {
    //console.log("Existe el usuario: " + usuario);
    //2da acción, recuperar el sessionStorage con el usuario de la url
    //const sesion = sessionStorage.getItem("sessionGS-" + usuario);
  } else {
    //console.log("NO Existe el USUARIO");
  }
});
