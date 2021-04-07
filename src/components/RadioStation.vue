<template>
    <label :for="station" class="radiostation">
        <img :src="station + '.png'" :name="station" />
        <input
            type="checkbox"
            :id="station"
            @click="$parent.updateAllChannels"
            :checked="checked"
        />
        <span class="checkMark"></span>
    </label>
</template>

<script>
export default {
    props: {
        station: String,
        checked: Boolean,
    },
}
</script>

<style scoped>
.radiostation {
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
    height: 3em;
    width: 3em;
    margin-bottom: 1em;
}

input[type="checkbox"] {
    transform: scale(1.2);
    margin-bottom: 0em;
}

@media screen and (min-width: 360px) {
    img {
        height: 4em;
        width: 4em;
        margin-bottom: 1em;
    }

    input[type="checkbox"] {
        transform: scale(1.4);
        margin-bottom: 0em;
    }
}

@media screen and (min-width: 500px) {
    img {
        height: 5.8em;
        width: 5.8em;
    }

    input[type="checkbox"] {
        transform: scale(1.7);
        margin-bottom: 0em;
    }
}

@media screen and (min-width: 600px) {
    img {
        height: 8em;
        width: 8em;
        margin-bottom: 1.5em;
    }

    input[type="checkbox"] {
        transform: scale(2.1);
        margin-bottom: 0.5em;
    }
}

@media screen and (min-width: 1000px) {
    img {
        height: 10em;
        width: 10em;
    }

    input[type="checkbox"] {
        transform: scale(2.5);
    }
}
</style>