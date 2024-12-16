
// Footer
document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;

// Locales, reguions, and namespaces
const locales = ["en_US", "ko_KR", "fr_FR", "de_DE", "zh_CN", "es_ES", "zh_TW", "es_MX", "ru_RU", "pt_BR", "it_IT"];
const regions = ["us", "eu", "kr", "tw"];
const namespaces = ["dynamic", "dynamic-classic", "dynamic-classic1x"]; // Normal , Progression Classic , Classic (SOD, HD, Era)

let currentLocale = locales[0];
let currentRegion = regions[0];
let currentNamespace = namespaces[0];

// HAMBURGER BUTTON LOGIC
const icons = document.querySelectorAll('.icon-menu');
const nav = document.querySelector(".navigation");

icons.forEach(hamburger => {
    hamburger.addEventListener('click', (event) => {
        nav.classList.toggle("open");
        hamburger.classList.toggle("open");
    });
});

// Get the keys from the ENV
async function getKeys() {
    try {
        // Use the predefined ENV values
        return {
            client_id: ENV.CLIENT_ID,
            client_secret: ENV.CLIENT_SECRET
        };
    } catch (error) {
        console.error('Error getting keys:', error);
    }
}

// Get the Authorization token and only query the JSON once you have it.
async function getAccessToken() {
    const keys = await getKeys();

    if (keys) {
        const { client_id, client_secret } = keys;

        // Use keys to get OAuth token
        const url = 'https://us.battle.net/oauth/token';
        const auth = btoa(`${client_id}:${client_secret}`);

        try {
            const tokenResponse = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'grant_type=client_credentials'
            });

            if (tokenResponse.ok) {
                const data = await tokenResponse.json();
                return data.access_token;

            } else {
                throw Error(await tokenResponse.text());
            }

        } catch (error) {
            console.log(error);
        }
    }
}

// Get the realms based on the filtered parameters...
async function getRealms(token) {

    // Manually constructing URL with query parameters as per Blizz documentation.
    const url = new URL(`https://${currentRegion}.api.blizzard.com/data/wow/search/connected-realm `);
    // const url = new URL(`https://${currentRegion}.api.blizzard.com/data/wow/realm/index`);
    url.searchParams.append('namespace', `${currentNamespace}-${currentRegion}`);
    url.searchParams.append('locale', currentLocale);

    try {
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        // To get full details, from the server, need more info need to fetch each connected realm
        const realmData = await response.json();

        // Now, let's build a table to sort the data
        const realmDetails = realmData.results.map(realm => ({
            name: realm.data.realms[0].name[currentLocale],
            status: realm.data.status.type,                                 // need non-localized type for coloring Red or Green
            statusLocalized: realm.data.status.name[currentLocale],
            popLocalized: realm.data.population.name[currentLocale]        // Don't actually need non-localized for population since no special coloring

            // EXTRA COLUMNS I COULD ADD - BUT WILL PROBABLY NOT FOR NOW
            // typeLocalized: realm.data.realms[0].type.name[currentLocale],    // Also don't need non-localized for type
            // categoryLocalized: realm.data.realms[0].category[currentLocale]    // Also don't need non-localized for type

        }));

        // Sort realms alphabetically by name
        let sortedRealms = realmDetails.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        // // Create a formatted table for console output
        // console.table(sortedRealms);
        return sortedRealms;

    } catch (error) {
        console.error('Error fetching realms:', error);
    }
}


const realmGrid = document.querySelector('#lower_main_grid');

// Main function to build the grid
function buildRealms(sortedRealms) {
    realmGrid.innerHTML = '';       // Reset the table

}

// Core load function
async function displayRealms() {
    const token = await getAccessToken(); // Your existing token retrieval method
    const sortedRealms = await getRealms(token);

    // // Optional: If you want to display in HTML
    buildRealms(sortedRealms);
}

displayRealms();