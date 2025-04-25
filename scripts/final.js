document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const razaSeleccionada = params.get('raza');

    function aplicarFondoPorRaza(raza) {
        const key = raza.toLowerCase().replace(/-/g, '');
        const fondo = {
            dragonborn: "url('../assets/img/Dragonborn.jpg')",
            elf: "url('../assets/img/Elf.jpg')",
            dwarf: "url('../assets/img/Dwarf.jpg')",
            gnome: "url('../assets/img/Gnome.jpg')",
            halfelf: "url('../assets/img/HalfElf.jpg')",
            halforc: "url('../assets/img/HalfOrc.jpg')",
            halfling: "url('../assets/img/Halfling.jpg')",
            human: "url('../assets/img/Human.jpg')",
            tiefling: "url('../assets/img/Tiefling.jpg')"
        };
        const img = fondo[key] || "url('../assets/img/fondo-default.jpg')";
        document.body.style.backgroundImage = img;
    }

    aplicarFondoPorRaza(razaSeleccionada);

    document.getElementById("btn-volver").addEventListener("click", () => {
        history.back();
    });

    document.getElementById("btn-continuar").addEventListener("click", () => {
        // Obtener el personaje actual
        const personaje = JSON.parse(localStorage.getItem("personaje")) || {};

        // Añadir biografía
        personaje.nombre = document.getElementById("nombre").value;
        personaje.edad = document.getElementById("edad").value;
        personaje.altura = document.getElementById("altura").value;
        personaje.peso = document.getElementById("peso").value;
        personaje.cabello = document.getElementById("cabello").value;

        // Añadir características
        personaje.caracteristicas = {
            fuerza: document.getElementById("fuerza").textContent,
            destreza: document.getElementById("destreza").textContent,
            constitucion: document.getElementById("constitucion").textContent,
            inteligencia: document.getElementById("inteligencia").textContent,
            sabiduria: document.getElementById("sabiduria").textContent,
            carisma: document.getElementById("carisma").textContent
        };

        // Guardar en localStorage
        localStorage.setItem("personaje", JSON.stringify(personaje));
        console.log("Personaje final guardado:", personaje);
        alert("¡Personaje guardado exitosamente!");

        const seccion = document.getElementById("seccion-personaje");
        const p = JSON.parse(localStorage.getItem("personaje"));
        if (p) {
        seccion.style.display = "block";
        document.getElementById("res-nombre").textContent = p.nombre || "";
        document.getElementById("res-edad").textContent = p.edad || "";
        document.getElementById("res-altura").textContent = p.altura || "";
        document.getElementById("res-peso").textContent = p.peso || "";
        document.getElementById("res-cabello").textContent = p.cabello || "";
        document.getElementById("res-raza").textContent = `${p.raza || ""} (${p.subraza || "sin subraza"})`;
        document.getElementById("res-clase").textContent = p.clase || "";
        document.getElementById("res-alineamiento").textContent = p.alineamiento || "";
        document.getElementById("res-velocidad").textContent = p.velocidad || "";
        document.getElementById("res-idiomas").textContent = p.idiomas + ", " + p.idioma_extra || "";
        document.getElementById("res-rasgos").textContent = p.rasgos || "";
        document.getElementById("res-habilidades").textContent = (p.habilidades || []).join(", ");
        document.getElementById("res-instrumentos").textContent = p.instrumentos || "No aplica";
        document.getElementById("res-fuerza").textContent = p.caracteristicas?.fuerza || "";
        document.getElementById("res-destreza").textContent = p.caracteristicas?.destreza || "";
        document.getElementById("res-constitucion").textContent = p.caracteristicas?.constitucion || "";
        document.getElementById("res-inteligencia").textContent = p.caracteristicas?.inteligencia || "";
        document.getElementById("res-sabiduria").textContent = p.caracteristicas?.sabiduria || "";
        document.getElementById("res-carisma").textContent = p.caracteristicas?.carisma || "";
        document.getElementById("res-bonificadores").textContent = p.bonificadores || "No aplica";
        document.getElementById("res-idioma-extra").textContent = p.idioma_extra || "No aplica";
        document.getElementById("res-dado-golpe").textContent = p.dado_golpe || "No asignado";
        document.getElementById("res-competencias").textContent = p.competencias || "No aplica";
        document.getElementById("res-salvaciones").textContent = p.salvaciones || "No aplica";
        document.getElementById("res-equipo").textContent = p.equipo || "No aplica";
        document.getElementById("res-subclase").textContent = p.subclase || "Ninguna subclase";
        }
        
        const vistaTitle = document.getElementById('title');
        const name = p.nombre || "Personaje";
        function renderTitle(name) {
        
            vistaTitle.innerHTML = `
                <h2>${name}</h2>
            `;
        };
        renderTitle(name);
        const imagenPersonaje = document.getElementById("imagen-personaje");

        if (imagenPersonaje && p.raza) {
        const nombreImagen = p.raza.toLowerCase().replace(/\s/g, "-")+"PJ"; // reemplaza espacios si los hay
        imagenPersonaje.src = `../assets/img/${nombreImagen}.png`;
        }

        fetch('https://680ac229d5075a76d988e388.mockapi.io/Dungeons/Personajes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(personaje)
          })
          .then(res => res.json())
          .then(data => console.log("Guardado:", data))
          .catch(err => console.error("Error:", err));
    });
    

});

function tirarDados(caracteristicaId) {
    const resultado = Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1);
    document.getElementById(caracteristicaId).textContent = resultado;
}

document.getElementById("gohome").addEventListener("click", () => {
    window.location.href = "../src/index.html";
});