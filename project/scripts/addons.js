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

// OK Core 3rd page addon data
const addons = [
    {
        name: "Guild Roster Manager",
        logo: "images/grm-logo.webp",
        description: "Manage your guild roster far and efficiently. Identify and connect mains and alts. Assist in promoting, demoting players, including a stored history of actions. A guild history log of events. Birthday and anniversary tracking. Powerful tools to assist in managing inactivity and removing players. Larger note. Syncable data between all GRM users within the guild.",
        curseforgeLink: "https://www.curseforge.com/wow/addons/guild-roster-manager",
        githubLink: "https://github.com/TheGeneticsGuy/Guild-Roster-Manager",
        publishedDate: "2017-06-11"
    },
    {
        name: "Mass Salvage Assist",
        logo: "images/msa-logo.webp",
        description: "Assists in Mass Salvaging and crafting in World of Warcraft by allowing you to mass salvage nonstop. For example, Mass milling, prospecting, thaumaturgy, etc. This effectively solves the long-standing stacking error bug.",
        curseforgeLink: "https://www.curseforge.com/wow/addons/mass-salvage-assist",
        githubLink: "https://github.com/TheGeneticsGuy/Mass_Salvage_Assist",
        publishedDate: "2024-10-29"
    },
    {
        name: "Custom Item Notes",
        logo: "images/cin-logo.webp",
        description: "Add custom notes to items in your inventory. Set an unlimited number of Notes to any item in-game. These notes will appear in your tooltip over the items.",
        curseforgeLink: "https://www.curseforge.com/wow/addons/custom-item-notes",
        githubLink: "https://github.com/TheGeneticsGuy/Custom_Item_Notes",
        publishedDate: "2023-01-18"
    }
];

// Populate the cards dynamically
function buildAddonCards() {
    const container = document.querySelector('.addon-container');
    addons.forEach(addon => {
        const card = document.createElement('div');
        card.className = 'addon-card';

        card.innerHTML = `
            <img src="${addon.logo}" alt="${addon.name} Logo">
            <h2>${addon.name}</h2>
            <p>${addon.description}</p>
            <a href="${addon.curseforgeLink}" target="_blank">Curseforge Page</a>
            <a href="${addon.githubLink}" target="_blank">GitHub Page</a>
        `;

        container.appendChild(card);
    });
}

// Execute the function to populate the cards
buildAddonCards();