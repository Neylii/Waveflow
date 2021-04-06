<template>
    <div>
        <Navbar/>
        <div id="Startpage" class="section"><start-page/></div>
        <div id="Top3" class="section"><top-three/></div>
        <div id="List" class="section"><take-me-to/></div>
        <div id="Tableau" class="section"><right-now/></div>
        <div id="Aboutus" class="section"><about-us/></div>      

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

html {
  scroll-behavior: smooth;
}

body {
    background-color: rgba(46, 93, 101, 0.8);
}

#app {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    font-family: Armata;
    color: #FFFFFF;
    text-align: center;
}

.class section {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
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
</style>
