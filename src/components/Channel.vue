<template>
    <label :for="channelID">
        <div class="channel">
            <img :src="channel + '.png'" />
            <input type="radio" :value="channel" :id="channelID" v-model="$parent.inputChannel" />
        </div>
    </label>
</template>

<script>
export default {
    props: {
        channel: String,
        channelID: String,
    },
}
</script>

<style scoped>
.channel {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    border-radius: 10px;
    padding: 1em;
    border: 4px solid #84c1cc;
}

img {
    height: 4em;
    width: 4em;
}

input[type="radio"] {
    padding: 5em;
    margin-top: 0;
    margin-left: 0;
    transform: scale(1.2);
}

@media screen and (min-width: 768px) {
    img {
        height: 8.75em;
        width: 8.75em;
    }

    input[type="radio"] {
        transform: scale(1.7);
    }
}
</style>
