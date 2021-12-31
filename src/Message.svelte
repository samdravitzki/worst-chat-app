<script>
    export let message;
    export let sender;

    const avatar = `https://avatars.dicebear.com/api/croodles-neutral/${message.who}.svg`;
</script>

<div class="message-body">
    <img class="avatar-img" src={avatar} alt="avatar"/>
    <div>
        <p>{message.what}</p>
        <time>{new Date(message.when).toLocaleTimeString()}</time>
        <span>from {message.who === sender ? "me" : message.who}</span>
    </div>
</div>

<style>
    .message-body {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .avatar-img {
        width: 50px;
        height: 50px;
        margin: 2px 5px;
    }
</style>