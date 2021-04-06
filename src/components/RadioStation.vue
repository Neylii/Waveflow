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
    height: 3em;
    width: 3em;
    margin-bottom: 1em;
}

.biggerCheckBox {
    width: 1em;
    height: 1em;
}

@media screen and (min-width: 360px) {
    img {
    height: 4em;
    width: 4em;
    margin-bottom: 1em;
}

.biggerCheckBox {
    width: 1.25em;
    height: 1.25em;
}
}

@media screen and (min-width: 500px) {
    img {
        height: 5.8em;
        width: 5.8em;
    }

    .biggerCheckBox {
        width: 1.75em;
        height: 1.75em;
    }

}

@media screen and (min-width: 600px) {
    img {
        height: 8em;
        width: 8em;
    }

    .biggerCheckBox {
        width: 2em;
        height: 2em;
    }
}

@media screen and (min-width: 1000px) {
    img {
        height: 10em;
        width: 10em;
    }

    .biggerCheckBox {
        width: 2.7em;
        height: 2.7em;
    }
}
</style>