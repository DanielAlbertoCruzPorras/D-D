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
    document.body.classList.add(`raza-${raza.toLowerCase().replace(/-/g, '')}`);
    mostrarDatosDeRaza(data);
    aplicarFondoPorRaza(raza);
    cargarAlineamientos();
    cargarDraconicAncestry();
  } catch (err) {
    vistaRaza.innerHTML = `<p>Error al cargar datos de la raza: ${err.message}</p>`;
  }
}

/*=================== Switch para inyectar el código de la respectiva raza ===================*/
function mostrarDatosDeRaza(data) {
  const raza = data.index;

  switch (raza) {
    case 'dragonborn':
      renderDragonborn(data);
      break;
    case 'dwarf':
      renderDwarf(data);
      break;
    case 'elf':
      renderElf(data);
      break;
    case 'gnome':
      renderGnome(data);
      break;
    // y así con las demás razas
    default:
      renderGenerico(data);
  }
}
/*======= Función para la inyección del código de la raza dragonborn =======*/
function renderDragonborn(data) {
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
        <h3>${data.name}</h3>
        <p id="parrafo-roleplay">Los Dragonborn caminan como leyendas vivientes, nacidos del poder dracónico. Su herencia se manifiesta en su aliento ardiente y su voluntad de hierro. Aunque su aspecto impone, su honor arde con más fuerza que su fuego interior.</p>
      </div>
    </div>
  `;
}
/*======= Función para la inyección del código de la raza dwarf =======*/
function renderDwarf(data) {
  const habilidades = data.ability_bonuses.map(b => `${b.ability_score.name} +${b.bonus}`).join(', ');
  const idiomas = data.languages.map(l => l.name).join(', ');
  const rasgos = data.traits.map(t => t.name).join(', ');
  const armas = data.starting_proficiencies.map(p => p.name).join(', ');
  const herramientas = data.starting_proficiency_options.from.options.map(
    opt => `<option value="${opt.item.index}">${opt.item.name}</option>`
  ).join('');
  const subrazas = data.subraces.map(sr => `<option value="${sr.index}">${sr.name}</option>`).join('');

  vistaRaza.innerHTML = `
    <div class="contenedor-razas">
      <div class="columna-izquierda">
        <h2>${data.name}</h2>
        <p><strong>Edad:</strong> ${data.age}</p>
        <p><strong>Tamaño:</strong> ${data.size_description}</p>
        <p><strong>Velocidad:</strong> ${data.speed} ft</p>
        <p><strong>Bonificadores:</strong> ${habilidades}</p>
        <p><strong>Idiomas:</strong> ${idiomas}</p>
        <p><strong>Descripción de idiomas:</strong> ${data.language_desc}</p>
        <p><strong>Rasgos:</strong> ${rasgos}</p>
        <p><strong>Armas iniciales:</strong> ${armas}</p>
        <p><strong>Herramienta de artesano:</strong>
          <select id="select-herramienta">${herramientas}</select>
        </p>
        <p><strong>Subraza:</strong>
          <select id="select-subraza">${subrazas}</select>
        </p>
        <p><strong>Alineamiento:</strong>
          <select id="select-alineamiento"></select>
        </p>
      </div>
      <div class="columna-derecha">
        <h3>${data.name}</h3>
        <p id="parrafo-roleplay">Forjados por la piedra, templados en batalla, los enanos representan la resistencia y la tradición en su máxima expresión. Leales, duros y con un respeto ancestral por el orden y el trabajo bien hecho.</p>
      </div>
    </div>
  `;
}
/*======= Función para la inyección del código de la raza elf =======*/
function renderElf(data) {
  const habilidades = data.ability_bonuses.map(b => `${b.ability_score.name} +${b.bonus}`).join(', ');
  const idiomas = data.languages.map(l => l.name).join(', ');
  const rasgos = data.traits.map(t => t.name).join(', ');
  const subrazas = data.subraces.map(sr => `<option value="${sr.index}">${sr.name}</option>`).join('');
  const habilidadesIniciales = data.starting_proficiencies.map(p => p.name).join(', ');

  vistaRaza.innerHTML = `
    <div class="contenedor-razas">
      <div class="columna-izquierda">
        <h2>${data.name}</h2>
        <p><strong>Edad:</strong> ${data.age}</p>
        <p><strong>Tamaño:</strong> ${data.size_description}</p>
        <p><strong>Velocidad:</strong> ${data.speed} ft</p>
        <p><strong>Bonificadores:</strong> ${habilidades}</p>
        <p><strong>Habilidad inicial:</strong> ${habilidadesIniciales}</p>
        <p><strong>Idiomas:</strong> ${idiomas}</p>
        <p><strong>Descripción de idiomas:</strong> ${data.language_desc}</p>
        <p><strong>Rasgos:</strong> ${rasgos}</p>
        <p><strong>Subraza:</strong>
          <select id="select-subraza">${subrazas}</select>
        </p>
        <p><strong>Alineamiento:</strong>
          <select id="select-alineamiento"></select>
        </p>
      </div>
      <div class="columna-derecha">
        <h3>${data.name}</h3>
        <p id="parrafo-roleplay">
          Los elfos valoran la belleza, la libertad y la magia. Son longevos, gráciles y profundamente conectados con la naturaleza y los planos feéricos. Sus vidas son melodías largas y complejas donde cada acción tiene significado.
        </p>
      </div>
    </div>
  `;
}
/*======= Función para la inyección del código de la raza gnome =======*/
function renderGnome(data) {
  const habilidades = data.ability_bonuses.map(b => `${b.ability_score.name} +${b.bonus}`).join(', ');
  const idiomas = data.languages.map(l => l.name).join(', ');
  const rasgos = data.traits.map(t => t.name).join(', ');
  const subrazas = data.subraces.map(sr => `<option value="${sr.index}">${sr.name}</option>`).join('');

  vistaRaza.innerHTML = `
    <div class="contenedor-razas">
      <div class="columna-izquierda">
        <h2>${data.name}</h2>
        <p><strong>Edad:</strong> ${data.age}</p>
        <p><strong>Tamaño:</strong> ${data.size_description}</p>
        <p><strong>Velocidad:</strong> ${data.speed} ft</p>
        <p><strong>Bonificadores:</strong> ${habilidades}</p>
        <p><strong>Idiomas:</strong> ${idiomas}</p>
        <p><strong>Descripción de idiomas:</strong> ${data.language_desc}</p>
        <p><strong>Rasgos:</strong> ${rasgos}</p>
        <p><strong>Subraza:</strong>
          <select id="select-subraza">${subrazas}</select>
        </p>
        <p><strong>Alineamiento:</strong>
          <select id="select-alineamiento"></select>
        </p>
      </div>
      <div class="columna-derecha">
        <h3>${data.name}</h3>
        <p id="parrafo-roleplay">
          Los gnomos son curiosos por naturaleza y brillantes por vocación. Sus mentes chispean con ideas, invenciones y travesuras. Aunque pequeños en tamaño, su ingenio puede desatar maravillas (o desastres) más grandes que ellos mismos.
        </p>
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
  // Normalización del nombre
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

document.addEventListener('DOMContentLoaded', () => {
  const btnVolver = document.getElementById('btn-volver');
  const btnContinuar = document.getElementById('btn-continuar');

  if (btnVolver) {
    btnVolver.addEventListener('click', () => {
      // Por ahora volvemos al index
      window.location.href = 'index.html';
    });
  }

  if (btnContinuar) {
    btnContinuar.addEventListener('click', () => {
      // Más adelante redirigimos a la vista de clase
      const raza = razaSeleccionada || 'unknown';
      window.location.href = `class.html?raza=${encodeURIComponent(raza)}`;
    });
  }
});


