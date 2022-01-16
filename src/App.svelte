<script>
	import GUN from 'gun';
	import { onMount } from 'svelte';
	import Login from './Login.svelte';
	import Message from './Message.svelte';
	import Settings from './Settings.svelte';
	import { gun, username, user } from './user.js';

	let newMessage;
	let messages = [];

	let settingsVisible = false;
	
	onMount(() => {
		gun.get('chat')
			.map()
			.once(async (data, id) => {
				var message = {
					who: await gun.user(data).get('alias'),
					what: data.what,
					when: GUN.state.is(data, 'what'),
				}

				if (message.what) {
					messages = [...messages.slice(0, 100), message].sort((a, b) => b.when - a.when);
				}
			})
	})

	async function sendMessage() {
		// associate the message to the current user
		const message = user.get('all').set({ what: newMessage })
		
		// use a date as the messages index for sorting
		const index = new Date().toISOString();

		// Create a new node in the chat collection using
		// the index as the key and the message associated with the user as the value
		gun.get('chat').get(index).put(message);

		newMessage = '';
	}

	function logout() {
		user.leave();
		username.set('');
	}

	function toggleSettings() {
		settingsVisible = !settingsVisible;
	}

</script>

<main>
	<div>
		{#if $username}
			<div>
				<span>Hello <strong>{$username}</strong></span>
				<button on:click={logout}>Log Out</button>
			</div>

			<div>
				<form on:submit|preventDefault={sendMessage}>
					<input 
						type="text"
						placeholder="Type a Message..."
						bind:value={newMessage}
						maxlength="140"
					/>
					<button type="submit" disabled={!newMessage}>Send</button>
				</form>
			</div>

			<div>
				{#each messages as message (message.when)}
					<Message message={message} sender={$username} />
				{/each}
			</div>
		{:else}
			<Login />
			<button on:click={toggleSettings}>Settings</button>
			{#if settingsVisible}
				<Settings />
			{/if}
		{/if}
	</div>
</main>
