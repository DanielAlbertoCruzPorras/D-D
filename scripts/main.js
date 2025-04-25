document.documentElement.dataset.theme = 'dark'

// the one piece we need goes here
const list = document.querySelector('ul')
const items = list.querySelectorAll('li')
const setIndex = (event) => {
  const closest = event.target.closest('li')
  if (closest) {
    const index = [...items].indexOf(closest)

    // Evita aplicar lógica de fracciones en pantallas pequeñas
    if (window.innerWidth >= 768) {
      const cols = [...items].map((_, i) => {
        items[i].dataset.active = (index === i).toString()
        return index === i ? '10fr' : '1fr'
      }).join(' ')
      list.style.setProperty('grid-template-columns', cols)
    } else {
      items.forEach((item, i) => {
        item.dataset.active = (index === i).toString()
      })
    }
  }
}

list.addEventListener('focus', setIndex, true)
list.addEventListener('click', setIndex)
list.addEventListener('pointermove', setIndex)

const resync = () => {
    // Evitar aplicar el cálculo si el ancho es pequeño (ej. móvil)
  if (window.innerWidth < 768) return

  const w = Math.max(...[...items].map(i => i.offsetWidth))
  list.style.setProperty('--article-width', w)
}
window.addEventListener('resize', resync)

window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    // Forzamos el ancho correcto del contenido
    resync()

    // Aplicamos la expansión inicial correctamente ya con estilos listos
    const activeIndex = [...items].findIndex(item => item.dataset.active === 'true')
    if (activeIndex !== -1 && window.innerWidth >= 768) {
      const cols = [...items].map((_, i) =>
        i === activeIndex ? '10fr' : '1fr'
      ).join(' ')
      list.style.setProperty('grid-template-columns', cols)
    }
  })
})

resync()



document.addEventListener("DOMContentLoaded", () => {
  const editLinks = document.querySelectorAll(".edit-btn");

  editLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const li = e.target.closest("li");
      const raza = li?.dataset?.raza;

      if (raza) {
        window.location.href = `src/edit.html?raza=${encodeURIComponent(raza)}`;
      }
    });
  });
});


document.getElementById("btn-listar-personajes").addEventListener("click", () => {
  window.location.href = "src/list.html";
});