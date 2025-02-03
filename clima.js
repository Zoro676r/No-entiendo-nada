const apiEndpoint = 'https://api.openweathermap.org/data/2.5/';
const apiKey = 'a6c70ff6ee453d0222a396af6c64552f';

const ubicacionInput = document.getElementById('ubicacion');
const paisSelect = document.getElementById('pais');
const buscarClimaButton = document.getElementById('buscar-clima');
const climaActualDiv = document.getElementById('clima-actual');

buscarClimaButton.addEventListener('click', buscarClima);

function buscarClima() {
    const ubicacion = ubicacionInput.value.trim();
    if (!ubicacion) {
        climaActualDiv.innerHTML = '<p style="color:red;">Por favor, ingresa una ciudad válida.</p>';
        return;
    }

    // Mostrar mensaje de carga mientras se realiza la solicitud
    climaActualDiv.innerHTML = '<p>Cargando...</p>';

    const pais = paisSelect.value;
    const url = `${apiEndpoint}weather?q=${ubicacion},${pais}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => mostrarClimaActual(data))
        .catch(error => {
            climaActualDiv.innerHTML = '<p style="color:red;">No se pudo obtener la información del clima. Verifica la ciudad o el país.</p>';
            console.error(error);
        });
}

function mostrarClimaActual(data) {
    const temperatura = data.main.temp;
    const humedad = data.main.humidity;
    const condiciones = data.weather[0].description;
    const icono = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${icono}.png`;

    climaActualDiv.innerHTML = `
        <p>Temperatura: ${temperatura}°C</p>
        <p>Humedad: ${humedad}%</p>
        <p>Condiciones: ${condiciones}</p>
        <img src="${iconUrl}" alt="${condiciones}">
    `;
}
