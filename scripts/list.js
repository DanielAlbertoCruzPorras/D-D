// list.js

const API_URL = 'https://680ac229d5075a76d988e388.mockapi.io/Dungeons/Personajes'; // Reemplaza con tu endpoint real
const contenedor = document.getElementById("seccion-personaje");

document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedor-personajes");
  
    fetch('https://680ac229d5075a76d988e388.mockapi.io/Dungeons/Personajes')
        .then(res => res.json())
        .then(data => {
            data.forEach(personaje => {
                const seccion = document.createElement("section");
                seccion.classList.add("personaje");
                const nombreImagen = personaje.raza.toLowerCase().replace(/\s/g, "-")+"PJ"; // reemplaza espacios si los hay
        
                seccion.innerHTML = `
                    <div class="contenedor-razas"><h2>${personaje.nombre}</h2></div>
                    <div class="contenedor-razas">
                    <div class="columna-imagen">
                        <img src="../assets/img/${nombreImagen}.png" alt="Imagen del personaje">
                    </div>
                    <div class="columna-info">
                        <p><strong>Edad:</strong> ${personaje.edad}</p>
                        <p><strong>Altura:</strong> ${personaje.altura}</p>
                        <p><strong>Peso:</strong> ${personaje.peso}</p>
                        <p><strong>Cabello:</strong> ${personaje.cabello}</p>
                        <p><strong>Raza:</strong> ${personaje.raza}</p>
                        <p><strong>Clase:</strong> ${personaje.clase}</p>
                        <p><strong>Alineamiento:</strong> ${personaje.alineamiento}</p>
                        <p><strong>Velocidad:</strong> ${personaje.velocidad} pies</p>
                        <p><strong>Idiomas:</strong> ${personaje.idiomas}</p>
                        <p><strong>Idioma Extra:</strong> ${personaje.idioma_extra || "No aplica"}</p>
                    </div>
                    <div class="columna-info">
                        <p><strong>Rasgos:</strong> ${personaje.rasgos}</p>
                        <p><strong>Habilidades:</strong> ${(personaje.habilidades || []).join(", ")}</p>
                        <p><strong>Instrumentos:</strong> ${personaje.instrumentos || "No aplica"}</span></p>
                        <p><strong>Bonificadores:</strong> ${personaje.bonificadores}</p>
                        <p><strong>Dado de Golpe:</strong> ${personaje.dado_golpe}</p>
                        <p><strong>Competencias:</strong> ${personaje.competencias}</p>
                        <p><strong>Salvaciones:</strong> ${personaje.salvaciones}</p>
                        <p><strong>Equipo:</strong> ${personaje.equipo}</p>
                        <p><strong>Subclase:</strong> ${personaje.subclase}</p>
                        <p><strong>Características (Base):</strong></p>
                        <ul>
                            <li><strong>Fuerza:</strong> <span id="res-fuerza"> ${personaje.caracteristicas?.fuerza || ""}</span></li>
                            <li><strong>Destreza:</strong> <span id="res-destreza"> ${personaje.caracteristicas?.destreza || ""}</span></li>
                            <li><strong>Constitución:</strong> <span id="res-constitucion"> ${personaje.caracteristicas?.constitucion || ""}</span></li>
                            <li><strong>Inteligencia:</strong> <span id="res-inteligencia"> ${personaje.caracteristicas?.inteligencia || ""}</span></li>
                            <li><strong>Sabiduría:</strong> <span id="res-sabiduria"> ${personaje.caracteristicas?.sabiduria || ""}</span></li>
                            <li><strong>Carisma:</strong> <span id="res-carisma"> ${personaje.caracteristicas?.carisma || ""}</span></li>
                        </ul>
                    </div>
                    </div>
                `;
  
                contenedor.appendChild(seccion);
            });
    })
    .catch(err => {
        console.error("Error al cargar personajes:", err);
    });
});

document.getElementById("gohome").addEventListener("click", () => {
    window.location.href = "../src/index.html";
});

