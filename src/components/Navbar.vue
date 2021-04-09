<template>
    <div class="navbar">
        <div class="box desktop">
            <a href="#Startpage">
                <div id="linkbgr"><img src="../assets/home.png" /></div>
                <p class="mobileText">Hem</p>
                <p class="desktopText">Waveflow</p>
            </a>
        </div>
        <div class="box">
            <a href="#Top3">
                <div id="linkbgr"><img src="../assets/topp3.png" /></div>
                <p>Topp 3</p>
            </a>
        </div>
        <div class="box">
            <a href="#List">
                <div id="linkbgr"><img src="../assets/takemeto.png" /></div>
                <p>Dagens Mix</p>
            </a>
        </div>
        <div class="box">
            <a href="#Tableau">
                <div id="linkbgr"><img src="../assets/rightnow.png" /></div>
                <p>Tablå</p>
            </a>
        </div>
        <div class="box">
            <a class="aboutus" href="#Aboutus">
                <div id="linkbgr"><img src="../assets/about.png" /></div>
                <p>Om oss</p>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    name: "Navbar",
}
</script>

<style>
.navbar {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
    background-color: #294c53;
    position: fixed;
    z-index: 10;
    bottom: 0;
    max-height: 6em;
}

.box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0.2em;
    margin-bottom: 0.2em;
}

#linkbgr {
    padding: 0.5em;
    width: 3.1em;
    height: 3.1em;
    border-radius: 50%;
    background-color: rgba(229, 238, 240, 0.7);
}

.desktopText {
    display: none;
}

#linkbgr > img {
    margin-top: 0.5em;
}

a {
    display: contents;
    font-size: small;
    color: #fafeff;
    text-decoration: none;
}

a > p {
    font-size: 0.7em;
}

@media screen and (min-width: 320px) {
    a > p {
        font-size: 0.75em;
    }
}
@media screen and (min-width: 425px) {
    a > p {
        font-size: small;
    }
}

@media screen and (min-width: 768px) {
    .navbar {
        align-content: center;
        top: 0%;
        background-color: #53787f;
    }

    #linkbgr {
        display: none;
    }

    .desktop :first-child {
        background: none;
        width: 80%;
        height: 7em;
    }

    .mobileText {
        display: none;
    }

    .desktopText {
        display: initial;
        background: none;
        font-family: Pacifico;
        font-size: xxx-large;
        color: #9cd9e4;
    }

    a {
        display: initial;
        border-radius: 1.25em;
        color: #e5eef0;
        width: 70%;
        height: 3em;
        background-color: rgba(56, 12, 21, 0.1);
    }

    a > p {
        margin-top: 0.7em;
    }

    .aboutus {
        background-color: rgba(132, 193, 204, 0.1);
        margin-top: -10%;
        width: 45%;
    }
}
</style>
