// Footer
document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;

const file_name = 'data/members.json'
const cards = document.querySelector('#members-grid');
let current_filter = 1;

async function getProphetData(newest_first, filter) {
    const response = await fetch(file_name);
    const data = await response.json();
    let memebrs = data.memebrs

    if (filter === 1) {
        displayBusinessCards(prophets);
    } else if (filter === 2) {
        displayBusinessTable(members);
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
            death.style.color = '#680055';
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