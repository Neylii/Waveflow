<template>
    <div class="navbar">
        <a href="#">Waveflow</a>
        <a href="#">Topp 3</a>
        <a href="#">Låtlistan</a>
        <a href="#">Tablå</a>
        <a href="#">Om oss</a>
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
    width: 100%;
    background-color: #294c53;
    overflow: auto;
    position: fixed;
    z-index: 10;
    bottom: 0;
    height: 7em;
}

.navbar > a {
    font-family: Armata;
    float: left;
    width: 12%;
    padding: 0.5em 2em 0.5em;
    color: #FAFEFF;
    text-decoration: none;
    margin-top: 4em;
}

.navbar > a:first-child {
    display: none;
}

@media screen and (min-width: 700px) {
    .navbar {
        top: 0%;
        background-color: #53787f;
    }

    .navbar > a {
        background-color: rgba(20, 95, 109, 0.3);
        border-radius: 1.25em;
        color: #e5eef0;
        margin-top: 2%;
    }

    .navbar > a:first-child {
        display: initial;
        background: none;
        font-family: Pacifico;
        font-size: xxx-large;
        color: #84c1cc;
        /* width: 10%; */
        margin-top: -0.5em;
        text-align: left;
    }

    .navbar > a:last-child {
        background-color: rgba(56, 12, 21, 0.1);
        width: 10%;
        margin-left: 5%;
        padding: 0.5em;
    }
}
</style>
