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
