<template>
    <label :for="channelID">
        <div class="channel">
            <img :src="channel + '.png'" />
            <input type="radio" :value="channel" :id="channelID" v-model="$parent.inputChannel"/>
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
    border-radius: 10px;
    cursor: pointer;
}

img {
    height: 3em;
    width: 3em;
    /* margin-bottom: 1em; */
}

input[type="radio"] {
    margin-top: 1em;
    margin-left: 0;
    transform: scale(1.2);
    cursor: pointer;
}

@media screen and (min-width: 360px) {
    img {
        height: 4em;
        width: 4em;
        /* margin-bottom: 1em; */
    }
}

@media screen and (min-width: 500px) {
    img {
        height: 5.8em;
        width: 5.8em;
    }
}

@media screen and (min-width: 600px) {
    img {
        height: 8em;
        width: 8em;
        /* margin-bottom: 1.5em; */
    }
}

@media screen and (min-width: 1000px) {
    img {
        height: 10em;
        width: 10em;
    }

    input[type="radio"] {
        transform: scale(1.7);
    }
}
</style>
