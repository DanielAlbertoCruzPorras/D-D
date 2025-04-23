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
    
    document.getElementById("btn-guardar").addEventListener("click", () => {
        const personaje = {
            nombre: document.getElementById("nombre").value,
            edad: document.getElementById("edad").value,
            altura: document.getElementById("altura").value,
            peso: document.getElementById("peso").value,
            cabello: document.getElementById("cabello").value,
            caracteristicas: {
                fuerza: document.getElementById("fuerza").textContent,
                destreza: document.getElementById("destreza").textContent,
                constitucion: document.getElementById("constitucion").textContent,
                inteligencia: document.getElementById("inteligencia").textContent,
                sabiduria: document.getElementById("sabiduria").textContent,
                carisma: document.getElementById("carisma").textContent
            }
        };
        console.log("Personaje guardado:", personaje);
        alert("¡Personaje guardado exitosamente!");
    });

});

function tirarDados(caracteristicaId) {
    const resultado = Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1);
    document.getElementById(caracteristicaId).textContent = resultado;
}