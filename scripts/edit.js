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
    case 'half-elf':
      renderHalfElf(data);
      break;
    case 'half-orc':
      renderHalfOrc(data);
      break;
    case 'halfling':
      renderHalfling(data);
      break;
    case 'human':
      renderHuman(data);
      break;
    case 'tiefling':
      renderTiefling(data);
      break;
    default:
      renderGenerico(data);
  }
}

/*======= inyección dragonborn =======*/
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
        <p><strong>Velocidad:</strong> <span id="velocidad">${data.speed}</span> ft</p>
        <p><strong>Bonificadores:</strong> <span id="bonificadores">${habilidades}</span></p>
        <p><strong>Idiomas:</strong> <span id="idiomas">${idiomas}</span></p>
        <p><strong>Descripción de idiomas:</strong> ${data.language_desc}</p>
        <p><strong>Rasgos:</strong> <span id="rasgos">${rasgos}</span></p>
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
/*======= inyección dwarf =======*/
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
        <p><strong>Velocidad:</strong> <span id="velocidad">${data.speed}</span> ft</p>
        <p><strong>Bonificadores:</strong> <span id="bonificadores">${habilidades}</span></p>
        <p><strong>Idiomas:</strong> <span id="idiomas">${idiomas}</span></p>
        <p><strong>Descripción de idiomas:</strong> ${data.language_desc}</p>
        <p><strong>Rasgos:</strong> <span id="rasgos">${rasgos}</span></p>
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
/*======= inyección elf =======*/
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
        <p><strong>Velocidad:</strong> <span id="velocidad">${data.speed}</span> ft</p>
        <p><strong>Bonificadores:</strong> <span id="bonificadores">${habilidades}</span></p>
        <p><strong>Habilidad inicial:</strong> ${habilidadesIniciales}</p>
        <p><strong>Idiomas:</strong> <span id="idiomas">${idiomas}</span></p>
        <p><strong>Descripción de idiomas:</strong> ${data.language_desc}</p>
        <p><strong>Rasgos:</strong> <span id="rasgos">${rasgos}</span></p>
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
/*======= inyección gnome =======*/
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
        <p><strong>Velocidad:</strong> <span id="velocidad">${data.speed}</span> ft</p>
        <p><strong>Bonificadores:</strong> <span id="bonificadores">${habilidades}</span></p>
        <p><strong>Idiomas:</strong> <span id="idiomas">${idiomas}</span></p>
        <p><strong>Descripción de idiomas:</strong> ${data.language_desc}</p>
        <p><strong>Rasgos:</strong> <span id="rasgos">${rasgos}</span></p>
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
/*======= inyección half-elf =======*/
function renderHalfElf(data) {
  const habilidades = data.ability_bonuses.map(b => `${b.ability_score.name} +${b.bonus}`).join(', ');
  const idiomas = data.languages.map(l => l.name).join(', ');
  const rasgos = data.traits.map(t => t.name).join(', ');

  // Opción de idiomas adicionales
  const idiomasExtra = data.language_options.from.options.map(
    opt => `<option value="${opt.item.index}">${opt.item.name}</option>`
  ).join('');

  // Opciones para habilidad +1 x2 (STR, DEX, etc.)
  const statsOpcionales = data.ability_bonus_options.from.options.map(
    opt => `<option value="${opt.ability_score.index}">${opt.ability_score.name} +1</option>`
  ).join('');

  // Opciones de habilidades para elegir 2
  const habilidadesOpcionales = data.starting_proficiency_options.from.options.map(
    opt => `<option value="${opt.item.index}">${opt.item.name}</option>`
  ).join('');

  vistaRaza.innerHTML = `
    <div class="contenedor-razas">
      <div class="columna-izquierda">
        <h2>${data.name}</h2>
        <p><strong>Edad:</strong> ${data.age}</p>
        <p><strong>Tamaño:</strong> ${data.size_description}</p>
        <p><strong>Velocidad:</strong> <span id="velocidad">${data.speed}</span> ft</p>
        <p><strong>Bonificadores:</strong> <span id="bonificadores">${habilidades}</span></p>
        <p><strong>Bonificadores adicionales:</strong></p>
        <select id="select-stat-extra-1">${statsOpcionales}</select>
        <select id="select-stat-extra-2">${statsOpcionales}</select>

        <p><strong>Habilidades a elegir (elige 2):</strong></p>
        <select id="select-skill-1">${habilidadesOpcionales}</select>
        <select id="select-skill-2">${habilidadesOpcionales}</select>

        <p><strong>Idiomas:</strong> <span id="idiomas">${idiomas}</span></p>
        <p><strong>Idioma adicional:</strong>
          <select id="select-idioma-extra">${idiomasExtra}</select>
        </p>
        <p><strong>Descripción de idiomas:</strong> ${data.language_desc}</p>
        <p><strong>Rasgos:</strong> <span id="rasgos">${rasgos}</span></p>
        <p><strong>Alineamiento:</strong>
          <select id="select-alineamiento"></select>
        </p>
      </div>
      <div class="columna-derecha">
        <h3>${data.name}</h3>
        <p id="parrafo-roleplay">
          Divididos entre dos mundos, los medio-elfos combinan la agudeza élfica con la versatilidad humana. Inadaptables para algunos y únicos para otros, su identidad fluye entre la libertad y la dualidad de su herencia.
        </p>
      </div>
    </div>
  `;
}
/*======= inyección half-orc =======*/
function renderHalfOrc(data) {
  const habilidades = data.ability_bonuses.map(b => `${b.ability_score.name} +${b.bonus}`).join(', ');
  const idiomas = data.languages.map(l => l.name).join(', ');
  const rasgos = data.traits.map(t => t.name).join(', ');
  const habilidadesIniciales = data.starting_proficiencies.map(p => p.name).join(', ');

  vistaRaza.innerHTML = `
    <div class="contenedor-razas">
      <div class="columna-izquierda">
        <h2>${data.name}</h2>
        <p><strong>Edad:</strong> ${data.age}</p>
        <p><strong>Tamaño:</strong> ${data.size_description}</p>
        <p><strong>Velocidad:</strong> <span id="velocidad">${data.speed}</span> ft</p>
        <p><strong>Bonificadores:</strong> <span id="bonificadores">${habilidades}</span></p>
        <p><strong>Habilidad inicial:</strong> ${habilidadesIniciales}</p>
        <p><strong>Idiomas:</strong> <span id="idiomas">${idiomas}</span></p>
        <p><strong>Descripción de idiomas:</strong> ${data.language_desc}</p>
        <p><strong>Rasgos:</strong> <span id="rasgos">${rasgos}</span></p>
        <p><strong>Alineamiento:</strong>
          <select id="select-alineamiento"></select>
        </p>
      </div>
      <div class="columna-derecha">
        <h3>${data.name}</h3>
        <p id="parrafo-roleplay">
          Nacidos entre la brutalidad y la voluntad, los Half-Orcs son guerreros temidos y supervivientes natos. Su determinación es tan fuerte como su físico, y su presencia impone respeto o miedo allá donde vayan.
        </p>
      </div>
    </div>
  `;
}
/*======= inyección halfling =======*/
function renderHalfling(data) {
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
        <p><strong>Velocidad:</strong> <span id="velocidad">${data.speed}</span> ft</p>
        <p><strong>Bonificadores:</strong> <span id="bonificadores">${habilidades}</span></p>
        <p><strong>Idiomas:</strong> <span id="idiomas">${idiomas}</span></p>
        <p><strong>Descripción de idiomas:</strong> ${data.language_desc}</p>
        <p><strong>Rasgos:</strong> <span id="rasgos">${rasgos}</span></p>
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
          Pequeños en tamaño, enormes en corazón. Los Halflings caminan sin hacer ruido pero con paso firme, llevando con ellos risas, esperanza y una sorprendente capacidad para encontrar la suerte incluso en los momentos más oscuros.
        </p>
      </div>
    </div>
  `;
}
/*======= inyección human =======*/
function renderHuman(data) {
  const habilidades = data.ability_bonuses.map(b => `${b.ability_score.name} +${b.bonus}`).join(', ');
  const idiomas = data.languages.map(l => l.name).join(', ');
  const idiomasExtra = data.language_options.from.options.map(
    opt => `<option value="${opt.item.index}">${opt.item.name}</option>`
  ).join('');

  vistaRaza.innerHTML = `
    <div class="contenedor-razas">
      <div class="columna-izquierda">
        <h2>${data.name}</h2>
        <p><strong>Edad:</strong> ${data.age}</p>
        <p><strong>Tamaño:</strong> ${data.size_description}</p>
        <p><strong>Velocidad:</strong> <span id="velocidad">${data.speed}</span> ft</p>
        <p><strong>Bonificadores:</strong> <span id="bonificadores">${habilidades}</span></p>
        <p><strong>Idiomas:</strong> <span id="idiomas">${idiomas}</span></p>
        <p><strong>Idioma adicional:</strong>
          <select id="select-idioma-extra">${idiomasExtra}</select>
        </p>
        <p><strong>Descripción de idiomas:</strong> ${data.language_desc}</p>
        <p><strong>Alineamiento:</strong>
          <select id="select-alineamiento"></select>
        </p>
      </div>
      <div class="columna-derecha">
        <h3>${data.name}</h3>
        <p id="parrafo-roleplay">
          Adaptables, diversos e impredecibles, los humanos no destacan por una característica específica, sino por su capacidad para brillar en cualquier ámbito. Su potencial ilimitado ha hecho que prosperen en cada rincón del mundo conocido.
        </p>
      </div>
    </div>
  `;
}
/*======= inyección tiefling =======*/
function renderTiefling(data) {
  const habilidades = data.ability_bonuses.map(b => `${b.ability_score.name} +${b.bonus}`).join(', ');
  const idiomas = data.languages.map(l => l.name).join(', ');
  const rasgos = data.traits.map(t => t.name).join(', ');

  vistaRaza.innerHTML = `
    <div class="contenedor-razas">
      <div class="columna-izquierda">
        <h2>${data.name}</h2>
        <p><strong>Edad:</strong> ${data.age}</p>
        <p><strong>Tamaño:</strong> ${data.size_description}</p>
        <p><strong>Velocidad:</strong> <span id="velocidad">${data.speed}</span> ft</p>
        <p><strong>Bonificadores:</strong> <span id="bonificadores">${habilidades}</span></p>
        <p><strong>Idiomas:</strong> <span id="idiomas">${idiomas}</span></p>
        <p><strong>Descripción de idiomas:</strong> ${data.language_desc}</p>
        <p><strong>Rasgos:</strong> <span id="rasgos">${rasgos}</span></p>
        <p><strong>Alineamiento:</strong>
          <select id="select-alineamiento"></select>
        </p>
      </div>
      <div class="columna-derecha">
        <h3>${data.name}</h3>
        <p id="parrafo-roleplay">
          Los Tieflings caminan entre planos con la marca del infierno sobre su sangre. A menudo incomprendidos o temidos, son espíritus fuertes que desafían su oscuro linaje y esculpen su destino con astucia, poder y una voluntad inquebrantable.
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

  document.getElementById('btn-volver').addEventListener('click', () => {
    // Por ahora volvemos al index
    window.location.href = 'index.html';
  });

  document.getElementById('btn-continuar').addEventListener('click', () => {
    // Más adelante redirigimos a la vista de clase
    const raza = razaSeleccionada || 'unknown';

    const alineamiento = document.getElementById("select-alineamiento")?.value || null;
    const velocidad = document.getElementById("velocidad")?.textContent || null;
    const idiomas = document.getElementById("idiomas")?.textContent || null;
    /*
    const idiomasplus = [
      document.getElementById("idiomasplus-1")?.value || null,
      document.getElementById("idiomasplus-2")?.value || null
    ];
    */
    const rasgos = document.getElementById("rasgos")?.textContent || null;
    const subraza = document.getElementById("select-subraza")?.value || null;
    const idioma_extra = document.getElementById("select-idioma-extra")?.value || null;

    const habilidadesSeleccionadas = [
      document.getElementById("select-skill-1")?.value || null,
      document.getElementById("select-skill-2")?.value || null,
      document.getElementById("select-skill-3")?.value || null,
      document.getElementById("select-skill-4")?.value || null
    ];

    const stat_extra_1 = document.getElementById("select-stat-extra-1")?.value || null;
    const stat_extra_2 = document.getElementById("select-stat-extra-2")?.value || null;
    const bonificadores = document.getElementById("bonificadores")?.textContent || null;

    const personaje = JSON.parse(localStorage.getItem("personaje")) || {};
    personaje.raza = raza;
    /* id="velocidad" id="idiomas" id="rasgos" */
    personaje.velocidad = velocidad;
    personaje.idiomas = idiomas;
    /*
    personaje.idiomasplus = idiomasplus;
    */
    personaje.rasgos = rasgos;
    personaje.alineamiento = alineamiento;
    personaje.subraza = subraza;
    personaje.habilidades = habilidadesSeleccionadas;
    personaje.idioma_extra = idioma_extra;
    personaje.stat_extra_1 = stat_extra_1;
    personaje.stat_extra_2 = stat_extra_2;
    personaje.bonificadores = bonificadores;

    localStorage.setItem("personaje", JSON.stringify(personaje));
    console.log("Personaje guardado:", personaje);

    window.location.href = `class.html?raza=${encodeURIComponent(raza)}&paso=clase`;
  });

});


