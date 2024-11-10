document.addEventListener('DOMContentLoaded', function () {
    const numberTable = document.getElementById('number-table').getElementsByTagName('tbody')[0];

    // Generar todos los números posibles para la tabla de bingo
    function generateNumberTable() {
        let allNumbers = [];
        // Llenar el array con los números del 1 al 75
        for (let i = 1; i <= 75; i++) {
            allNumbers.push(i);
        }

        // Dividir los números en 5 columnas de 15 números cada una
        let numbers = chunkArray(allNumbers, 15);

        // Crear filas en la tabla con los números generados
        for (let i = 0; i < 15; i++) {
            const row = numberTable.insertRow();  // Crear una nueva fila en la tabla
            for (let j = 0; j < 5; j++) {
                const cell = row.insertCell();  // Crear una nueva celda en la fila
                cell.innerHTML = numbers[j][i];  // Asignar el número a la celda
                cell.setAttribute("data-number", numbers[j][i]);  // Guardar el número como atributo para uso futuro
            }
        }
    }

    // Función para dividir un array en grupos de tamaño 'size'
    function chunkArray(array, size) {
        let result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));  // Crear un "trozo" del array original
        }
        return result;
    }

    // Inicialización de la tabla
    generateNumberTable();
});
