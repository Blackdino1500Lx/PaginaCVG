// Inicializar Supabase
import { supabase } from "../Private/supabase.js";
    // Agregar reunión manualmente
    document.getElementById('form-reunion').addEventListener('submit', async function(e) {
        e.preventDefault();

        let fecha_rango = document.getElementById('fecha_rango').value;
        let tema = document.getElementById('tema').value;
        let canciones = document.getElementById('canciones').value.split(",").map(item => item.trim());

        const { error } = await supabase.from('reuniones').insert([{ fecha_rango, tema, canciones }]);

        if (error) console.error("Error guardando:", error);
        else {
            alert("Reunión guardada correctamente");
            mostrarReuniones();
        }
    });

    // Mostrar reuniones almacenadas
    async function mostrarReuniones() {
        let { data, error } = await supabase.from('reuniones').select('*');

        if (error) console.error("Error obteniendo reuniones:", error);
        else {
            const contenedor = document.getElementById('lista-reuniones');
            contenedor.innerHTML = "";

            data.forEach(reunion => {
                let div = document.createElement('div');
                div.innerHTML = `<h3>${reunion.fecha_rango} - ${reunion.tema}</h3><p>Canciones: ${reunion.canciones.join(", ")}</p>`;
                contenedor.appendChild(div);
            });
        }
    }

    // Cargar reuniones al inicio
    mostrarReuniones();
