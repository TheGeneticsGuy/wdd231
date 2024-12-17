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

window.getAccessToken = getAccessToken; // Exposing Globally for other JS files