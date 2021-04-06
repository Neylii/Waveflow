<template>
    <div class="topinfo">
        <div class="sectiontitle">
            <sectiontitle :msg="title" />
        </div>
        <div class="infotext">
            <infobox :msg="infotext" />
        </div>
    </div>
</template>

<script>
import Infobox from "./Infobox.vue"
import Sectiontitle from "./Sectiontitle.vue"
export default {
    name: "TopInfo",
    props: {
        title: String,
        infotext: String,
    },
    components: {
        Sectiontitle,
        Infobox,
    },
}
</script>

<style scoped>
.topinfo {
    display: flex;
    flex-direction: row;
    min-height: 20%;
    transform: scale(0.8);
}

.sectiontitle {
    width: 80%;
}

.infotext {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 0.5em;
    color: #FAFEFF;
}

@media screen and (min-width: 576px) {
    .topinfo {
        transform: scale(1);
    }
}

@media screen and (min-width: 768px) {
    .topinfo {
        display: grid;
    }

    .infotext {
        transform: scale(0.9);
    }
}
</style>
