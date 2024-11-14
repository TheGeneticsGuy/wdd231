const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');
let newest = localStorage.getItem('sort_newest') || 'false';
let current_filter = 1;

async function getProphetData(newest_first, filter) {
    const response = await fetch(url);
    const data = await response.json();
    let prophets = data.prophets

    // Filter the prophet data
    if (filter !== 1) {
        prophets = filterProphets(prophets, filter);
    }

    // Sort it recent or oldest first
    if (newest_first === 'true') {
        displayProphets([...prophets].reverse());
    } else {
        displayProphets(prophets);
    }
}

// Build the grid
const displayProphets = (prophets) => {

    resetProphetsGrid()
    prophets.forEach((prophet) => {

        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let dob = document.createElement('p');
        let place = document.createElement('p');
        let death = document.createElement('p');
        let portrait = document.createElement('img');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        dob.textContent = `Date of Birth: ${prophet.birthdate}`;
        place.textContent = `Place of Birth: ${prophet.birthplace}`;
        if (prophet.death) {
            death.textContent = `Died: ${prophet.death.split(' ')[2]}`;
        } else {
            death.textContent = 'Living Prophet';
            death.style.color = 'red';
        }

        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`)
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '270');
        portrait.setAttribute('height', '350');

        card.appendChild(fullName);
        card.appendChild(dob);
        card.appendChild(place);
        card.appendChild(death);
        card.appendChild(portrait);

        // Now, pin the whole grid.
        cards.appendChild(card)
    });

}

// Logic for the radio buttons
function toggleSorting(sort_newest) {
    localStorage.setItem('sort_newest', sort_newest);
    newest = sort_newest;

    getProphetData(sort_newest, current_filter);
}

// Store the grid
const prophetsGrid = document.querySelector("#cards");

// Reset the grid
function resetProphetsGrid() { prophetsGrid.innerHTML = "" };

// Sorting Radio Buttons
const earliest_radio = document.querySelector("#earliest");
const recent_radio = document.querySelector("#recent");

earliest_radio.addEventListener("click", () => {
    toggleSorting('false');
});

recent_radio.addEventListener("click", () => {
    toggleSorting('true')
});

// Filter Buttons
const all_prophets = document.querySelector("#all");
const died_19th = document.querySelector("#nineteenth");
const died_20th = document.querySelector("#twentieth");
const died_21st = document.querySelector("#twentyfirst");
const in_utah = document.querySelector("#utah");
const outside_us = document.querySelector("#outsideUS");
const server_15 = document.querySelector("#fifteenyears");
const older_90 = document.querySelector("#old");

all_prophets.addEventListener("click", () => {
    current_filter = 1;
    getProphetData(newest, current_filter);
});

died_19th.addEventListener("click", () => {
    current_filter = 2;
    getProphetData(newest, current_filter);
});

died_20th.addEventListener("click", () => {
    current_filter = 3;
    getProphetData(newest, current_filter);
});

died_21st.addEventListener("click", () => {
    current_filter = 4;
    getProphetData(newest, current_filter);
});

in_utah.addEventListener("click", () => {
    current_filter = 5;
    getProphetData(newest, current_filter);
});

outside_us.addEventListener("click", () => {
    current_filter = 6;
    getProphetData(newest, current_filter);
});

server_15.addEventListener("click", () => {
    current_filter = 7;
    getProphetData(newest, current_filter);
});

older_90.addEventListener("click", () => {
    current_filter = 8;
    getProphetData(newest, current_filter);
});

// Filtering logic
function filterProphets(prophets, filter) {

    if (filter === 2) {             // Died 19th century (1800s)
        return prophets.filter(prophet => prophet.death && parseInt(prophet.death.split(' ')[2]) < 1900);
    } else if (filter === 3) {      // Died 20th century (1900s)
        return prophets.filter(prophet => prophet.death && parseInt(prophet.death.split(' ')[2]) < 2000 && parseInt(prophet.death.split(' ')[2]) >= 1900);
    } else if (filter === 4) {      // Died 21st century (2000s)
        return prophets.filter(prophet => !prophet.death || parseInt(prophet.death.split(' ')[2]) < 2100 && parseInt(prophet.death.split(' ')[2]) >= 2000);
    }
    else if (filter === 5) {      // From utah
        return prophets.filter(prophet => prophet.birthplace.toLowerCase() === "utah");
    }
    else if (filter === 6) {      // From outside the US
        return prophets.filter(prophet => prophet.birthplace.toLowerCase() === "england");
    }
    else if (filter === 7) {      // Served 15+ years
        return prophets.filter(prophet => prophet.length >= 15);
    }
    else if (filter === 8) {      // Lived to be 90+ years old
        return prophets.filter(prophet => getDifferenceInYears(parseDate(prophet.birthdate), prophet.death) >= 90);
    }
    return prophets;
}

// The format from the JSON table is like this: "25 May 1885" and needs to be parsed
function parseDate(date) {
    // I need to convert this to an int formatted timestamp to get the time delta between 2 points easier
    const monthMap = {
        'january': 0, 'february': 1, 'march': 2, 'april': 3,
        'may': 4, 'june': 5, 'july': 6, 'august': 7,
        'september': 8, 'october': 9, 'november': 10, 'december': 11
    };

    let date_table = date.split(' ');
    const result = [parseInt(date_table[2]), monthMap[date_table[1].toLowerCase()], parseInt(date_table[0])]; // Formated [ year , month , day ]

    return result;
}

function getDifferenceInYears(dateOfBirth, dateOfDeath) {
    const birthDate = new Date(dateOfBirth[0], dateOfBirth[1], dateOfBirth[2])
    const deathDate = getDeathDate(dateOfDeath)
    const difference = deathDate - birthDate;       // In ms

    return Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
}

function getDeathDate(dateOfDeath) {
    if (dateOfDeath) {        // Will be null if no death date
        const death = parseDate(dateOfDeath);
        return new Date(death[0], death[1], death[2]);
    } else {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());  // The +1 is because the getMonth starts at 0
    }
}

/* <button type="submit" id="19th">Died in the 19th Century</button>
<button type="submit" id="20th">Died in the 20th Century</button>
<button type="submit" id="21st">Died in the 21st Century</button>
<button type="submit" id="utah">Born in Utah</button>
<button type="submit" id="outsideUS">Not Born in US</button>
<button type="submit" id="15years">Served for 15+ Years</button> */


getProphetData(newest, current_filter);