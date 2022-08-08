/** 
 * Agregamos al main-nav una clase (main-nav--mostrar)
 * 
*/
const container_nav =  document.getElementById("main-nav");
const container_toogle =  document.getElementById("toogle");

if(container_toogle!==null){

    container_toogle.addEventListener("click", (e) =>{
        e.preventDefault();
        container_nav.classList.toggle("main-nav--mostrar");
    
    })
}