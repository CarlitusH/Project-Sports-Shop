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

const btnAdd =  document.getElementById("btnAdd");
const cartFront = document.getElementById("card-front");
cartFront.addEventListener("mousemove", ()=>{
    console.log("ingresa al mouseover");
    btnAdd.style.visibility = "initial";
    // btnAdd.classList.toggle("")
})

cartFront.removeEventListener("mouseover",()=>{
    console.log("Se remueve el listener");
});

cartFront.addEventListener("mouseleave", ()=>{
    console.log("ingresa al mouseleave");
    btnAdd.style.visibility = "hidden"
})

cartFront.removeEventListener("mouseleave",()=>{
    console.log("Se remueve el listener");
});