<template>
    <div class="channelcontainer">
        <label :for="channelID">
            <img :src="channel + '.png'" />
        </label>
        <input type="radio" :value="channel" :id="channelID" v-model="$parent.inputChannel" />
    </div>
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
.channelcontainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    border-radius: 10px;
    padding: 1em;
    border: 4px solid #84c1cc;
    box-sizing: border-box;
}
img {
    height: 4em;
    width: 4em;
}

input[type="radio"] {
    width: 1.25em;
    height: 1.25em;
    padding: 5em;
    margin-top: 0;
    margin-left: 0;
}

@media screen and (min-width: 700px) {
    img {
        height: 8.75em;
        width: 8.75em;
    }

    input[type="radio"] {
        width: 2.5em;
        height: 2.5em;
    }
}
</style>
