<template>
    <div>
        <!-- <Navigation msg="En fin header" /> -->
        <div class="header">
            <img src="./assets/wave.png" class="scaling" alt="Wave" />
            <Waveflow msg="Waveflow" />
            <p>
                Big company announcement or simple sub-header taking two or more lines. <br />
                Big company announcement or simple sub-header taking two or more lines. <br />
                Big company announcement or simple sub-header taking two or more lines. <br />
                Big company announcement or simple sub-header taking two or more lines. <br />
            </p>
        </div>

        <top-three />
        <take-me-to />
        <right-now />
    </div>
</template>

<script>
import Waveflow from "./views/Waveflow.vue"
import TopThree from "./views/TopThree.vue"
import TakeMeTo from "./views/TakeMeTo.vue"
import RightNow from "./views/RightNow.vue"

export default {
    name: "App",
    components: {
        Waveflow,
        TopThree,
        TakeMeTo,
        RightNow,
    },
}
</script>

<style>
#app {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
        "Helvetica Neue", sans-serif;
    color: #2c3e50;
    margin: 5vh 1rem;
    height: 90vh;
    text-align: center;
}

.header {
    grid-column: 1/3;
    font-size: xx-large;
    margin-bottom: 2em;
    text-align: center;
}

.header > p {
    font-size: small;
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
    #app {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        width: 100%;
        text-align: center;
    }
}
</style>
