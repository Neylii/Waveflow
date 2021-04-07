<template>
    <div class="infobox">
        {{ msg }}
    </div>
</template>

<script>
export default {
    name: "Infobox",
    props: {
        msg: String,
    },
}
</script>

<style scoped>
.infobox {
    padding: 0.5em;
    margin: 0em;
    text-align: start;
    
}

@media screen and (min-width: 768px) {
    .infobox {
        display: flex;
        flex-direction: row;
        margin-top: 1em;
        margin-bottom: 0.5em;
        border-left: 0.0625em solid #ffffff;
        border-bottom: 0.0625em solid #ffffff;

        font-size: 1.5em;
        line-height: 1.875em;

        color: #fafeff;
    }
}
</style>
