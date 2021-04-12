<template>
    <div class="title">
        {{ msg }}
    </div>
</template>

<script>
/**
 * Component that are a part of Sectiontitle.vue
 */
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
    font-size: 2.5em;
    margin-bottom: 0.4em;
    /* identical to box height */
    color: #e9f1f1;
    transform: rotate(-18.34deg);
}

@media screen and (min-width: 768px) {
    .title {
        font-size: 4em;
    }
}

/* For bigger screens */
@media screen and (min-width: 992px) {
    .title {
        font-size: 4.5em;
    }
}
</style>
