const btnRegistro = document.getElementById("btn-registro");

const cambioPagina = (e)=>{
    e.preventDefault();
    setTimeout(() => {
        location.href = "./registro.html";
    }, 500);
}


btnRegistro.addEventListener("click", cambioPagina);