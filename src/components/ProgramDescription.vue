<!--
   Component for the program component, containing title and description of the program 
-->
<template>
    <div class="program-info-container">
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
.program-info-container {
    flex-grow: 1;
    padding: 0.6em;
}

h2 {
    font-family: Arimo;
    line-height: 23px;
    text-align: center;
    font-size: 16px;
}

p {
    font-size: 11px;
    margin-top: 1em;
}

@media screen and (min-width: 360px) {

    .program-info-container {
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
    
    .program-info-container {
    padding: 1em;
    }

    p {
        font-size: 18px;
    }
}
</style>