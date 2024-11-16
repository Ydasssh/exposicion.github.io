let menuList = document.getElementById("menuList")
menuList.style.maxHeight = "0px";


function toggleMenu(){
    if (menuList.style.maxHeight == "0px"){
        menuList.style.maxHeight = "300px";
    }else{
        menuList.style.maxHeight = "0px";
    }
}



// flecha flotante

window.onscroll = function() {
    var flecha = document.querySelector('.flecha-flotante');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        flecha.style.display = "block";
    } else {
        flecha.style.display = "none";
    }
};


// imagenes screen

function cambiarImagenSegunPantalla() {
    var img = document.getElementById("imagen-carousel-1");
    if (window.innerWidth <= 522) { // Si la pantalla es menor de 600px
        img.src = "imagenes/car-item-4-522px.png";
    } else {
        img.src = "imagenes/car-item-4.png";
    }
}

// Llama a la función cuando se carga la página
cambiarImagenSegunPantalla();

// Añade un listener para cambiar la imagen cuando se redimensiona la ventana
window.addEventListener("resize", cambiarImagenSegunPantalla);

