let markedNumbers = [];  // Array para almacenar los números marcados

document.addEventListener('DOMContentLoaded', function () {
    const bingoCardContainer = document.getElementById('bingo-card');

    bingoCardContainer.addEventListener('click', (e) => {
        const clickedCell = e.target;

        // Verificar si el elemento clickeado es una celda de bingo y no es el espacio libre
        if (clickedCell.classList.contains('bingo-cell') && !clickedCell.classList.contains('free-space')) {
            const number = clickedCell.textContent;

            // Si la celda ya está marcada, desmarcarla
            if (clickedCell.classList.contains('marked')) {
                clickedCell.classList.remove('marked');
                markedNumbers = markedNumbers.filter(num => num !== number);  // Eliminar el número del array
            } else {
                clickedCell.classList.add('marked');
                markedNumbers.push(number);  // Añadir el número al array
            }

            console.log("Números marcados: ", markedNumbers);  // Mostrar los números marcados en la consola
        }
    });
});
