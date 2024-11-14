const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');
let newest = localStorage.getItem('sort_newest') || 'false';

async function getProphetData(newest_first) {
    const response = await fetch(url);
    const data = await response.json();

    if (newest_first == 'true') {
        displayProphets([...data.prophets].reverse());
    } else {
        displayProphets(data.prophets);
    }
}

const displayProphets = (prophets) => {

    resetProphetsGrid()
    prophets.forEach((prophet) => {

        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let dob = document.createElement('p');
        let place = document.createElement('p');
        let portrait = document.createElement('img');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`
        dob.textContent = `Date of Birth: ${prophet.birthdate}`
        place.textContent = `Place of Birth: ${prophet.birthplace}`

        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`)
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '270');
        portrait.setAttribute('height', '350');

        card.appendChild(fullName);
        card.appendChild(dob);
        card.appendChild(place);
        card.appendChild(portrait);

        // Now, pin the whole grid.
        cards.appendChild(card)
    });

}

function toggleSorting(sort_newest) {
    localStorage.setItem('sort_newest', sort_newest);
    newest = sort_newest;

    getProphetData(sort_newest);
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


getProphetData(newest);