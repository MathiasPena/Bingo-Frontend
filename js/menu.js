// Verifica si el usuario tiene un token en localStorage
const token = localStorage.getItem("authToken");

if (!token) {
    // Si no hay token, redirige a la página de login
    window.location.href = "index.html";
}

//botón de inicio del juego
document.getElementById("startGame").addEventListener("click", function() {
    alert("Game starting...");

    // Lógica para iniciar el juego
});