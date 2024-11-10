let stompClient = null;
let authToken = null;

// Función para conectar al servidor WebSocket
function connectToGame() {
    console.log("Intentando conectar con el WebSocket...");

    // Establecer conexión WebSocket usando SockJS
    const socket = new SockJS("http://localhost:8080/ws"); // URL del servidor WebSocket
    stompClient = Stomp.over(socket); // Usar STOMP sobre SockJS para manejar mensajes WebSocket

    // Intentar establecer la conexión con el servidor WebSocket
    stompClient.connect({}, function (frame) {
        console.log('Conectado al servidor WebSocket: ' + frame);

        // Suscribirse a los canales para recibir actualizaciones de juego
        stompClient.subscribe('/topic/gameUpdates', function (messageOutput) {
            console.log("Actualización de juego recibida: ", messageOutput);
            const game = JSON.parse(messageOutput.body); // Parsear la respuesta para obtener los datos del juego
            updateGameStatus(game); // Llamar a la función para actualizar el estado del juego
        });

        stompClient.subscribe('/topic/numbers', function (numberOutput) {
            console.log("Número sorteado recibido: ", numberOutput);
            const number = parseInt(numberOutput.body); // Convertir el número sorteado a entero
            updateDrawnNumber(number); // Llamar a la función para mostrar el número sorteado
        });

        stompClient.subscribe('/topic/gameStatus', function (statusOutput) {
            console.log("Estado de conexión recibido: ", statusOutput.body);
            document.getElementById('gameStatus').innerText = statusOutput.body; // Mostrar el estado del juego
        });

        console.log("Conexión WebSocket establecida. Unirse al juego...");
        joinGame(); // Unirse al juego después de conectar
    }, function (error) {
        console.error("Error de conexión WebSocket:", error); // Manejo de errores si la conexión falla
        alert("No se pudo conectar al servidor. Intenta nuevamente más tarde.");
    });
}

// Función para unirse al juego
function joinGame() {
    console.log("Intentando unirse al juego...");

    // Verificar si WebSocket está conectado antes de enviar la solicitud
    if (stompClient?.connected) {
        authToken = localStorage.getItem("authToken"); // Obtener el token de autenticación del almacenamiento local
        console.log("Token de autenticación obtenido: ", authToken);

        // Si el token de autenticación está presente, enviarlo al servidor
        if (authToken) {
            stompClient.send("/app/joinGame", {}, authToken); // Enviar token para unirse al juego
            console.log("Enviando token al servidor para unirse al juego...");
        } else {
            console.log("Token de autenticación no encontrado");
        }
    } else {
        console.log("La conexión WebSocket aún no está lista."); // Si WebSocket no está listo, se avisa
    }
}

// Función para actualizar el estado del juego cuando se recibe información del servidor
function updateGameStatus(game) {
    console.log("Actualizando estado del juego con los datos: ", game);
    authToken = game.authToken; // Actualizar el token de autenticación con el proporcionado por el servidor

    // Si el servidor devuelve un cartón de bingo, procesarlo
    if (game.playerCards && Array.isArray(game.playerCards) && game.playerCards.length > 0) {
        const playerCard = JSON.parse(game.playerCards[0]); // Parsear el cartón de bingo del jugador
        console.log("Generando cartón de bingo: ", playerCard);
        generateBingoCard(playerCard); // Generar el cartón de bingo para el jugador
    } else {
        console.log("Esperando que el cartón sea generado...");
        document.getElementById('gameStatus').innerText = "Esperando que el cartón sea generado..."; // Mostrar mensaje mientras se genera el cartón
    }
}

// Array global para almacenar los números sorteados
const drawnNumbers = [];

// Función para actualizar el número sorteado en la interfaz
function updateDrawnNumber(number) {
    document.getElementById("number-display").innerText = number; // Mostrar el número sorteado en la interfaz

    // Añadir el número sorteado al array si no existe ya en la lista
    if (!drawnNumbers.includes(number)) {
        drawnNumbers.push(number); // Almacenar el número sorteado
    }

    console.log("Números sorteados hasta ahora: ", drawnNumbers);

    // Marcar el número sorteado en el cartón de bingo
    const cells = document.querySelectorAll("#number-table td"); // Obtener todas las celdas de la tabla de números
    cells.forEach(cell => {
        if (parseInt(cell.innerText) === number) {
            cell.style.backgroundColor = "#ffcccc"; // Cambiar color de fondo para marcar el número en el cartón
        }
    });
}

// Función para cerrar la conexión WebSocket cuando el jugador salga o cierre la página
function closeWebSocketConnection() {
    if (stompClient?.connected) {
        stompClient.disconnect(function () {
            console.log("Conexión WebSocket cerrada correctamente."); // Confirmar que la conexión se ha cerrado
        });

       
    }
}
