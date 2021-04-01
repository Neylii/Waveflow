<template>
    <div class="radiostation border">
        <label :for="station">
            <img :src="station + '.png'" :name="station" />
        </label>
        <input
            type="checkbox"
            class="biggerCheckBox"
            name="checkBoxStation"
            :id="station"
            @click="$parent.updateAllChannels"
            :checked="checked"
        />
    </div>
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
}

.biggerCheckBox {
    width: 1.25em;
    height: 1.25em;
}

@media screen and (min-width: 700px) {
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