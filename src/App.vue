<template>
    <div>
        <Navbar />
        <start-page />
        <top-three />
        <take-me-to />
        <right-now />
        <about-us />
    </div>
</template>

<script>
import TopThree from "./views/TopThree.vue"
import TakeMeTo from "./views/TakeMeTo.vue"
import RightNow from "./views/RightNow.vue"
import AboutUs from "./views/AboutUs.vue"
import StartPage from "./views/StartPage.vue"
import Navbar from "./components/Navbar.vue"

export default {
    name: "App",
    components: {
        TopThree,
        TakeMeTo,
        RightNow,
        AboutUs,
        StartPage,
        Navbar,
    },
}
</script>

<style>
/* .border {
    border: 1px solid black;
} */

* {
    margin: 0;
    padding: 0;
}

body {
    background-color: rgba(46, 93, 101, 0.8);
}

#app {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
        "Helvetica Neue", sans-serif;
    color: #2c3e50;
    text-align: center;
}

.header {
    grid-column: 1/3;
    font-size: xx-large;
    margin-bottom: 2em;
    text-align: center;
}

.lbtitle {
    padding: 0.5em;
    margin: 0em;
}

.rbtitle {
    display: flex;
    flex-direction: column;
    font-weight: bolder;
    font-size: xx-large;
}

.scaling {
    max-width: 100%;
    height: auto;
}
.textAlignLeft {
    text-align: left;
}

/* For bigger screens */
@media screen and (min-width: 700px) {
    /* #app {
        width: 100%;
        text-align: center;
    } */
}
</style>
