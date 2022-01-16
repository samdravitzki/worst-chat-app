import GUN from 'gun';
import 'gun/sea';
// import 'gun/axe';
import { writable } from 'svelte/store';

export const peers = ['https://worst-gun-peer.herokuapp.com/gun'];

// Database
export const gun = GUN({
    peers: peers,
});

// Gun user
export const user = gun.user().recall({ sessionStorage: true });

// Current users username stored in svelte store
export const username = writable('');

// If user is already logged put their username into the store
user.get('alias').on(value => username.set(value));

// If the user signs up or logs in put their username in the store
gun.on('auth', async (event) => {
    const alias = await user.get('alias');
    username.set(alias);

    console.log(`signed in as ${alias}`);
});

// TODO:
// - Get a relay peer going - got one working on heroku, but doesnt store for a while
// - figure out how to deploy this app - deploying to vercel
// - add longer term storage to the heroku app
// - create a place to configure peers and use local as default for dev and heroku as default for prod