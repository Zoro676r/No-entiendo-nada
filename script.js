document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'a6c70ff6ee453d0222a396af6c64552f'; 
    const ciudadInput = document.createElement('input');
    ciudadInput.type = 'text';
    ciudadInput.placeholder = 'Ingresa una ciudad';

    const buscarBtn = document.createElement('button');
    buscarBtn.textContent = 'Buscar';

    const widgetClima = document.getElementById('widget-clima');
    const resultadoClima = document.createElement('div');
    widgetClima.appendChild(ciudadInput);
    widgetClima.appendChild(buscarBtn);
    widgetClima.appendChild(resultadoClima);

    buscarBtn.addEventListener('click', () => {
        const ciudad = ciudadInput.value.trim();
        if (ciudad) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ciudad no encontrada');
                    }
                    return response.json();
                })
                .then(data => {
                    const { temp } = data.main;
                    const { description, icon } = data.weather[0];
                    resultadoClima.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${ciudad}</h5>
                                <img src="http://openweathermap.org/img/w/${icon}.png" alt="${description}">
                                <p class="card-text">Temperatura: ${temp}°C</p>
                                <p class="card-text">Descripción: ${description}</p>
                            </div>
                        </div>
                    `;
                })
                .catch(error => {
                    resultadoClima.innerHTML = '<p style="color:red;">No se pudo obtener la información del clima. Verifica el nombre de la ciudad y la clave de API.</p>';
                    console.error('Error en la solicitud:', error); // Muestra el error en la consola para depuración
                });
        } else {
            resultadoClima.innerHTML = '<p style="color:red;">Por favor, ingresa un nombre de ciudad válido.</p>';
        }
    });

    const requisitosCultivos = {
        mora: { luminosidad: "6-8 horas", precipitacion: "800-1200 mm", humedad: "60-70%", temperatura: "15-25°C" },
        lulo: { luminosidad: "8-10 horas", precipitacion: "1000-1500 mm", humedad: "70-80%", temperatura: "15-20°C" },
        frijol: { luminosidad: "6-8 horas", precipitacion: "500-800 mm", humedad: "50-60%", temperatura: "20-30°C" },
        cafe: { luminosidad: "5-7 horas", precipitacion: "1000-1500 mm", humedad: "70-80%", temperatura: "18-24°C" },
        maiz: { luminosidad: "10-12 horas", precipitacion: "600-800 mm", humedad: "55-75%", temperatura: "20-30°C" },
        arveja: { luminosidad: "6-8 horas", precipitacion: "500-600 mm", humedad: "50-70%", temperatura: "15-20°C" },
        yuca: { luminosidad: "8-10 horas", precipitacion: "1000-1200 mm", humedad: "60-70%", temperatura: "25-30°C" },
        auyama: { luminosidad: "6-8 horas", precipitacion: "800-1000 mm", humedad: "60-70%", temperatura: "20-25°C" },
        papa: { luminosidad: "8-10 horas", precipitacion: "600-800 mm", humedad: "70-80%", temperatura: "15-20°C" },
        cebolla: { luminosidad: "10-12 horas", precipitacion: "500-600 mm", humedad: "60-70%", temperatura: "15-20°C" },
        tomate: { luminosidad: "8-10 horas", precipitacion: "600-800 mm", humedad: "60-70%", temperatura: "20-25°C" },
        naranjas: { luminosidad: "8-10 horas", precipitacion: "600-800 mm", humedad: "50-60%", temperatura: "25-30°C" }
    };

    let chart;

    window.analizarCultivo = function () {
        const cultivo = document.getElementById("cultivo").value;
        const resultadosDiv = document.getElementById("resultados");

        if (!requisitosCultivos[cultivo]) {
            resultadosDiv.innerHTML = '<p style="color:red;">Cultivo no encontrado.</p>';
            return;
        }

        const requisitos = requisitosCultivos[cultivo];
        resultadosDiv.innerHTML = `
            <h3>Requisitos para cultivar ${cultivo.charAt(0).toUpperCase() + cultivo.slice(1)}:</h3>
            <ul>
                <li><strong>Luminosidad:</strong> ${requisitos.luminosidad}</li>
                <li><strong>Precipitación:</strong> ${requisitos.precipitacion}</li>
                <li><strong>Humedmedad:</strong> ${requisitos.humedad}</li>
<li><strong>Temperatura:</strong> ${requisitos.temperatura}</li>
</ul>
<p>¡Verifica si las condiciones de tu suelo son adecuadas!</p>
`;
mostrarGrafico(requisitos);
}
function mostrarGrafico(requisitos) {
    const canvas = document.getElementById('graficoCondiciones');
    const ctx = canvas.getContext('2d');

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Luminosidad', 'Precipitación', 'Humedad', 'Temperatura'],
            datasets: [{
                label: 'Requisitos del Cultivo',
                data: [
                    parseInt(requisitos.luminosidad.split('-')[0]),
                    parseInt(requisitos.precipitacion.split('-')[0]),
                    parseInt(requisitos.humedad.split('-')[0]),
                    parseInt(requisitos.temperatura.split('-')[0])
                ],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

window.monitorearCultivo = function () {
    document.getElementById("monitoreoResultados").innerHTML = "<p>Función de monitoreo en desarrollo.</p>";
}
