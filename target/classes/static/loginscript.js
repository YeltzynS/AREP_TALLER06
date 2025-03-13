document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Cambia a JSON
            },
            body: JSON.stringify({ // Envía los datos como JSON
                username: username,
                password: password
            })
        });

        if (response.ok) {
            // Redirigir al usuario a la página principal después del inicio de sesión exitoso
            window.location.href = "/index.html";
        } else {
            // Mostrar mensaje de error si las credenciales son incorrectas
            document.getElementById("errorMessage").style.display = "block";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("errorMessage").style.display = "block";
    }
});