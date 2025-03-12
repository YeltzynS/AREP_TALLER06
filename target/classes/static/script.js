const API_URL = "http://localhost:35000/api/properties"; // Ajusta el puerto si es necesario

// Cargar propiedades al iniciar
document.addEventListener("DOMContentLoaded", () => {
    loadProperties();

    // Delegación de eventos para manejar botones de editar y eliminar
    document.querySelector("#propertyTable tbody").addEventListener("click", (event) => {
        if (event.target.classList.contains("edit-btn")) {
            const id = event.target.getAttribute("data-id");
            editProperty(id);
        } else if (event.target.classList.contains("delete-btn")) {
            const id = event.target.getAttribute("data-id");
            deleteProperty(id);
        }
    });
});

// Función para cargar propiedades
async function loadProperties() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al cargar las propiedades");
        
        const properties = await response.json();
        const tbody = document.querySelector("#propertyTable tbody");
        tbody.innerHTML = "";

        if (properties.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="empty-message">No hay propiedades registradas.</td></tr>`;
        } else {
            properties.forEach(property => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${property.id}</td>
                    <td>${property.address}</td>
                    <td>${property.price}</td>
                    <td>${property.size}</td>
                    <td>${property.description}</td>
                    <td>${property.phone}</td>
                    <td>
                        <button class="edit-btn" data-id="${property.id}">Editar</button>
                        <button class="delete-btn" data-id="${property.id}">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Función para guardar (crear o actualizar) una propiedad
document.getElementById("propertyForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const id = document.getElementById("propertyId").value;
    const property = {
        address: document.getElementById("address").value,
        price: parseFloat(document.getElementById("price").value),
        size: parseFloat(document.getElementById("size").value),
        description: document.getElementById("description").value,
        phone: document.getElementById("phone").value
    };

    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
        const response = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(property)
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        alert(id ? "Propiedad actualizada correctamente." : "Propiedad creada correctamente.");
        document.getElementById("propertyForm").reset();
        document.getElementById("propertyId").value = "";
        loadProperties();
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo guardar la propiedad.");
    }
});



async function editProperty(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error("Error al cargar la propiedad");
        }

        const property = await response.json();

        // Llenar el formulario con los datos de la propiedad
        document.getElementById("propertyId").value = property.id;
        document.getElementById("address").value = property.address;
        document.getElementById("price").value = property.price;
        document.getElementById("size").value = property.size;
        document.getElementById("description").value = property.description;
        document.getElementById("phone").value = property.phone;

        // Enfocar en el campo de dirección para indicar edición
        document.getElementById("address").focus();
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo cargar la propiedad para editar.");
    }
}


// Función para eliminar una propiedad
// Función para eliminar una propiedad
async function deleteProperty(id) {
    if (!confirm("¿Seguro que deseas eliminar esta propiedad?")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

        if (!response.ok) {
            throw new Error(`Error al eliminar la propiedad: ${response.status}`);
        }

        alert("Propiedad eliminada correctamente.");
        loadProperties();
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo eliminar la propiedad.");
    }
}


