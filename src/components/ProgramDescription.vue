<template>
    <div id="contentcontainer" class="border">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
    </div>
</template>

<script>
export default {
    name: "ProgramDescription",
    props: {
        title: String,
        description: String,
    },
}
</script>

<style scoped>
#contentcontainer {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 1em;
}

#contentcontainer > * {
    font-family: Arimo;
    font-style: normal;
}

h2 {
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
}

p {
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
    margin-top: 1em;
}


@media screen and (min-width: 700px) {
    h2 {
        font-size: 20px;
    }

    p {
        font-weight: normal;
        font-size: 18px;
    }
}
</style>