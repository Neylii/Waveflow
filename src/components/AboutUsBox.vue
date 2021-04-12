<!--
    Component for AboutUs, a card containing info about a creator
-->
<template>
    <div class="info-card-container">
        <h3>{{ name }}</h3>
        {{ description }}
        <br />{{ role }}
    </div>
</template>

<script>
export default {
    name: "AbousUsBox",
    props: {
        name: String,
        description: String,
        role: String,
    },
}
</script>


<style scoped>
.info-card-container {
    width: 9em;
    font-family: Abel;
    margin-bottom: 0.5em;
}

h3 {
    font-family: Pacifico;
    font-weight: normal;
    font-size: 20px;
}

@media screen and (min-width: 410px) {
    .info-card-container {
        width: 11em;
    }
}

@media screen and (min-width: 768px) {
    * {
        font-size: 20px;
    }

    .info-card-container {
        width: auto;
        max-width: 13em;
    }

    h3 {
        font-family: Abel;
        font-size: 36px;
    }
}
</style>