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

.section {
    min-height: 100vh;
    padding-top: 0.5em;
}

@media screen and (min-width: 768px) {
    .section {
        padding-top: 6.6em;
    }
}
</style>
