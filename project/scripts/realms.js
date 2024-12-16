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

// GET MY PRIVATE KEYS FROM MY PROXY SERVER WHERE I STORE THEM!
// Please note, since I was worried about publishing my keys publicly on Github pages, for the class, I decided to secure them privately
// So, I stored them in a python script to run on a free site, pythonanywhere.com - which I can send queries to to retrieve the private Client ID and .

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

async function useKeys() {
    const keys = await getKeys();
    if (keys) {
        const { client_id, client_secret } = keys;

        // Use keys to get OAuth token
        const url = 'https://us.battle.net/oauth/token';
        const auth = btoa(`${client_id}:${client_secret}`); // Encode for Basic Auth
        const tokenResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials'
        });

        const tokenData = await tokenResponse.json();
        console.log('OAuth Token:', tokenData.access_token);
    }
}

useKeys();