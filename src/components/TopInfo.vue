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
    padding: 0em 1em;
}

.sectiontitle {
    min-width: 52%;
}

.infotext {
    margin-left: 0.5em;
    color: #FAFEFF;
}

@media screen and (min-width: 576px) {
    .topinfo {
        align-items: center;
    }
}

@media screen and (min-width: 768px) {
    .topinfo {
        flex-direction: column;
    }

    .infotext {
        max-width: 450px;
    }
}
</style>
