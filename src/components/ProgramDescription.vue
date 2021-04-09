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
    flex-grow: 1;
    padding: 0.6em;
}

h2 {
    font-family: Arimo;
    line-height: 23px;
    text-align: center;
    font-size: 18px;
}

p {
    font-size: 11px;
    margin-top: 1em;
}

@media screen and (min-width: 360px) {

    #contentcontainer {
    padding: 0.8em;
    }

    p {
        font-size: 12px;
    }
}

@media screen and (min-width: 768px) {

    h2 {
        font-size: 20px;
    }

    p {
        font-size: 14px;
    }
}

@media screen and (min-width: 1000px) {
    
    #contentcontainer {
    padding: 1em;
    }

    p {
        font-size: 18px;
    }
}
</style>