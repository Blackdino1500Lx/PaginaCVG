import { supabase } from "../Private/supabase.js"; 
// 🔹 Función para obtener y mostrar reuniones entre semana
async function mostrarReunionesEntreSemana() {
    try {
        let { data, error } = await supabase.from("reuniones_entre_semana").select("*");

        if (error) {
            console.error("Error obteniendo reuniones entre semana:", error);
            document.getElementById("lista-reuniones-semana").innerHTML = "<p>Error al cargar reuniones.</p>";
            return;
        }

        const contenedor = document.getElementById("lista-reuniones-semana");
        contenedor.innerHTML = "<h2>Reuniones Entre Semana</h2>";

        if (data.length === 0) {
            contenedor.innerHTML += "<p>No hay reuniones programadas aún.</p>";
            return;
        }

        data.forEach(reunion => {
            let div = document.createElement("div");
            div.innerHTML = `
                <h3>${reunion.fecha_rango} - ${reunion.tema}</h3>
                <p><strong>Canciones:</strong></p>
                <ul>
                    ${reunion.canciones.map(cancion => `<li>${cancion}</li>`).join("")}
                </ul>
            `;
            contenedor.appendChild(div);
        });
    } catch (err) {
        console.error("Error inesperado:", err);
    }
}

// 🔹 Función para obtener y mostrar reuniones de fin de semana
async function mostrarReunionesFinDeSemana() {
    try {
        let { data, error } = await supabase.from("reuniones_finde").select("*");

        if (error) {
            console.error("Error obteniendo reuniones de fin de semana:", error);
            document.getElementById("lista-reuniones-finde").innerHTML = "<p>Error al cargar reuniones.</p>";
            return;
        }

        const contenedor = document.getElementById("lista-reuniones-finde");
        contenedor.innerHTML = "<h2>Reuniones de Fin de Semana</h2>";

        if (data.length === 0) {
            contenedor.innerHTML += "<p>No hay reuniones programadas aún.</p>";
            return;
        }

        data.forEach(reunion => {
            let div = document.createElement("div");
            div.innerHTML = `
                <h3>${reunion.fecha_rango} - ${reunion.tema}</h3>
                <p><strong>Canciones:</strong></p>
                <ul>
                    ${reunion.canciones.map(cancion => `<li>${cancion}</li>`).join("")}
                </ul>
            `;
            contenedor.appendChild(div);
        });
    } catch (err) {
        console.error("Error inesperado:", err);
    }
}

// Ejecutar las funciones al cargar la página
mostrarReunionesEntreSemana();
mostrarReunionesFinDeSemana();