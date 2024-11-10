document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evitar el envío del formulario

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password }),
            mode: "cors"  // Habilitar CORS explícitamente
        });

        if (response.ok) {
            const data = await response.json();  // Respuesta JSON

            localStorage.setItem("authToken", data.token);  // Guardar token

            window.location.href = "menu.html";  // Redirigir a la página del juego
        } else {
            document.getElementById("error-message").textContent = "Invalid username or password.";
        }
    } catch (error) {
        console.error("Error during login:", error);
        document.getElementById("error-message").textContent = "An error occurred. Please try again.";
    }
});
