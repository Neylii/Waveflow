<template>
    <div class="channelcontainer">
        <div>
            <label :for="channelID">
                <img :src="channel + '.png'" />
            </label>
            <input type="radio" :value="channel" :id="channelID" v-model="$parent.inputChannel" />
        </div>
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
    border-radius: 10px;
}
img {
    height: 4em;
    width: 4em;
}

@media screen and (min-width: 700px) {
    img {
        height: 8.75em;
        width: 8.75em;
    }
}
</style>
