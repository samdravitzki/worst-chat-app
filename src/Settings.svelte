<script>
    import { peers } from './user';
	let newPeer;
</script>

<div>
    <b>Peers</b>
    {#each peers as peer}
        <div>{peer}</div>
    {/each}
</div>