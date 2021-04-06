<template>
    <div class="title">
        {{ msg }}
    </div>
</template>

<script>
export default {
    name: "Sectiontitle",
    props: {
        msg: String,
    },
}
</script>

<style scoped>
.title {
    font-family: Pacifico;
    font-style: normal;
    font-weight: normal;
    font-size: 3em;
    margin-bottom: 0.5em;
    /* identical to box height */

    color: #e9f1f1;
    transform: rotate(-18.34deg);
}

/* For bigger screens */
@media screen and (min-width: 768px) {
    .title {
        font-size: 5em;
    }
}


</style>
