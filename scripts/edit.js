// scripts/edit.js

const params = new URLSearchParams(window.location.search);
const razaSeleccionada = params.get('raza');

const razaInfo = document.getElementById('raza-info');
const vistaRaza = document.getElementById('vista-raza');

if (razaSeleccionada) {
  razaInfo.textContent = `Raza seleccionada: ${razaSeleccionada}`;
  cargarRazaDesdeAPI(razaSeleccionada);
} else {
  razaInfo.textContent = 'No se seleccionó ninguna raza.';
}

async function cargarRazaDesdeAPI(raza) {
  try {
    const res = await fetch(`https://www.dnd5eapi.co/api/2014/races/${raza}`);
    const data = await res.json();
    mostrarDatosDeRaza(data);
    aplicarFondoPorRaza(raza);
    cargarAlineamientos();
    cargarDraconicAncestry();
  } catch (err) {
    vistaRaza.innerHTML = `<p>Error al cargar datos de la raza: ${err.message}</p>`;
  }
}

function mostrarDatosDeRaza(data) {
  const habilidades = data.ability_bonuses.map(b => `${b.ability_score.name} +${b.bonus}`).join(', ');
  const idiomas = data.languages.map(l => l.name).join(', ');
  const rasgos = data.traits.map(t => t.name).join(', ');

  vistaRaza.innerHTML = `
    <div class="contenedor-razas">
      <div class="columna-izquierda">
        <h2>${data.name}</h2>
        <p><strong>Edad:</strong> ${data.age}</p>
        <p><strong>Tamaño:</strong> ${data.size_description}</p>
        <p><strong>Velocidad:</strong> ${data.speed} ft</p>
        <p><strong>Bonificadores de Característica:</strong> ${habilidades}</p>
        <p><strong>Idiomas:</strong> ${idiomas}</p>
        <p><strong>Descripción de idiomas:</strong> ${data.language_desc}</p>
        <p><strong>Rasgos:</strong> ${rasgos}</p>
        <p><strong>Alineamiento:</strong>
          <select id="select-alineamiento"></select>
        </p>
        <p><strong>Draconic Ancestry:</strong>
          <select id="select-ancestry"></select>
        </p>
      </div>
      <div class="columna-derecha">
        <h3 id="titulo-roleplay">${data.name}</h3>
        <p id="parrafo-roleplay">Aquí irá el texto roleplay de la raza seleccionado dinámicamente o manualmente por vos.</p>
      </div>
    </div>
  `;
}

async function cargarAlineamientos() {
  try {
    const res = await fetch('https://www.dnd5eapi.co/api/2014/alignments');
    const data = await res.json();
    const select = document.getElementById('select-alineamiento');

    data.results.forEach(al => {
      const option = document.createElement('option');
      option.value = al.index;
      option.textContent = al.name;
      select.appendChild(option);
    });
  } catch (err) {
    console.error('Error cargando alineamientos:', err);
  }
}

async function cargarDraconicAncestry() {
  try {
    const res = await fetch('https://www.dnd5eapi.co/api/2014/traits/draconic-ancestry');
    const data = await res.json();
    const select = document.getElementById('select-ancestry');

    const opciones = data.trait_specific.subtrait_options.from.options;
    opciones.forEach(op => {
      const option = document.createElement('option');
      option.value = op.item.index;
      option.textContent = op.item.name;
      select.appendChild(option);
    });
  } catch (err) {
    console.error('Error cargando ancestría dracónica:', err);
  }
}

function aplicarFondoPorRaza(raza) {
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
    // Se puede agregar más si se quiere
  };

  const img = fondo[raza] || "url('../assets/img/HalfElf.jpg')"; // Fondo por defecto
  document.body.style.backgroundImage = img;
}

