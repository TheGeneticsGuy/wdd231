const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();

    displayProphets(data.prophets)
}

const displayProphets = (prophets) => {

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

getProphetData();