// Función que se llama para verificar si hay bingo
function checkBingo() {
    // Convertir los números marcados en un array de posiciones usando numberIndexMap
    // Esto mapea los números marcados (en markedNumbers) a sus posiciones en el tablero usando el mapa de índices
    const markedPositions = markedNumbers.map(num => numberIndexMap[num]);

    // Definir las condiciones de ganar (líneas horizontales, verticales, diagonales y esquinas)
    const winningPatterns = [
        // Filas horizontales: cada array contiene las posiciones correspondientes a una fila
        [0, 1, 2, 3, 4],  // Fila 1 (Índices de las primeras cinco celdas en el tablero)
        [5, 6, 7, 8, 9],  // Fila 2
        [10, 11, 13, 14], // Fila 3 (Nota que faltan dos números, por lo que este patrón no es completo)
        [15, 16, 17, 18, 19], // Fila 4
        [20, 21, 22, 23, 24], // Fila 5

        // Columnas verticales: cada array contiene las posiciones correspondientes a una columna
        [0, 5, 10, 15, 20],  // Columna 1
        [1, 6, 11, 16, 21],  // Columna 2
        [2, 7, 17, 22],      // Columna 3
        [3, 8, 13, 18, 23],  // Columna 4
        [4, 9, 14, 19, 24],  // Columna 5

        // Diagonales: las dos diagonales principales
        [0, 6, 18, 24],  // Diagonal 1 (de arriba a abajo)
        [4, 8, 16, 20],  // Diagonal 2 (de abajo a arriba)

        // Esquinas: las cuatro esquinas del tablero
        [0, 4, 20, 24],

        // Todas las celdas (esta condición sería válida para un "Bingo" en tod el tablero)
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    ];

    // Verificar si alguna de las condiciones de ganar está completa
    for (let pattern of winningPatterns) {
        // Comprobar si todas las posiciones de un patrón están marcadas
        const isBingo = pattern.every(position => markedPositions.includes(position));
        if (isBingo) {
            // Si hay un bingo, notificar al usuario
            alert("¡Bingo! Has ganado.");
            // Cerrar la conexión WebSocket para finalizar la partida
            closeWebSocketConnection();
            // Redirigir al usuario a la página de menú
            window.location.href = "menu.html";
            return true;
        }
    }

    // Si no se encontró un bingo, mostrar un mensaje indicando que no hay bingo
    alert("No has hecho bingo aún!.");
    // Cerrar la conexión WebSocket para finalizar la partida
    closeWebSocketConnection();
    // Redirigir al usuario a la página de menú
    window.location.href = "menu.html";
    return false;
}

// Añadir el listener para el botón de Comprobar Bingo
document.addEventListener('DOMContentLoaded', function () {
    // Obtener el botón que se usa para verificar el bingo
    const checkBingoButton = document.getElementById('bingo-button');

    // Añadir el evento de clic al botón para comprobar el bingo
    checkBingoButton.addEventListener('click', () => {
        // Llamar a la función checkBingo() y guardar el resultado
        const bingoResult = checkBingo();
        if (!bingoResult) {
            // Si no es bingo, mostrar un mensaje de que no ha hecho bingo aún
            alert("¡No hay Bingo, descalificado!.");
        }
    });
});

