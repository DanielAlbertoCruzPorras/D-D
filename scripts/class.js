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
    
    const selectClase = document.getElementById("select-clase");
  
    // Cargar lista de clases disponibles
    fetch("https://www.dnd5eapi.co/api/2014/classes")
        .then(res => res.json())
        .then(data => {
            data.results.forEach(clase => {
            const option = document.createElement("option");
            option.value = clase.index;
            option.textContent = clase.name;
            selectClase.appendChild(option);
            });
    
            // Renderizar la primera clase por defecto
            cargarInfoClase(selectClase.value);
        });
  
    // Cambiar clase seleccionada
    selectClase.addEventListener("change", () => {
      cargarInfoClase(selectClase.value);
    });
  
    // Función para cargar datos específicos de una clase
    function cargarInfoClase(index) {
        fetch(`https://www.dnd5eapi.co/api/2014/classes/${index}`)
            .then(res => res.json())
            .then(data => {
            mostrarDatosDeClase(data);
            });
    }
  
/*=================== Switch para inyectar el código de la respectiva clase ===================*/
    function mostrarDatosDeClase(data) {
      const clase = data.index;
  
      switch (clase) {
        case 'barbarian':
          renderBarbarian(data);
          break;
        case 'bard':
            renderBard(data);
            break;
        case 'cleric':
            renderCleric(data);
            break;
        case 'druid':
            renderDruid(data);
            break;
        case 'fighter':
            renderFighter(data);
            break;
        case 'monk':
            renderMonk(data);
            break;
        case 'paladin':
            renderPaladin(data);
            break;
        case 'ranger':
            renderRanger(data);
            break;
        case 'rogue':
            renderRogue(data);
            break;
        case 'sorcerer':
            renderSorcerer(data);
            break;
        case 'warlock':
            renderWarlock(data);
            break;
        case 'wizard':
            renderWizard(data);
            break;
        default:
          document.getElementById("vista-clase").innerHTML = `<p>No hay datos específicos disponibles para esta clase aún.</p>`;
      }
    }
/*======= Función específica para la clase Barbarian =======*/
    function renderBarbarian(data) {
        const habilidadesOpcionales = data.proficiency_choices[0].from.options.map(
          opt => `<option value="${opt.item.index}">${opt.item.name}</option>`
        ).join('');
      
        const competencias = data.proficiencies.map(p => p.name).join(', ');
        const salvaciones = data.saving_throws.map(s => s.name).join(', ');
        const equipoFijo = data.starting_equipment.map(eq => `${eq.equipment.name} x${eq.quantity}`).join(', ');
        const subclases = data.subclasses.map(sc => sc.name).join(', ');
      
        const columnaIzquierda = document.querySelector(".columna-izquierda");
        const columnaDerecha = document.querySelector(".columna-derecha");
      
        // Agrega el contenido restante sin borrar el selector
        columnaIzquierda.innerHTML = `
          <label for="select-clase"><strong>Clase:</strong></label>
          <select id="select-clase"></select>
      
        <p><strong>Dado de Golpe:</strong> <span id="dado-golpe"> d${data.hit_die}</span></p>
        <p><strong>Competencias:</strong> <span id="competencias">${competencias}</span></p>
        <p><strong>Salvaciones:</strong> <span id="salvaciones">${salvaciones}</span></p>
      
          <p><strong>Selecciona 2 habilidades:</strong></p>
          <select id="skill-1">${habilidadesOpcionales}</select>
          <select id="skill-2">${habilidadesOpcionales}</select>
      
          <p><strong>Equipo:</strong> <span id="equipo">${equipoFijo} and (any martial weapon) and (Handaxe (2) or any simple weapon)</span></p>
      
          <p><strong>Subclases:</strong> <span id="subclase">${subclases}</span></p>
        `;
      
        columnaDerecha.innerHTML = `
          <h3>Barbarian</h3>
          <p>
            Un huracán de furia y músculo, el bárbaro no teme al caos. Entra al combate con una fiereza ancestral,
            dejando su huella entre gritos y cicatrices. Su conexión con la ira lo convierte en un titán imparable
            en el campo de batalla.
          </p>
        `;
      
        // Reconectar evento del selector
        const nuevoSelect = document.getElementById("select-clase");
        fetch("https://www.dnd5eapi.co/api/2014/classes")
          .then(res => res.json())
          .then(data => {
            data.results.forEach(clase => {
              const option = document.createElement("option");
              option.value = clase.index;
              option.textContent = clase.name;
              if (clase.index === data.index) option.selected = true;
              nuevoSelect.appendChild(option);
            });
      
            nuevoSelect.addEventListener("change", () => {
              cargarInfoClase(nuevoSelect.value);
            });
          });
    }
/*======= Función específica para la clase Bard =======*/
    function renderBard(data) {
        const habilidades = data.proficiency_choices[0].from.options.map(
        opt => `<option value="${opt.item.index}">${opt.item.name}</option>`
        ).join('');
    
        const instrumentos = data.proficiency_choices[1].from.options.map(
        opt => `<option value="${opt.item.index}">${opt.item.name}</option>`
        ).join('');
    
        const competencias = data.proficiencies.map(p => p.name).join(', ');
        const salvaciones = data.saving_throws.map(s => s.name).join(', ');
        const equipoFijo = data.starting_equipment.map(eq => `${eq.equipment.name} x${eq.quantity}`).join(', ');
        const subclases = data.subclasses.map(sc => sc.name).join(', ');
    
        const columnaIzquierda = document.querySelector(".columna-izquierda");
        const columnaDerecha = document.querySelector(".columna-derecha");
    
        columnaIzquierda.innerHTML = `
        <label for="select-clase"><strong>Clase:</strong></label>
        <select id="select-clase"></select>
    
        <p><strong>Dado de Golpe:</strong> <span id="dado-golpe"> d${data.hit_die}</span></p>
        <p><strong>Competencias:</strong> <span id="competencias">${competencias}</span></p>
        <p><strong>Salvaciones:</strong> <span id="salvaciones">${salvaciones}</span></p>
    
        <p><strong>Selecciona 3 habilidades:</strong></p>
        <select id="skill-1">${habilidades}</select>
        <select id="skill-2">${habilidades}</select>
        <select id="skill-3">${habilidades}</select>
    
        <p><strong>Selecciona 3 instrumentos:</strong></p>
        <select id="instrumento-1">${instrumentos}</select>
        <select id="instrumento-2">${instrumentos}</select>
        <select id="instrumento-3">${instrumentos}</select>
    
        <p><strong>Equipo:</strong> <span id="equipo">${equipoFijo} and (a rapier, a longsword, or any simple weapon) and (a diplomat’s pack or an entertainer’s pack) and (a lute or any other musical instrument)</span></p>
    
        <p><strong>Subclases:</strong> <span id="subclase">${subclases}</span></p>
        `;
    
        columnaDerecha.innerHTML = `
        <h3>Bard</h3>
        <p>
            El bardo es la sinfonía de la aventura. Maestro de palabras, música y magia, transforma lo cotidiano en leyenda. 
            Sus melodías embriagan, inspiran y desatan conjuros ancestrales. Allí donde otros empuñan espadas, el bardo blande su arte como su arma más poderosa.
        </p>
        `;
    
        const nuevoSelect = document.getElementById("select-clase");
        fetch("https://www.dnd5eapi.co/api/2014/classes")
        .then(res => res.json())
        .then(data => {
            data.results.forEach(clase => {
            const option = document.createElement("option");
            option.value = clase.index;
            option.textContent = clase.name;
            if (clase.index === "bard") option.selected = true;
            nuevoSelect.appendChild(option);
            });
    
            nuevoSelect.addEventListener("change", () => {
            cargarInfoClase(nuevoSelect.value);
            });
        });
    }
/*======= Función específica para la clase Cleric =======*/
    function renderCleric(data) {
        const habilidades = data.proficiency_choices[0].from.options.map(
        opt => `<option value="${opt.item.index}">${opt.item.name}</option>`
        ).join('');
    
        const competencias = data.proficiencies.map(p => p.name).join(', ');
        const salvaciones = data.saving_throws.map(s => s.name).join(', ');
        const equipoFijo = data.starting_equipment.map(eq => `${eq.equipment.name} x${eq.quantity}`).join(', ');
        const subclases = data.subclasses.map(sc => sc.name).join(', ');
    
        const columnaIzquierda = document.querySelector(".columna-izquierda");
        const columnaDerecha = document.querySelector(".columna-derecha");
    
        columnaIzquierda.innerHTML = `
        <label for="select-clase"><strong>Clase:</strong></label>
        <select id="select-clase"></select>
    
        <p><strong>Dado de Golpe:</strong> <span id="dado-golpe"> d${data.hit_die}</span></p>
        <p><strong>Competencias:</strong> <span id="competencias">${competencias}</span></p>
        <p><strong>Salvaciones:</strong> <span id="salvaciones">${salvaciones}</span></p>
    
        <p><strong>Selecciona 2 habilidades:</strong></p>
        <select id="skill-1">${habilidades}</select>
        <select id="skill-2">${habilidades}</select>
    
        <p><strong>Equipo:</strong> <span id="equipo">${equipoFijo} and (a mace or a warhammer if proficient), (scale mail, leather armor, or chain mail if proficient), (light crossbow and 20 bolts or any simple weapon), (priest’s pack or explorer’s pack), (holy symbol)</span></p>
    
        <p><strong>Subclases:</strong> <span id="subclase">${subclases}</span></p>
        `;
    
        columnaDerecha.innerHTML = `
        <h3>Cleric</h3>
        <p>
            Canalizando el poder divino, el clérigo se convierte en el faro de su fe. Sanador, guerrero o inquisidor, su devoción moldea realidades.
            Desde el más oscuro rincón de una cripta hasta el altar más sagrado, el clérigo invoca lo divino para proteger, castigar y transformar el mundo.
        </p>
        `;
    
        const nuevoSelect = document.getElementById("select-clase");
        fetch("https://www.dnd5eapi.co/api/2014/classes")
        .then(res => res.json())
        .then(data => {
            data.results.forEach(clase => {
            const option = document.createElement("option");
            option.value = clase.index;
            option.textContent = clase.name;
            if (clase.index === "cleric") option.selected = true;
            nuevoSelect.appendChild(option);
            });
    
            nuevoSelect.addEventListener("change", () => {
            cargarInfoClase(nuevoSelect.value);
            });
        });
    }
/*======= Función específica para la clase Druid =======*/
    function renderDruid(data) {
        const habilidades = data.proficiency_choices[0].from.options.map(
        opt => `<option value="${opt.item.index}">${opt.item.name}</option>`
        ).join('');
    
        const competencias = data.proficiencies.map(p => p.name).join(', ');
        const salvaciones = data.saving_throws.map(s => s.name).join(', ');
        const equipoFijo = data.starting_equipment.map(eq => `${eq.equipment.name} x${eq.quantity}`).join(', ');
        const subclases = data.subclasses.map(sc => sc.name).join(', ');
    
        const columnaIzquierda = document.querySelector(".columna-izquierda");
        const columnaDerecha = document.querySelector(".columna-derecha");
    
        columnaIzquierda.innerHTML = `
        <label for="select-clase"><strong>Clase:</strong></label>
        <select id="select-clase"></select>
    
        <p><strong>Dado de Golpe:</strong> <span id="dado-golpe"> d${data.hit_die}</span></p>
        <p><strong>Competencias:</strong> <span id="competencias">${competencias}</span></p>
        <p><strong>Salvaciones:</strong> <span id="salvaciones">${salvaciones}</span></p>
    
        <p><strong>Selecciona 2 habilidades:</strong></p>
        <select id="skill-1">${habilidades}</select>
        <select id="skill-2">${habilidades}</select>
    
        <p><strong>Equipo:</strong> <span id="equipo">${equipoFijo} and (a wooden shield or any simple weapon), (a scimitar or any simple melee weapon), (druidic focus)</span></p>
    
        <p><strong>Subclases:</strong> <span id="subclase">${subclases}</span></p>
        `;
    
        columnaDerecha.innerHTML = `
        <h3>Druid</h3>
        <p>
            El druida es la encarnación de la naturaleza, capaz de transformarse y canalizar las fuerzas elementales para proteger el equilibrio del mundo.
            Maestro de los ciclos de la vida y guardián de los secretos del bosque, el druida camina entre el mundo salvaje y el civilizado, guiado por la armonía de los espíritus naturales.
        </p>
        `;
    
        const nuevoSelect = document.getElementById("select-clase");
        fetch("https://www.dnd5eapi.co/api/2014/classes")
        .then(res => res.json())
        .then(data => {
            data.results.forEach(clase => {
            const option = document.createElement("option");
            option.value = clase.index;
            option.textContent = clase.name;
            if (clase.index === "druid") option.selected = true;
            nuevoSelect.appendChild(option);
            });
    
            nuevoSelect.addEventListener("change", () => {
            cargarInfoClase(nuevoSelect.value);
            });
        });
    }
/*======= Función específica para la clase Fighter =======*/
    function renderFighter(data) {
        const habilidades = data.proficiency_choices[0].from.options.map(
        opt => `<option value="${opt.item.index}">${opt.item.name}</option>`
        ).join('');
    
        const competencias = data.proficiencies.map(p => p.name).join(', ');
        const salvaciones = data.saving_throws.map(s => s.name).join(', ');
        const equipoFijo = data.starting_equipment.map(eq => `${eq.equipment.name} x${eq.quantity}`).join(', ') || "—";
        const subclases = data.subclasses.map(sc => sc.name).join(', ');
    
        const columnaIzquierda = document.querySelector(".columna-izquierda");
        const columnaDerecha = document.querySelector(".columna-derecha");
    
        columnaIzquierda.innerHTML = `
        <label for="select-clase"><strong>Clase:</strong></label>
        <select id="select-clase"></select>
    
        <p><strong>Dado de Golpe:</strong> <span id="dado-golpe"> d${data.hit_die}</span></p>
        <p><strong>Competencias:</strong> <span id="competencias">${competencias}</span></p>
        <p><strong>Salvaciones:</strong> <span id="salvaciones">${salvaciones}</span></p>
    
        <p><strong>Selecciona 2 habilidades:</strong></p>
        <select id="skill-1">${habilidades}</select>
        <select id="skill-2">${habilidades}</select>
    
        <p><strong>Equipo:</strong> <span id="equipo">${equipoFijo} and (chain mail or leather armor, longbow, and 20 arrows), (a martial weapon and a shield or two martial weapons), (a light crossbow and 20 bolts or two handaxes), (a dungeoneer’s pack or an explorer’s pack)</span></p>
    
        <p><strong>Subclases:</strong> <span id="subclase">${subclases}</span></p>
        `;
    
        columnaDerecha.innerHTML = `
        <h3>Fighter</h3>
        <p>
            El luchador es un experto en combate, maestro del acero, la estrategia y la tenacidad. Capaz de adaptarse a cualquier estilo de lucha, 
            puede ser un defensor estoico, un duelista veloz o un maestro del arco. En cualquier frente de batalla, el luchador marca la diferencia.
        </p>
        `;
    
        const nuevoSelect = document.getElementById("select-clase");
        fetch("https://www.dnd5eapi.co/api/2014/classes")
        .then(res => res.json())
        .then(data => {
            data.results.forEach(clase => {
            const option = document.createElement("option");
            option.value = clase.index;
            option.textContent = clase.name;
            if (clase.index === "fighter") option.selected = true;
            nuevoSelect.appendChild(option);
            });
    
            nuevoSelect.addEventListener("change", () => {
            cargarInfoClase(nuevoSelect.value);
            });
        });
    }
/*======= Función específica para la clase Monk =======*/
    function renderMonk(data) {
        const habilidades = data.proficiency_choices[0].from.options.map(
        opt => `<option value="${opt.item.index}">${opt.item.name}</option>`
        ).join('');
    
        const competencias = data.proficiencies.map(p => p.name).join(', ');
        const salvaciones = data.saving_throws.map(s => s.name).join(', ');
        const equipoFijo = data.starting_equipment.map(eq => `${eq.equipment.name} x${eq.quantity}`).join(', ');
        const subclases = data.subclasses.map(sc => sc.name).join(', ');
    
        const columnaIzquierda = document.querySelector(".columna-izquierda");
        const columnaDerecha = document.querySelector(".columna-derecha");
    
        columnaIzquierda.innerHTML = `
        <label for="select-clase"><strong>Clase:</strong></label>
        <select id="select-clase"></select>
    
        <p><strong>Dado de Golpe:</strong> <span id="dado-golpe"> d${data.hit_die}</span></p>
        <p><strong>Competencias:</strong> <span id="competencias">${competencias}</span></p>
        <p><strong>Salvaciones:</strong> <span id="salvaciones">${salvaciones}</span></p>
    
        <p><strong>Selecciona 2 habilidades:</strong></p>
        <select id="skill-1">${habilidades}</select>
        <select id="skill-2">${habilidades}</select>
    
        <p><strong>Equipo:</strong> <span id="equipo">${equipoFijo} and (a shortsword or any simple weapon), (a dungeoneer’s pack or an explorer’s pack)</span></p>
    
        <p><strong>Subclases:</strong> <span id="subclase">${subclases}</span></p>
        `;
    
        columnaDerecha.innerHTML = `
        <h3>Monk</h3>
        <p>
            El monje canaliza su energía interna para realizar hazañas sobrehumanas, combinando disciplina mental y física en cada movimiento.
            Sin necesidad de armadura, su cuerpo es un arma letal, y su mente, un templo. Con velocidad y gracia, el monje convierte cada batalla en una danza de perfección marcial.
        </p>
        `;
    
        const nuevoSelect = document.getElementById("select-clase");
        fetch("https://www.dnd5eapi.co/api/2014/classes")
        .then(res => res.json())
        .then(data => {
            data.results.forEach(clase => {
            const option = document.createElement("option");
            option.value = clase.index;
            option.textContent = clase.name;
            if (clase.index === "monk") option.selected = true;
            nuevoSelect.appendChild(option);
            });
    
            nuevoSelect.addEventListener("change", () => {
            cargarInfoClase(nuevoSelect.value);
            });
        });
    }  
/*======= Función específica para la clase Paladin =======*/
    function renderPaladin(data) {
        const habilidades = data.proficiency_choices[0].from.options.map(
        opt => `<option value="${opt.item.index}">${opt.item.name}</option>`
        ).join('');
    
        const competencias = data.proficiencies.map(p => p.name).join(', ');
        const salvaciones = data.saving_throws.map(s => s.name).join(', ');
        const equipoFijo = data.starting_equipment.map(eq => `${eq.equipment.name} x${eq.quantity}`).join(', ');
        const subclases = data.subclasses.map(sc => sc.name).join(', ');
    
        const columnaIzquierda = document.querySelector(".columna-izquierda");
        const columnaDerecha = document.querySelector(".columna-derecha");
    
        columnaIzquierda.innerHTML = `
        <label for="select-clase"><strong>Clase:</strong></label>
        <select id="select-clase"></select>
    
        <p><strong>Dado de Golpe:</strong> <span id="dado-golpe"> d${data.hit_die}</span></p>
        <p><strong>Competencias:</strong> <span id="competencias">${competencias}</span></p>
        <p><strong>Salvaciones:</strong> <span id="salvaciones">${salvaciones}</span></p>
    
        <p><strong>Selecciona 2 habilidades:</strong></p>
        <select id="skill-1">${habilidades}</select>
        <select id="skill-2">${habilidades}</select>
    
        <p><strong>Equipo:</strong> <span id="equipo">${equipoFijo} and (a martial weapon and a shield or two martial weapons), (five javelins or any simple melee weapon), (a priest’s pack or an explorer’s pack), (holy symbol)</span></p>
    
        <p><strong>Subclases:</strong> <span id="subclase">${subclases}</span></p>
        `;
    
        columnaDerecha.innerHTML = `
        <h3>Paladin</h3>
        <p>
            El paladín es un campeón sagrado, juramentado para defender la justicia y la rectitud, imbuido de poder divino para castigar el mal.
            Su fe es su espada, su juramento es su escudo. Ya sea en templos, ruinas o campos de batalla, el paladín inspira esperanza y temor por igual.
        </p>
        `;
    
        const nuevoSelect = document.getElementById("select-clase");
        fetch("https://www.dnd5eapi.co/api/2014/classes")
        .then(res => res.json())
        .then(data => {
            data.results.forEach(clase => {
            const option = document.createElement("option");
            option.value = clase.index;
            option.textContent = clase.name;
            if (clase.index === "paladin") option.selected = true;
            nuevoSelect.appendChild(option);
            });
    
            nuevoSelect.addEventListener("change", () => {
            cargarInfoClase(nuevoSelect.value);
            });
        });
    }  
/*======= Función específica para la clase Ranger =======*/
    function renderRanger(data) {
        const habilidades = data.proficiency_choices[0].from.options.map(
        opt => `<option value="${opt.item.index}">${opt.item.name}</option>`
        ).join('');
    
        const competencias = data.proficiencies.map(p => p.name).join(', ');
        const salvaciones = data.saving_throws.map(s => s.name).join(', ');
        const equipoFijo = data.starting_equipment.map(eq => `${eq.equipment.name} x${eq.quantity}`).join(', ');
        const subclases = data.subclasses.map(sc => sc.name).join(', ');
    
        const columnaIzquierda = document.querySelector(".columna-izquierda");
        const columnaDerecha = document.querySelector(".columna-derecha");
    
        columnaIzquierda.innerHTML = `
        <label for="select-clase"><strong>Clase:</strong></label>
        <select id="select-clase"></select>
    
        <p><strong>Dado de Golpe:</strong> <span id="dado-golpe"> d${data.hit_die}</span></p>
        <p><strong>Competencias:</strong> <span id="competencias">${competencias}</span></p>
        <p><strong>Salvaciones:</strong> <span id="salvaciones">${salvaciones}</span></p>
    
        <p><strong>Selecciona 3 habilidades:</strong></p>
        <select id="skill-1">${habilidades}</select>
        <select id="skill-2">${habilidades}</select>
        <select id="skill-3">${habilidades}</select>
    
        <p><strong>Equipo:</strong> <span id="equipo">${equipoFijo} and (scale mail or leather armor), (two shortswords or two simple melee weapons), (a dungeoneer’s pack or an explorer’s pack)</span></p>
    
        <p><strong>Subclases:</strong> <span id="subclase">${subclases}</span></p>
        `;
    
        columnaDerecha.innerHTML = `
        <h3>Ranger</h3>
        <p>
            El explorador es un cazador entre las sombras, un protector de los reinos salvajes y un rastreador sin igual.
            Donde otros ven árboles, él ve caminos. Donde otros se pierden, él encuentra a la presa. El ranger es la frontera entre la civilización y lo desconocido.
        </p>
        `;
    
        const nuevoSelect = document.getElementById("select-clase");
        fetch("https://www.dnd5eapi.co/api/2014/classes")
        .then(res => res.json())
        .then(data => {
            data.results.forEach(clase => {
            const option = document.createElement("option");
            option.value = clase.index;
            option.textContent = clase.name;
            if (clase.index === "ranger") option.selected = true;
            nuevoSelect.appendChild(option);
            });
    
            nuevoSelect.addEventListener("change", () => {
            cargarInfoClase(nuevoSelect.value);
            });
        });
    }  
/*======= Función específica para la clase Rogue =======*/
    function renderRogue(data) {
        const habilidades = data.proficiency_choices[0].from.options.map(
        opt => `<option value="${opt.item.index}">${opt.item.name}</option>`
        ).join('');
    
        const competencias = data.proficiencies.map(p => p.name).join(', ');
        const salvaciones = data.saving_throws.map(s => s.name).join(', ');
        const equipoFijo = data.starting_equipment.map(eq => `${eq.equipment.name} x${eq.quantity}`).join(', ');
        const subclases = data.subclasses.map(sc => sc.name).join(', ');
    
        const columnaIzquierda = document.querySelector(".columna-izquierda");
        const columnaDerecha = document.querySelector(".columna-derecha");
    
        columnaIzquierda.innerHTML = `
        <label for="select-clase"><strong>Clase:</strong></label>
        <select id="select-clase"></select>
    
        <p><strong>Dado de Golpe:</strong> <span id="dado-golpe"> d${data.hit_die}</span></p>
        <p><strong>Competencias:</strong> <span id="competencias">${competencias}</span></p>
        <p><strong>Salvaciones:</strong> <span id="salvaciones">${salvaciones}</span></p>
    
        <p><strong>Selecciona 4 habilidades:</strong></p>
        <select id="skill-1">${habilidades}</select>
        <select id="skill-2">${habilidades}</select>
        <select id="skill-3">${habilidades}</select>
        <select id="skill-4">${habilidades}</select>
    
        <p><strong>Equipo:</strong> <span id="equipo">${equipoFijo} and (a rapier or a shortsword), (a shortbow and quiver of 20 arrows or a shortsword), (a burglar’s pack, a dungeoneer’s pack, or an explorer’s pack)</span></p>
    
        <p><strong>Subclases:</strong> <span id="subclase">${subclases}</span></p>
        `;
    
        columnaDerecha.innerHTML = `
        <h3>Rogue</h3>
        <p>
            El pícaro se desliza entre las sombras, domina la sorpresa y la precisión letal. Maestro del sigilo, la intriga y los golpes certeros,
            encuentra oportunidades donde otros ven peligro. Ya sea como ladrón, espía o asesino, el rogue es el rey de lo inesperado.
        </p>
        `;
    
        const nuevoSelect = document.getElementById("select-clase");
        fetch("https://www.dnd5eapi.co/api/2014/classes")
        .then(res => res.json())
        .then(data => {
            data.results.forEach(clase => {
            const option = document.createElement("option");
            option.value = clase.index;
            option.textContent = clase.name;
            if (clase.index === "rogue") option.selected = true;
            nuevoSelect.appendChild(option);
            });
    
            nuevoSelect.addEventListener("change", () => {
            cargarInfoClase(nuevoSelect.value);
            });
        });
    }  
/*======= Función específica para la clase Sorcerer =======*/
    function renderSorcerer(data) {
        const habilidades = data.proficiency_choices[0].from.options.map(
        opt => `<option value="${opt.item.index}">${opt.item.name}</option>`
        ).join('');
    
        const competencias = data.proficiencies.map(p => p.name).join(', ');
        const salvaciones = data.saving_throws.map(s => s.name).join(', ');
        const equipoFijo = data.starting_equipment.map(eq => `${eq.equipment.name} x${eq.quantity}`).join(', ');
        const subclases = data.subclasses.map(sc => sc.name).join(', ');
    
        const columnaIzquierda = document.querySelector(".columna-izquierda");
        const columnaDerecha = document.querySelector(".columna-derecha");
    
        columnaIzquierda.innerHTML = `
        <label for="select-clase"><strong>Clase:</strong></label>
        <select id="select-clase"></select>
    
        <p><strong>Dado de Golpe:</strong> <span id="dado-golpe"> d${data.hit_die}</span></p>
        <p><strong>Competencias:</strong> <span id="competencias">${competencias}</span></p>
        <p><strong>Salvaciones:</strong> <span id="salvaciones">${salvaciones}</span></p>
    
        <p><strong>Selecciona 2 habilidades:</strong></p>
        <select id="skill-1">${habilidades}</select>
        <select id="skill-2">${habilidades}</select>
    
        <p><strong>Equipo:</strong> <span id="equipo">${equipoFijo} and (a light crossbow and 20 bolts or any simple weapon), (a component pouch or an arcane focus), (a dungeoneer’s pack or an explorer’s pack)</span></p>
    
        <p><strong>Subclases:</strong> <span id="subclase">${subclases}</span></p>
        `;
    
        columnaDerecha.innerHTML = `
        <h3>Sorcerer</h3>
        <p>
            El hechicero es un canal viviente de magia bruta. No aprende conjuros... los esculpe desde la esencia misma de su alma.
            Con una voluntad poderosa y un linaje místico, el sorcerer desata energía arcana con pura determinación, dejando huellas de poder en cada palabra susurrada o mirada intensa.
        </p>
        `;
    
        const nuevoSelect = document.getElementById("select-clase");
        fetch("https://www.dnd5eapi.co/api/2014/classes")
        .then(res => res.json())
        .then(data => {
            data.results.forEach(clase => {
            const option = document.createElement("option");
            option.value = clase.index;
            option.textContent = clase.name;
            if (clase.index === "sorcerer") option.selected = true;
            nuevoSelect.appendChild(option);
            });
    
            nuevoSelect.addEventListener("change", () => {
            cargarInfoClase(nuevoSelect.value);
            });
        });
    }  
/*======= Función específica para la clase Warlock =======*/
    function renderWarlock(data) {
        const habilidades = data.proficiency_choices[0].from.options.map(
        opt => `<option value="${opt.item.index}">${opt.item.name}</option>`
        ).join('');
    
        const competencias = data.proficiencies.map(p => p.name).join(', ');
        const salvaciones = data.saving_throws.map(s => s.name).join(', ');
        const equipoFijo = data.starting_equipment.map(eq => `${eq.equipment.name} x${eq.quantity}`).join(', ');
        const subclases = data.subclasses.map(sc => sc.name).join(', ');
    
        const columnaIzquierda = document.querySelector(".columna-izquierda");
        const columnaDerecha = document.querySelector(".columna-derecha");
    
        columnaIzquierda.innerHTML = `
        <label for="select-clase"><strong>Clase:</strong></label>
        <select id="select-clase"></select>
    
        <p><strong>Dado de Golpe:</strong> <span id="dado-golpe"> d${data.hit_die}</span></p>
        <p><strong>Competencias:</strong> <span id="competencias">${competencias}</span></p>
        <p><strong>Salvaciones:</strong> <span id="salvaciones">${salvaciones}</span></p>
    
        <p><strong>Selecciona 2 habilidades:</strong></p>
        <select id="skill-1">${habilidades}</select>
        <select id="skill-2">${habilidades}</select>
    
        <p><strong>Equipo:</strong> <span id="equipo">${equipoFijo} and (a light crossbow and 20 bolts or any simple weapon), (a component pouch or an arcane focus), (a scholar’s pack or a dungeoneer’s pack), and (any simple weapon)</span></p>
    
        <p><strong>Subclases:</strong> <span id="subclase">${subclases}</span></p>
        `;
    
        columnaDerecha.innerHTML = `
        <h3>Warlock</h3>
        <p>
            El warlock es un tejedor de pactos, un canal viviente de energías arcanas ancestrales. 
            Su magia no proviene del estudio, sino de un acuerdo sellado con una entidad poderosa: un demonio, un antiguo ser, o incluso un dios olvidado. 
            Cada palabra que pronuncia y cada gesto que traza es un recordatorio del precio del poder… y del poder que puede desatar.
        </p>
        `;
    
        const nuevoSelect = document.getElementById("select-clase");
        fetch("https://www.dnd5eapi.co/api/2014/classes")
        .then(res => res.json())
        .then(data => {
            data.results.forEach(clase => {
            const option = document.createElement("option");
            option.value = clase.index;
            option.textContent = clase.name;
            if (clase.index === "warlock") option.selected = true;
            nuevoSelect.appendChild(option);
            });
    
            nuevoSelect.addEventListener("change", () => {
            cargarInfoClase(nuevoSelect.value);
            });
        });
    }  
/*======= Función específica para la clase Wizard =======*/
/*
        <p><strong>Dado de Golpe:</strong> <span id="dado-golpe"> d${data.hit_die}</span></p>
        <p><strong>Competencias:</strong> <span id="competencias"> ${competencias}</span></p>
        <p><strong>Salvaciones:</strong> <span id="salvaciones"> ${salvaciones}</span></p>
*/
    function renderWizard(data) {
        const habilidades = data.proficiency_choices[0].from.options.map(
        opt => `<option value="${opt.item.index}">${opt.item.name}</option>`
        ).join('');
    
        const competencias = data.proficiencies.map(p => p.name).join(', ');
        const salvaciones = data.saving_throws.map(s => s.name).join(', ');
        const equipoFijo = data.starting_equipment.map(eq => `${eq.equipment.name} x${eq.quantity}`).join(', ');
        const subclases = data.subclasses.map(sc => sc.name).join(', ');
    
        const columnaIzquierda = document.querySelector(".columna-izquierda");
        const columnaDerecha = document.querySelector(".columna-derecha");
    
        columnaIzquierda.innerHTML = `
        <label for="select-clase"><strong>Clase:</strong></label>
        <select id="select-clase"></select>
    
        <p><strong>Dado de Golpe:</strong> <span id="dado-golpe"> d${data.hit_die}</span></p>
        <p><strong>Competencias:</strong> <span id="competencias">${competencias}</span></p>
        <p><strong>Salvaciones:</strong> <span id="salvaciones">${salvaciones}</span></p>
    
        <p><strong>Selecciona 2 habilidades:</strong></p>
        <select id="skill-1">${habilidades}</select>
        <select id="skill-2">${habilidades}</select>
    
        <p><strong>Equipo:</strong> <span id="equipo">${equipoFijo} and (a quarterstaff or a dagger), (a component pouch or an arcane focus), (a scholar’s pack or an explorer’s pack)</span></p>
    
        <p><strong>Subclases:</strong> <span id="subclase">${subclases}</span></p>
        `;
    
        columnaDerecha.innerHTML = `
        <h3>Wizard</h3>
        <p>
            El mago es el epítome del conocimiento mágico. Con años de estudio, grimorios llenos de secretos arcanos y una mente afilada como un cuchillo,
            el wizard transforma la sabiduría en poder. Ya sea para invocar llamas, manipular el tiempo o proteger a sus aliados, su magia es precisa y devastadora.
        </p>
        `;
    
        const nuevoSelect = document.getElementById("select-clase");
        fetch("https://www.dnd5eapi.co/api/2014/classes")
        .then(res => res.json())
        .then(data => {
            data.results.forEach(clase => {
            const option = document.createElement("option");
            option.value = clase.index;
            option.textContent = clase.name;
            if (clase.index === "wizard") option.selected = true;
            nuevoSelect.appendChild(option);
            });
    
            nuevoSelect.addEventListener("change", () => {
            cargarInfoClase(nuevoSelect.value);
            });
        });
    }  
      
    // Botón VOLVER
    document.getElementById("btn-volver").addEventListener("click", () => {
      history.back();
    });
  
    // Botón CONTINUAR
    document.getElementById("btn-continuar").addEventListener("click", () => {
        const raza = razaSeleccionada || 'unknown';
        const clase = document.getElementById("select-clase")?.value || "unknown";
    
        const dadoGolpe = document.getElementById("dado-golpe")?.textContent.trim() || null;
        const salvaciones = document.getElementById("salvaciones")?.textContent.trim() || null;
        const competencias = document.getElementById("competencias")?.textContent.trim() || null;
    
        const habilidadesSeleccionadas = [
            document.getElementById("skill-1")?.value || null,
            document.getElementById("skill-2")?.value || null,
            document.getElementById("skill-3")?.value || null,
            document.getElementById("skill-4")?.value || null
        ];
        const instrumentosSeleccionados = [
            document.getElementById("instrumento-1")?.value || null,
            document.getElementById("instrumento-2")?.value || null,
            document.getElementById("instrumento-3")?.value || null,
            document.getElementById("instrumento-4")?.value || null
        ];
    
        const equipo = document.getElementById("equipo")?.textContent.trim() || null;
        const subclase = document.getElementById("subclase")?.textContent.trim() || null;
    
        const personaje = JSON.parse(localStorage.getItem("personaje")) || {};
        personaje.clase = clase;
        personaje.dado_golpe = dadoGolpe;
        personaje.salvaciones = salvaciones;
        personaje.competencias = competencias;
        personaje.habilidades.push(habilidadesSeleccionadas);
        personaje.habilidades = personaje.habilidades.filter(item => item !== null); /* Para eliminar null */
        personaje.instrumentos = instrumentosSeleccionados;
        personaje.instrumentos = personaje.instrumentos.filter(item => item !== null);
        personaje.equipo = equipo;
        personaje.subclase = subclase;
    
        localStorage.setItem("personaje", JSON.stringify(personaje));
        console.log("Personaje actualizado:", personaje);
    
        window.location.href = `final.html?raza=${encodeURIComponent(raza)}&clase=${encodeURIComponent(clase)}&paso=final`;
    });

});
  

  