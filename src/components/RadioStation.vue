<template>
    <div class="radiostation border">
        <img :src="station + '.png'" :name="station" @click="activateCheckbox" />
        <input
            type="checkbox"
            class="biggerCheckBox"
            name="checkBoxStation"
            :id="station"
            @click="$parent.updateAllChannels"
            :checked="mcChecked"
        />
    </div>
</template>

<script>
export default {
    props: {
        station: String,
        mcChecked: Boolean,
    },
    methods: {
        activateCheckbox() {
            let checkBox = document.getElementById(this.station)
            checkBox.checked = !checkBox.checked

            this.$parent.updateAllChannels()
        },
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