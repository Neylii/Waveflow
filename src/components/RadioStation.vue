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
}
img {
    height: 100px;
    width: 100px;
}

.biggerCheckBox {
    width: 30px;
    height: 30px;
}

@media screen and (min-width: 700px) {
    img {
        height: 140px;
        width: 140px;
    }

    .biggerCheckBox {
        width: 40px;
        height: 40px;
    }
}
</style>