
# Resumen para Examen de JavaScript (Enfoque Práctico)

---

## 1. Fundamentos

### ¿Qué es JavaScript?
JavaScript es un lenguaje de programación interpretado utilizado principalmente en desarrollo web para hacer que las páginas web sean interactivas. Permite manipular el DOM (Document Object Model), gestionar eventos, trabajar con asincronía, entre otras funcionalidades.

### Tipos de datos primitivos:
- **string**: Cadena de caracteres.
  ```javascript
  let nombre = "Juan";
  ```
- **number**: Números enteros o decimales.
  ```javascript
  let edad = 25;
  ```
- **boolean**: Valor verdadero o falso.
  ```javascript
  let esActivo = true;
  ```
- **undefined**: Variable declarada, pero no inicializada.
  ```javascript
  let x;
  console.log(x); // undefined
  ```
- **null**: Representa la ausencia de valor.
  ```javascript
  let vacio = null;
  ```
- **symbol**: Valor único e inmutable.
  ```javascript
  const simbolo = Symbol('id');
  ```
- **bigint**: Para manejar números enteros grandes.
  ```javascript
  let bigNumber = 1234567890123456789012345678901234567890n;
  ```

### Variables:
- **var**: Declaración de variable con alcance de función o global.
  ```javascript
  var nombre = "Carlos";
  ```
- **let**: Declaración de variable con alcance de bloque.
  ```javascript
  let edad = 30;
  ```
- **const**: Variable constante que no puede ser reasignada.
  ```javascript
  const PI = 3.14;
  ```

### Operadores:
- **Aritméticos**:
  ```javascript
  let suma = 5 + 3; // 8
  let resta = 5 - 3; // 2
  ```
- **Lógicos**:
  ```javascript
  let esAdulto = true;
  let tieneLicencia = false;
  let puedeConducir = esAdulto && tieneLicencia; // false
  ```
- **Comparación**:
  ```javascript
  let a = 10;
  let b = "10";
  console.log(a == b); // true
  console.log(a === b); // false
  ```
- **Asignación**:
  ```javascript
  let x = 5;
  x += 2; // x = 7
  ```

---

## 2. Control de flujo

### Condicionales:
- **if, else, else if**:
  ```javascript
  let edad = 18;
  if (edad >= 18) {
    console.log("Es mayor de edad");
  } else {
    console.log("Es menor de edad");
  }
  ```
- **switch**: Útil cuando se tienen múltiples condiciones.
  ```javascript
  let color = "rojo";
  switch (color) {
    case "rojo":
      console.log("Es rojo");
      break;
    case "azul":
      console.log("Es azul");
      break;
    default:
      console.log("Color no reconocido");
  }
  ```
- **Operador ternario**:
  ```javascript
  let edad = 20;
  let mensaje = edad >= 18 ? "Mayor de edad" : "Menor de edad";
  console.log(mensaje);
  ```

### Bucles:
- **for**: Bucle con índice.
  ```javascript
  for (let i = 0; i < 5; i++) {
    console.log(i); // Imprime 0, 1, 2, 3, 4
  }
  ```
- **while**: Bucle con condición.
  ```javascript
  let i = 0;
  while (i < 5) {
    console.log(i); // Imprime 0, 1, 2, 3, 4
    i++;
  }
  ```
- **do...while**: Bucle que ejecuta al menos una vez.
  ```javascript
  let i = 0;
  do {
    console.log(i); // Imprime 0, 1, 2, 3, 4
    i++;
  } while (i < 5);
  ```
- **break** y **continue**:
  - **break**: Termina el bucle inmediatamente.
  - **continue**: Salta a la siguiente iteración.
  ```javascript
  for (let i = 0; i < 5; i++) {
    if (i === 2) continue; // Salta el 2
    console.log(i); // Imprime 0, 1, 3, 4
  }
  ```

---

## 3. Funciones

### Funciones declaradas, expresadas y flecha:
- **Declarada**:
  ```javascript
  function saludar() {
    console.log("Hola Mundo");
  }
  saludar();
  ```
- **Expresada**:
  ```javascript
  const saludar = function() {
    console.log("Hola Mundo");
  };
  saludar();
  ```
- **Flecha**:
  ```javascript
  const saludar = () => {
    console.log("Hola Mundo");
  };
  saludar();
  ```

### Parámetros por defecto:
```javascript
function saludar(nombre = "Invitado") {
  console.log(`Hola ${nombre}`);
}
saludar(); // Hola Invitado
saludar("Carlos"); // Hola Carlos
```

### Return:
```javascript
function suma(a, b) {
  return a + b;
}
let resultado = suma(2, 3);
console.log(resultado); // 5
```

---

## 4. Objetos y Arrays

### Crear y acceder a objetos y arrays:
- **Objeto**:
  ```javascript
  let persona = {
    nombre: "Juan",
    edad: 30
  };
  console.log(persona.nombre); // Juan
  ```
- **Array**:
  ```javascript
  let numeros = [1, 2, 3, 4];
  console.log(numeros[0]); // 1
  ```

### Métodos básicos de arrays:
```javascript
let numeros = [1, 2, 3, 4];
numeros.push(5); // [1, 2, 3, 4, 5]
numeros.pop(); // [1, 2, 3, 4]
numeros.shift(); // [2, 3, 4]
numeros.unshift(0); // [0, 2, 3, 4]
let nuevoArray = numeros.slice(1, 3); // [2, 3]
```

### Desestructuración:
- **Objeto**:
  ```javascript
  const persona = { nombre: "Juan", edad: 30 };
  const { nombre, edad } = persona;
  console.log(nombre); // Juan
  ```
- **Array**:
  ```javascript
  const numeros = [1, 2, 3];
  const [a, b] = numeros;
  console.log(a); // 1
  ```

---

## 5. DOM (Document Object Model)

### ¿Qué es el DOM?
Es la representación estructural de un documento HTML en forma de objetos, lo que permite manipular el contenido de una página web desde JavaScript.

### Métodos del DOM:
```javascript
let titulo = document.getElementById("titulo");
titulo.innerHTML = "Nuevo Título"; // Cambia el texto del elemento con id "titulo"
```

### Manejo de eventos:
```javascript
document.getElementById("boton").addEventListener("click", function() {
  alert("Botón clickeado");
});
```

---

## 6. Programación Asíncrona

### setTimeout() y setInterval():
- **setTimeout()**: Ejecuta una función después de un tiempo determinado.
  ```javascript
  setTimeout(() => {
    console.log("¡Hola después de 2 segundos!");
  }, 2000);
  ```
- **setInterval()**: Ejecuta una función repetidamente con un intervalo.
  ```javascript
  setInterval(() => {
    console.log("Este mensaje se repite cada 3 segundos");
  }, 3000);
  ```

### Promesas:
```javascript
let promesa = new Promise((resolve, reject) => {
  let exito = true;
  if (exito) {
    resolve("Operación exitosa");
  } else {
    reject("Error en la operación");
  }
});

promesa
  .then((mensaje) => console.log(mensaje)) // Operación exitosa
  .catch((error) => console.log(error)); // Error en la operación
```

### async / await:
```javascript
async function obtenerDatos() {
  let respuesta = await fetch('https://api.example.com');
  let datos = await respuesta.json();
  console.log(datos);
}
obtenerDatos();
```

---

## 7. Manejo de Errores

### try...catch:
```javascript
try {
  let resultado = 10 / 0;
  console.log(resultado);
} catch (error) {
  console.error("Ocurrió un error: " + error);
}
```

### throw:
```javascript
function verificarNumero(num) {
  if (num < 0) {
    throw new Error("El número no puede ser negativo");
  }
  return num;
}
```

---

## 8. Extras

### Template literals:
```javascript
let nombre = "Carlos";
let saludo = `Hola, ${nombre}!`;
console.log(saludo); // Hola, Carlos!
```

### Spread Operator (...) y Rest Operator (...args):
- **Spread**: Copiar elementos de un array o objeto.
  ```javascript
  let arr1 = [1, 2, 3];
  let arr2 = [...arr1, 4, 5];
  console.log(arr2); // [1, 2, 3, 4, 5]
  ```
- **Rest**: Recibir un número indefinido de parámetros.
  ```javascript
  function sumar(...numeros) {
    return numeros.reduce((a, b) => a + b, 0);
  }
  console.log(sumar(1, 2, 3)); // 6
  ```

### LocalStorage y SessionStorage:
- **LocalStorage**: Almacena datos de forma persistente.
  ```javascript
  localStorage.setItem("nombre", "Juan");
  let nombre = localStorage.getItem("nombre");
  console.log(nombre); // Juan
  ```

---

## Consejos para el Examen

- **Usar `console.log()`** para verificar datos.
- **Simular datos si es necesario**.
- **Priorizar `async/await`** para mejor legibilidad.
- **Pensar primero la lógica, luego programar.**

