<template>
    <label :for="station" class="radiostation border">
        <img :src="station + '.png'" :name="station" />
        <input
            type="checkbox"
            class="biggerCheckBox"
            name="checkBoxStation"
            :id="station"
            @click="$parent.updateAllChannels"
            :checked="checked"
        />
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
    height: 4em;
    width: 4em;
    margin-bottom: 1em;
}

.biggerCheckBox {
    width: 1.25em;
    height: 1.25em;
}

@media screen and (min-width: 768px) {

    img {
        height: 8.75em;
        width: 8.75em;
    }

    .biggerCheckBox {
        width: 2.5em;
        height: 2.5em;
    }
}
</style>