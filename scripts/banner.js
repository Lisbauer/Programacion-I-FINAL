// estado del banner sin usar las categorias
let bannerVisible = false;

const banners = {    
    anillos: "./images/banner-1.png",
    collares: "./images/banner-2.png",   
    aros: "./images/banner-3.png"
};

export function mostrarBanner(categoria) {
    // si el banner ya esta visible no hacer nada
    if (bannerVisible) return;

    // contenedor del banner
    const banner = document.createElement("div");
    banner.classList.add("banner-flotante");


    const img = document.createElement("img");
    img.src = banners[categoria] || "./images/default-banner.jpg";  // Banner por defecto
    img.alt = "Banner publicitario";


    const botonVerMas = document.createElement("a");
    botonVerMas.textContent = "Ver Más";
    botonVerMas.classList.add("btn-verMas");
    botonVerMas.href = "#";
   
    // cruz de cierre de banner
    const botonCerrar = document.createElement("div");
    botonCerrar.textContent = "×"; 
    botonCerrar.classList.add("btn-close-banner");


    // si el usuario desea cerrar el banner... 
    botonCerrar.addEventListener("click", () => {
        banner.remove();
        bannerVisible = false; // se reinicia el estado del banner
    });

    
    banner.appendChild(img);
    banner.appendChild(botonVerMas);
    banner.appendChild(botonCerrar);


    document.body.appendChild(banner);

    setTimeout(() => {
        banner.remove();
        bannerVisible = false; // se reinicia el estado del banner
    }, 10000);

    bannerVisible = true;
}
