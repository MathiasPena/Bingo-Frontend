let stompClient = null;

function connectToGame() {
    const socket = new SockJS("http://localhost:8080/ws");

    socket.onopen = function() {
        console.log("WebSocket conectado");
    };
    
    socket.onerror = function(error) {
        console.error("Error en la conexión WebSocket", error);
    };
    
    socket.onclose = function() {
        console.log("Conexión WebSocket cerrada");
    };

    stompClient = Stomp.over(socket);

    stompClient.connect({}, function(frame) {
        console.log("Conectado: " + frame);

        // Suscribirse al canal de actualizaciones del juego
        stompClient.subscribe("/topic/gameUpdates", function(message) {
            const data = JSON.parse(message.body);
            console.log("Actualización del juego recibida:", data);
            // Aquí puedes manejar los datos de actualización del juego, por ejemplo, actualizar el tablero de bingo
        });
    });
}

// Enviar solicitud de unirse al juego
function joinGame(authToken) {
    stompClient.send("/app/joinGame", {}, authToken);
}

// Conexión inicial
document.addEventListener("DOMContentLoaded", connectToGame);
