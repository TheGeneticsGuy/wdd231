
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


// Core logic
const regions = ["us", "eu", "kr", "tw"];
const namespace = ["dynamic", "dynamic-classic"];
const imgSRC = {
    'us': 'images/US.webp',
    'eu': 'images/EU.webp',
    'kr': 'images/KR.webp',
    'tw': 'images/TW.webp',
}

// Core load function
async function displayTokenPrices() {
    const token = await window.getAccessToken(); // Your existing token retrieval method
    const tokenPrices = await getTokenPrices(token);

    buildTokenCards(tokenPrices);
}

// Query the data
async function getTokenPrices(token) {

    let tokenPrices = {};
    let url = "";
    let tokenData = null;

    for (i = 0; i < regions.length; i++) {
        for (j = 0; j < namespace.length; j++) {

            // Sort by names - add it's own table
            if (!tokenPrices[namespace[j]]) {
                tokenPrices[namespace[j]] = {};
            }

            // Set token by region too
            if (!tokenPrices[namespace[j]][regions[i]]) {
                tokenPrices[namespace[j]][regions[i]] = {};
            }

            // Manually constructing URL with query parameters as per Blizz documentation.
            url = new URL(`https://${regions[i]}.api.blizzard.com/data/wow/token/index`);
            // const url = new URL(`https://${currentRegion}.api.blizzard.com/data/wow/realm/index`);
            url.searchParams.append('namespace', `${namespace[j]}-${regions[i]}`);
            url.searchParams.append('locale', "en_US");

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
                tokenData = await response.json();

                // Add the data
                const newTokenPrice = {
                    "price": tokenData.price,
                    "updated": tokenData.last_updated_timestamp
                }

                Object.assign(tokenPrices[namespace[j]][regions[i]], newTokenPrice);

            } catch (error) {
                console.error('Error fetching realms:', error);
            }
        }
    }

    return tokenPrices;
}

// Building the token cards!!!
function buildTokenCards(tokenPrices) {
    const grids = ['#token-grid-retail', '#token-grid-classic'];

    grids.forEach((gridSelector, gridIndex) => {
        const cardGrid = document.querySelector(gridSelector);

        regions.forEach((region, regionIndex) => {
            let card = document.createElement('section');
            card.classList.add('token-price-section');
            card.style.animationDelay = `${(regionIndex + gridIndex * 0.1)}s`; // Stagger animation

            // Top section
            let top = document.createElement('div');
            top.id = 'card-top';
            let regionImage = document.createElement('img');
            regionImage.src = imgSRC[region];
            regionImage.alt = `Flag for ${region}`;
            regionImage.style.height = '32px';
            let regionText = document.createElement('p');
            regionText.textContent = region.toUpperCase();
            top.appendChild(regionImage);
            top.appendChild(regionText);

            // Middle section
            let middle = document.createElement('div');
            middle.id = 'card-mid';
            let goldText = document.createElement('p');
            goldText.textContent = (tokenPrices[namespace[gridIndex]][region].price / 10000).toLocaleString();
            let goldImage = document.createElement('img');
            goldImage.src = 'images/coin.webp';
            goldImage.alt = 'Gold Coin graphic';
            goldImage.style.width = '16px';
            goldImage.style.marginLeft = '5px';
            middle.appendChild(goldText);
            middle.appendChild(goldImage);

            // Bottom section
            let bottom = document.createElement('div');
            bottom.id = 'card-bottom';
            let timestamp = document.createElement('p');
            timestamp.textContent = timeSince(tokenPrices[namespace[gridIndex]][region].updated);
            bottom.appendChild(timestamp);

            // Combine sections
            card.appendChild(top);
            card.appendChild(middle);
            card.appendChild(bottom);

            // Append to grid
            cardGrid.appendChild(card);
        });
    });
}

// Do this for a nice message at end of wow token price card
function timeSince(timestamp) {
    const now = Date.now(); // Current time in milliseconds
    const elapsed = now - timestamp;

    // Convert elapsed time into seconds, minutes, hours - no need for days since the server updates hourly.
    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        return `Last Updated: ${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    } else if (minutes < 60) {
        return `Last Updated: ${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else {
        return `Last Updated: ${hours} hour${hours !== 1 ? "s" : ""} ago`;
    }
}

document.addEventListener("DOMContentLoaded", displayTokenPrices);
