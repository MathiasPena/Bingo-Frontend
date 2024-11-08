document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evitar el envío del formulario normal

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password }),
            mode: "cors"  // Habilita modo CORS explícitamente
        });

        if (response.ok) {
            // Login exitoso
            const data = await response.json();  // La respuesta es ahora un objeto JSON

            // Guarda token en el almacenamiento local
            localStorage.setItem("authToken", data.token);  // Guarda el token que se recibe

            // Redirigir a la página del menú del juego
            window.location.href = "menu.html";
        } else {
            // Login fallido
            document.getElementById("error-message").textContent = "Invalid username or password.";
        }
    } catch (error) {
        console.error("Error during login:", error);
        document.getElementById("error-message").textContent = "An error occurred. Please try again.";
    }
});
