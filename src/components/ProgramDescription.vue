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
    padding: 0.6em;
}

h2 {
    font-family: Arimo;
    font-weight: bold;
    font-size: 16px;
    line-height: 23px;
    text-align: center;
}

p {
    font-weight: normal;
    font-size: 11px;
    margin-top: 1em;
}

@media screen and (min-width: 360px) {

    #contentcontainer {
    padding: 0.8em;
    }

    h2 {
        font-size: 18px;
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