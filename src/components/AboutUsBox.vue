<template>
    <div id="boxContainer">
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
    data() {
        return {}
    },
}
</script>


<style scoped>
* {
    font-size: 16px;
}

#boxContainer {
    width: 9em;
    font-family: Abel;
    min-height: 4em;
    margin-bottom: 0.5em;
}

h3 {
    font-family: Pacifico;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    text-align: center;
}

#boxContainer > * {
    text-align: center;
}

@media screen and (min-width: 410px) {
    #boxContainer {
    width: 11em;
    font-family: Abel;
}
}

@media screen and (min-width: 768px) {
    * {
        font-size: 20px;
    }
    
    #boxContainer {
        width: 13em;
    }

    h3 {
        font-family: Abel;
        font-size: 36px;
    }
}
</style>