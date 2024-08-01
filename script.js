const countries = [
    { name: 'London', zone: 'Europe/London' },
    { name: 'New York', zone: 'America/New_York' },
    { name: 'Tokyo', zone: 'Asia/Tokyo' },
    { name: 'Sydney', zone: 'Australia/Sydney' },
    { name: 'Paris', zone: 'Europe/Paris' },
    { name: 'Los Angeles', zone: 'America/Los_Angeles' },
    { name: 'Seoul', zone: 'Asia/Seoul' },
    { name: 'Kolkata', zone: 'Asia/Kolkata' },
    { name: 'Johannesburg', zone: 'Africa/Johannesburg' },
    { name: 'Berlin', zone: 'Europe/Berlin' },
    { name: 'Singapore', zone: 'Asia/Singapore' },
    { name: 'Chicago', zone: 'America/Chicago' },
    { name: 'Hong Kong', zone: 'Asia/Hong_Kong' },
    { name: 'Toronto', zone: 'America/Toronto' },
    { name: 'Vancouver', zone: 'America/Vancouver' }
];

function fetchTime(zone, timeElement, dateElement) {
    fetch(`https://worldtimeapi.org/api/timezone/${zone}`)
        .then(response => response.json())
        .then(data => {
            const dateTime = new Date(data.datetime);
            const timeString = dateTime.toLocaleTimeString();
            const dateString = dateTime.toLocaleDateString('en-GB', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            document.getElementById(timeElement).textContent = timeString;
            document.getElementById(dateElement).textContent = dateString;
        })
        .catch(error => console.error('Error fetching time:', error));
}

function searchCountries(cardNumber) {
    const searchInput = document.getElementById(`search${cardNumber}`);
    const resultsList = document.getElementById(`results${cardNumber}`);
    const filter = searchInput.value.toLowerCase();

    resultsList.innerHTML = '';

    if (filter.length > 0) {
        const filteredCountries = countries.filter(country =>
            country.name.toLowerCase().includes(filter)
        );

        if (filteredCountries.length > 0) {
            resultsList.style.display = 'block';
            filteredCountries.forEach(country => {
                const li = document.createElement('li');
                li.textContent = country.name;
                li.onclick = () => {
                    fetchTime(country.zone, `time${cardNumber}`, `date${cardNumber}`);
                    searchInput.value = country.name;
                    resultsList.style.display = 'none';
                };
                resultsList.appendChild(li);
            });
        } else {
            resultsList.style.display = 'none';
        }
    } else {
        resultsList.style.display = 'none';
    }
}

document.addEventListener('click', (event) => {
    const isClickInside = event.target.closest('.group');
    if (!isClickInside) {
        document.querySelectorAll('.results').forEach(results => {
            results.style.display = 'none';
        });
    }
});
