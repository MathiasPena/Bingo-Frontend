// Objeto global que almacenará la relación número -> índice
let numberIndexMap = {};

// Función para generar el cartón de bingo
function generateBingoCard(card) {
    const bingoCardContainer = document.getElementById('bingo-card'); // Contenedor donde se mostrará el cartón
    bingoCardContainer.innerHTML = ''; // Limpiar contenido previo

    const table = document.createElement('table'); // Crear la tabla para el cartón de bingo
    table.classList.add('table', 'table-bordered', 'table-striped'); // Añadir clases de Bootstrap para estilo

    const rows = 5; // Número de filas (5x5 para el cartón de bingo)

    // Crear la fila de cabecera con las letras B, I, N, G, O
    const headerRow = table.insertRow();
    ['B', 'I', 'N', 'G', 'O'].forEach(letter => {
        const cell = headerRow.insertCell();
        cell.textContent = letter; // Asignar letra a la celda
        cell.classList.add('bingo-header'); // Añadir clase para estilo
    });

    // Ordenar los números del cartón y dividirlos en 5 grupos
    const allNumbers = [...card].sort((a, b) => a - b); // Ordenar los números
    const chunks = [];
    for (let i = 0; i < 5; i++) {
        chunks.push(allNumbers.splice(0, 5)); // Dividir en 5 grupos
    }

    // Función para mezclar los números dentro de cada grupo
    const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
    chunks.forEach((chunk) => {
        shuffle(chunk); // Barajar cada grupo de números
    });

    let index = 0; // Índice para las celdas de la tabla

    // Crear las filas del cartón de bingo
    for (let i = 0; i < rows; i++) {
        const row = table.insertRow();

        // Crear las celdas con los números para cada columna
        ['B', 'I', 'N', 'G', 'O'].forEach((letter, colIndex) => {
            const cell = row.insertCell();
            let number = chunks[colIndex][i]; // Obtener el número para la celda correspondiente

            // Caso especial para la celda central (espacio libre)
            if (i === 2 && colIndex === 2) {
                cell.textContent = 'Free'; // Asignar 'Free' al espacio central
                cell.classList.add('free-space'); // Añadir clase para estilo
                cell.setAttribute("data-index", index); // Asignar índice para espacio libre
                numberIndexMap['Free'] = index; // Guardar en el objeto global como clave-valor
            } else {
                cell.textContent = number; // Asignar el número correspondiente
                cell.setAttribute("data-number", number); // Asignar atributo con el número
                cell.setAttribute("data-index", index); // Asignar índice a la celda con número
                numberIndexMap[number] = index; // Guardar número e índice en el objeto global
            }

            cell.classList.add('bingo-cell'); // Añadir clase para estilo
            index++; // Incrementar el índice para la siguiente celda
        });
    }

    // Mostrar el objeto numberIndexMap completo en la consola para depuración
    console.log("Objeto numberIndexMap completo:", numberIndexMap);

    // Agregar la tabla generada al contenedor del cartón de bingo
    bingoCardContainer.appendChild(table);
}