import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';
import { writable } from 'svelte/store';

// Database
export const gun = GUN();

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