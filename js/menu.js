// Verifica si el usuario tiene un token en localStorage
const token = localStorage.getItem("authToken");

// Si no existe el token, redirige al usuario a la página de login
if (!token) {
    window.location.href = "index.html";  // Redirigir al login si no hay token
}

// Botón para iniciar el juego
document.getElementById("startGame").addEventListener("click", async function () {
    try {
        // Realiza la solicitud para unirse a una partida usando el token de autorización
        const response = await fetch("http://localhost:8080/game/join", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`  // Se pasa el token en la cabecera Authorization
            }
        });

        if (response.ok) {
            // Si la respuesta es exitosa, procesa los datos de la partida
            const partida = await response.json();
            console.log("Unido a la partida:", partida);
            alert("Te has unido a la partida correctamente.");
            window.location.href = "game.html";  // Redirige al juego
        } else {
            // Si la respuesta no es exitosa, muestra un mensaje de error
            alert("Error al unirse a la partida. Intenta nuevamente.");
        }
    } catch (error) {
        // Captura cualquier error durante la solicitud y muestra un mensaje de error
        console.error("Error al intentar unirse a la partida:", error);
        alert("Hubo un problema al intentar unirse a la partida.");
    }
});
