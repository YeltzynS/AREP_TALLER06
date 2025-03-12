const url = 'hareptaller6apache.duckdns.org:5000';
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
        });

        if (response.ok) {
            // Redirigir al usuario a la página principal después del inicio de sesión exitoso
            window.location.href = "http://localhost:5000/index.html";
        } else {
            // Mostrar mensaje de error si las credenciales son incorrectas
            document.getElementById("errorMessage").style.display = "block";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("errorMessage").style.display = "block";
    }
});