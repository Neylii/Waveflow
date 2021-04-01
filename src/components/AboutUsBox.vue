<template>
    <div id="boxContainer">
        <h3>{{ name }}</h3>
        {{ description }}
        <br>{{ role }}
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
    data() {
        return {}
    },
}
</script>


<style scoped>
* {
    font-size: 12px;
    color: #FFFFFF;
}

#boxContainer {
    display: flex;
    flex-direction: column;
    height: 7em;
    width: 13.5em;
}

h3 {
    font-family: Pacifico;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    text-align: center;
}

#boxContainer > * {
    text-align: center;
}
</style>