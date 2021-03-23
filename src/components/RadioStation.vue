<template>
    <div class="radiostation border">
        <img :src="station + '.png'" />
        <input type="checkbox" id="biggerCheckBox" @click="getProgramsForStation" :name="station" :checked="checked" />
    </div>
</template>

<script>
export default {
    props: {
        station: String,
        checked: Boolean,
        id: String,
    },
    data() {
        return {}
    },
    methods: {
        getProgramsForStation(event) {
            if (event.target.checked) {
                this.$parent.getTablo(
                    `https://api.sr.se/api/v2/scheduledepisodes?channelid=${this.id}&size=500&format=json`
                )
            } else {
                this.$parent.removeProgramsFromList(this.id)
            }
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

#biggerCheckBox {
    width: 30px;
    height: 30px;
}

@media screen and (min-width: 700px) {
    img {
        height: 140px;
        width: 140px;
    }

    #biggerCheckBox {
    width: 40px;
    height: 40px;
}

}
</style>