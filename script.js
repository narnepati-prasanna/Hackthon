document.addEventListener('DOMContentLoaded', () => {
    showPage('affected');
    populateCountryDropdowns();
    fetchAffectedData();
    fetchVaccinatedData();
    fetchNeighborData();
});

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}

async function populateCountryDropdowns() {
    const response = await fetch('https://disease.sh/v3/covid-19/countries');
    const countries = await response.json();

    const affectedDropdown = document.getElementById('affectedCountryDropdown');
    const vaccinatedDropdown = document.getElementById('vaccinatedCountryDropdown');

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.countryInfo.iso2;
        option.textContent = country.country;
        affectedDropdown.appendChild(option);
        vaccinatedDropdown.appendChild(option.cloneNode(true));
    });
}

async function fetchAffectedData() {
    const country = document.getElementById('affectedCountryDropdown').value;
    const response = await fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=30`);
    const data = await response.json();

    const dates = Object.keys(data.timeline.cases);
    const cases = Object.values(data.timeline.cases);
    const deaths = Object.values(data.timeline.deaths);
    const recoveries = Object.values(data.timeline.recovered);

    const ctx = document.getElementById('affectedChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Cases',
                    data: cases,
                    borderColor: 'blue',
                    fill: false,
                },
                {
                    label: 'Deaths',
                    data: deaths,
                    borderColor: 'red',
                    fill: false,
                },
                {
                    label: 'Recoveries',
                    data: recoveries,
                    borderColor: 'green',
                    fill: false,
                }
            ]
        }
    });
}

async function fetchVaccinatedData() {
    const country = document.getElementById('vaccinatedCountryDropdown').value;
    const response = await fetch(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/${country}?lastdays=30`);
    const data = await response.json();

    const dates = Object.keys(data.timeline);
    const vaccinations = Object.values(data.timeline);

    const ctx = document.getElementById('vaccinatedChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Vaccinations',
                    data: vaccinations,
                    borderColor: 'purple',
                    fill: false,
                }
            ]
        }
    });
}

async function fetchNeighborData() {
    const neighbors = ['India', 'Sri Lanka', 'Bangladesh', 'China', 'Nepal'];
    const tbody = document.querySelector('#neighborsTable tbody');
    tbody.innerHTML = '';

    for (const country of neighbors) {
        const response = await fetch(`https://disease.sh/v3/covid-19/countries/${country}`);
        const data = await response.json();

        const row = tbody.insertRow();
        row.insertCell(0).textContent = data.country;
        row.insertCell(1).textContent = data.cases.toLocaleString();
        row.insertCell(2).textContent = data.deaths.toLocaleString();
        row.insertCell(3).textContent = data.recovered.toLocaleString();
        row.insertCell(4).textContent = data.population;  // Assuming this field is available
    }
}



               