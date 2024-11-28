// Footer
document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;


// HAMBURGER BUTTON LOGIC
const icons = document.querySelectorAll('.icon-menu');
const nav = document.querySelector(".navigation");

icons.forEach(hamburger => {
    hamburger.addEventListener('click', (event) => {
        nav.classList.toggle("open");
        hamburger.classList.toggle("open");
    });
});


// GRID BUILDING
const file_name = 'data/members.json'
const cards = document.querySelector('#members-grid');
let current_filter = localStorage.getItem('sort_type') || '1';

async function getMemberData(filter) {
    const response = await fetch(file_name);
    const data = await response.json();
    let members = data.members

    if (filter === '1') {
        displayBusinessCards(members);
    } else if (filter === '2') {
        displayBusinessTable(members);
    }

}

// Build the grid
const displayBusinessCards = (members) => {

    resetMemberGrid();
    members.forEach((member) => {

        // BUILD THE CARDS
        let card = document.createElement('section');

        // Separate into 2 sections, top and bottom
        let top = document.createElement('div');
        let bottom = document.createElement('div');
        top.setAttribute('id', 'card-top');
        bottom.setAttribute('id', 'card-bottom');

        // All the filler elements
        let logo = document.createElement('img');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let url = document.createElement('a');

        logo.setAttribute('src', member.image);
        logo.setAttribute('alt', `Logo for ${member.name}`)
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', 'auto')
        logo.setAttribute('max-height', '150px');
        // Append logo to the top section
        top.appendChild(logo);

        address.textContent = member.address;
        phone.textContent = member.phone;
        url.textContent = member.website;
        url.setAttribute('href', member.website);
        url.setAttribute('target', "_blank");

        bottom.appendChild(address);
        bottom.appendChild(phone);
        bottom.appendChild(url);

        // Now, pin the whole grid.
        card.appendChild(top);
        card.appendChild(bottom);
        card.setAttribute('class', 'directory-section');

        cards.appendChild(card);
    });

}

const displayBusinessTable = (members) => {
    resetMemberGrid();

    // Create table
    const table = document.createElement('table');
    table.classList.add('business-table');

    // CNeed a header for the table
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // 4 columns - loop through to create from array
    ['Business Name', 'Address', 'Phone', 'Website'].forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');

    members.forEach((member) => {
        const row = document.createElement('tr');

        // Create cells for each piece of data
        const nameCell = document.createElement('td');
        const addressCell = document.createElement('td');
        const phoneCell = document.createElement('td');
        const webCell = document.createElement('td');

        nameCell.textContent = member.name;
        addressCell.textContent = member.address;
        phoneCell.textContent = member.phone;

        // Create link for website
        const websiteLink = document.createElement('a');
        websiteLink.href = member.website;
        websiteLink.textContent = member.website;
        webCell.appendChild(websiteLink);

        // Append cells to row
        row.appendChild(nameCell);
        row.appendChild(addressCell);
        row.appendChild(phoneCell);
        row.appendChild(webCell);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    cards.appendChild(table);
}

// Store the grid
const membersGrid = document.querySelector("#members-grid");

if (membersGrid) {
    // Reset the grid
    function resetMemberGrid() { membersGrid.innerHTML = "" };

    // Sorting Buttons
    const grid_button = document.querySelector("#grid-button");
    const table_button = document.querySelector("#table-button");

    grid_button.addEventListener("click", () => {
        toggleSorting('1');
    });

    table_button.addEventListener("click", () => {
        toggleSorting('2')
    });

    // Logic for the grid/table buttons
    function toggleSorting(type_ind) {
        localStorage.setItem('sort_type', type_ind);    // 1 == grid, 2 == table
        current_filter = type_ind;

        getMemberData(current_filter);
    }

    getMemberData(current_filter);

}



// WEATHER CONSTANTS
const temp = document.querySelector('#temp');

if (temp) {
    const feelsTemp = document.querySelector('#feels-temp');
    const weatherDesc = document.querySelector('#weather-description');
    const humidity = document.querySelector('#humidity');
    const windSpeed = document.querySelector('#wind-speed');
    const windDirection = document.querySelector('#wind-direction');
    const visibility = document.querySelector('#visibility');
    const nameDay2 = document.querySelector('#day2_placeholder');
    const nameDay3 = document.querySelector('#day3_placeholder');
    const highTempToday = document.querySelector('#high-temp');
    const lowTempToday = document.querySelector('#low-temp');
    const outlook1 = document.querySelector('#outlook1');
    const outlook2 = document.querySelector('#outlook2');
    const outlook3 = document.querySelector('#outlook3');
    const temp2 = document.querySelector('#temp2');
    const temp3 = document.querySelector('#temp3');

    // WEATHER CARD
    const API_access = '08ba610f5ded3429b31956615a68dcb4';
    const lat = '32.22';
    const lon = '-110.97'
    const lonLatUrl = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_access}`;
    const forecastUrl = `//api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=3&appid=${API_access}`

    async function weatherFetch() {
        try {
            const response = await fetch(lonLatUrl);
            if (response.ok) {
                const data = await response.json();
                displayWeather(data);
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

    // In case the API is done for one but not both, keep them separate.
    async function forecastFetch() {
        try {
            const response = await fetch(forecastUrl);
            if (response.ok) {
                const data = await response.json();
                displayForecast(data);
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

    const convertTemperature = (kelvin, unit = 'C') => {
        if (unit === 'C') {
            return kelvin - 273.15; // Kelvin to Celsius
        } else if (unit === 'F') {
            return (kelvin - 273.15) * 9 / 5 + 32; // Kelvin to Fahrenheit
        } else {
            return kelvin; // Return Kelvin as default.
        }
    };

    // For wind speed directions
    const directions = [
        "N", "N/NE", "NE", "E/NE", "E", "E/SE", "SE", "S/SE",
        "S", "S/SW", "SW", "W/SW", "W", "W/NW", "NW", "N/NW"
    ];

    function getWindDirection(degree) {
        const index = Math.round(degree / 22.5) % 16; // Wrap around if > 360°, since it all divides by 15, I need to be mod 16 to ensure it wraps correctly and is always within valid range.
        return directions[index];
    }

    // Method:          getDay(int)
    // What it Does:    Returns the localized string name of the day of week based on days away
    // Purpose:         For the weather card 3-day forceast.
    function getDay(numDaysAway) {
        const day = new Date();
        day.setDate(day.getDate() + numDaysAway);
        return day.toLocaleDateString(undefined, { weekday: 'long' });
    }

    // Method:          toTitleCase(string)
    // What it Does:    Capitalizes the letter of each string word
    // Purpose:         I am used to python's Title() method and I wanted something similar in JS
    function toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
    }



    const displayWeather = (data) => {
        temp.innerHTML = `${convertTemperature(data.main.temp, 'F').toFixed(0)} &deg;F`;
        feelsTemp.innerHTML = `${convertTemperature(data.main.feels_like, 'F').toFixed(0)} &deg;F`;
        weatherDesc.textContent = `${toTitleCase(data.weather[0].description)}`;
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = data.wind.speed;
        windDirection.textContent = getWindDirection(data.wind.deg);
        visibility.textContent = data.visibility;
        const iconSource = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        graphic.setAttribute('src', iconSource);
        graphic.setAttribute('alt', data.weather[0].description);
    }

    const displayForecast = (data) => {
        // 3-day forecast next
        nameDay2.textContent = getDay(1).toUpperCase();
        nameDay3.textContent = getDay(2).toUpperCase();
        highTempToday.innerHTML = `${convertTemperature(data.list[0].temp.max, 'F').toFixed(0)} &deg;F`;
        lowTempToday.innerHTML = `${convertTemperature(data.list[0].temp.min, 'F').toFixed(0)} &deg;F`;
        outlook1.textContent = toTitleCase(data.list[0].weather[0].description);
        outlook2.textContent = toTitleCase(data.list[1].weather[0].description);
        outlook3.textContent = toTitleCase(data.list[2].weather[0].description);
        temp2.innerHTML = `${convertTemperature(data.list[1].temp.max, 'F').toFixed(0)} &deg;F`;
        temp3.innerHTML = `${convertTemperature(data.list[2].temp.max, 'F').toFixed(0)} &deg;F`;
    }
    weatherFetch();
    forecastFetch();
}

// News Articles and Events
const fileName = 'data/articles.json'
const newsSection = document.querySelector('.news-section');

if (newsSection) {
    async function getArticleData() {
        const response = await fetch(fileName);
        const data = await response.json();
        displayArticles(data.articles);
    }

    function resetArticles() { newsSection.innerHTML = "" };

    // Build the grid
    const displayArticles = (articles) => {

        resetArticles();
        articles.forEach((article) => {

            // BUILD THE ARTICLES
            let line = document.createElement('a');
            line.href = article.html_link;
            line.target = "_blank";
            line.textContent = `${article.date} - ${article.title}`;

            let linkImage = document.createElement('img');
            linkImage.src = 'images/link-image.webp';
            linkImage.alt = 'Link icon'; // Add alt text for accessibility
            linkImage.style.width = '13px'; // Optional: set a small size
            linkImage.style.marginLeft = '5px'; // Optional: add some space between text and image

            // Append the image to the paragraph element line
            line.appendChild(linkImage);

            newsSection.appendChild(line);
        });

    }
    getArticleData();
}

// MEMBER PROMOTIONS!!!

const promoCards = document.querySelector('#spotlight');

if (promoCards) {
    function resetPromoGrid() { promoCards.innerHTML = "" };

    async function getPromoData() {
        const response = await fetch(file_name);
        const data = await response.json();
        displayPromoCards(data.members);
    }

    // Returns the kind of member the business is
    const getMemberLevel = (lvl) => {
        const levels = {
            1: "Gold Member",
            2: "Silver Member",
            3: "Bronze Member",
            4: "Trial Member"
        }

        return levels[lvl];
    }

    // Build the Member Promotion Cards
    const displayPromoCards = (members) => {

        resetPromoGrid();
        members.forEach((member) => {

            if (member.member_lvl < 3 && member.offer !== "") {
                // 1 = Gold, 2 = Silver

                // Build Card Bones
                let promoCard = document.createElement('section');

                // Build card features
                let promo = document.createElement('p');
                promo.setAttribute('class', "promo-title");

                let logo = document.createElement('img')
                logo.setAttribute('src', member.image);
                logo.setAttribute('alt', `Logo for ${member.name}`)
                logo.setAttribute('loading', 'lazy');
                logo.setAttribute('width', 'auto')
                logo.setAttribute('max-height', '150px');

                let address = document.createElement('p');
                let phone = document.createElement('p');
                let url = document.createElement('a');
                let memberType = document.createElement('p');

                promo.textContent = member.offer;
                address.textContent = member.address;
                phone.textContent = member.phone;
                url.textContent = member.website;
                url.setAttribute('href', member.website);
                url.setAttribute('target', "_blank");
                memberType.textContent = getMemberLevel(member.member_lvl);

                // Let's make it easy to tag for coloring
                if (member.member_lvl === 1) {
                    memberType.setAttribute('class', "gold");

                } else if (member.member_lvl === 2) {
                    memberType.setAttribute('class', "silver");

                }

                promoCard.appendChild(promo);
                promoCard.appendChild(logo);
                promoCard.appendChild(address);
                promoCard.appendChild(phone);
                promoCard.appendChild(url);
                promoCard.appendChild(memberType);

                // Now, let's pin it;
                promoCards.appendChild(promoCard);
            }
        });

    }
    getPromoData();
}
