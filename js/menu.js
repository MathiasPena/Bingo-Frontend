// Verifica si el usuario tiene un token en localStorage
const token = localStorage.getItem("authToken");

if (!token) {
    // Si no hay token, redirige a la página de login
    window.location.href = "index.html";
}

//botón de inicio del juego
document.getElementById("startGame").addEventListener("click", async function() {
    try {
        const response = await fetch("http://localhost:8080/game/join", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            }
        });

        if (response.ok) {
            const partida = await response.json();
            console.log("Unido a la partida:", partida);
            alert("Te has unido a la partida correctamente.");
            window.location.href = "game.html";  // Redirige a la página del juego
        } else {
            alert("Error al unirse a la partida. Intenta nuevamente.");
        }
    } catch (error) {
        console.error("Error al intentar unirse a la partida:", error);
        alert("Hubo un problema al intentar unirse a la partida.");
    }
});