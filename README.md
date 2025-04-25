# 🧙‍♂️ Forja de Héroes - Editor de Personajes D&D 5e

Bienvenido al proyecto **Forja de Héroes**, un editor web interactivo para la creación de personajes de **Dungeons & Dragons 5ta Edición**, utilizando la API de [dnd5eapi.co](https://www.dnd5eapi.co/).

---

## 📁 Estructura del Proyecto

```
D&D
├── README.md
├── assets
│   └── img
│       └── (todas las imágenes de razas y clases)
├── scripts
│   ├── main.js
│   ├── edit.js
│   ├── class.js
│   ├── final.js
│   └── list.js
├── src
│   ├── index.html         # Página principal
│   ├── edit.html          # Vista de edición de raza
│   ├── class.html         # Vista de clase
│   ├── final.html         # Características y biografía + resumen
│   └── list.html          # Vista para listar personajes de MockAPI
└── styles
    ├── main.css
    ├── edit.css
    └── normalize.css
```

---

## ⚙️ Tecnologías Utilizadas

- HTML5 + CSS3
- JavaScript
- [dnd5eapi.co](https://www.dnd5eapi.co/) para datos oficiales de D&D
- [MockAPI](https://mockapi.io/) para persistencia de personajes

---

## 🌐 Vistas del Proyecto

### 🏠 `index.html`
- Vista de bienvenida con tarjetas ilustrativas de las razas jugables.
- Botón para comenzar la creación de personaje.
- Botón para **listar personajes guardados** (MockAPI).

### 🧬 `edit.html`
- Selección de raza, subraza, alineamiento, idiomas, rasgos y bonificadores.
- Guarda los datos progresivamente en `localStorage`.

### 🛡️ `class.html`
- Selección de clase, habilidades, competencias, salvaciones, equipo y subclase.
- Continua guardando sobre el mismo objeto `personaje` en `localStorage`.

### 🧾 `final.html`
- Asignación de valores aleatorios (2D6) para las características base (STR, DEX, etc).
- Campos para ingresar biografía: nombre, edad, altura, peso y cabello.
- Botón para **guardar personaje** en **MockAPI**.
- Sección dinámica que muestra toda la información consolidada del personaje.
- Botón para regresar a **Home**.

### 📋 `list.html`
- Carga dinámica de todos los personajes almacenados en MockAPI.
- Renderiza cada personaje con el mismo estilo de `final.html`.
- Incluye botón de retorno a **Home**.

---

## 💾 MockAPI
Los personajes creados se almacenan en el endpoint de MockAPI:

```
https://680ac229d5075a76d988e388.mockapi.io/Dungeons/Personajes
```

Cada personaje es guardado como un objeto JSON y puede visualizarse desde `list.html` o mediante consola desde `index.html` con el botón **Listar personajes**.

---

## 🚀 Cómo usar

### Opción 1:

- Simplemente accede desde el enlace de GitHub pages en el presente repositorio. 💯💯

### Opción 2:

1. Clona este repositorio o descarga el ZIP.
2. Abre `src/index.html` en tu navegador.
3. Navega por las vistas seleccionando raza, clase y características.
4. Guarda el personaje final y visualízalo en la misma vista.
5. Revisa la consola si quieres inspeccionar el objeto `personaje` generado.

---

## 👤 Autor
Proyecto creado por un fanático de **D&D**, los **videojuegos de supervivencia** y la **mitología nórdica**. 
- **Daniel Cruz**  
  [![Instagram](https://img.shields.io/badge/Instagram-@daniel_cruz1269-833AB4?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/daniel_cruz1269)

---

## 🎨 Vista Previa
> 🖼️ Las imágenes de fondo y personajes son generadas con IA siguiendo un estilo pictórico tradicional y nórdico.

¡Explora, crea y forja tu héroe ideal!

---

