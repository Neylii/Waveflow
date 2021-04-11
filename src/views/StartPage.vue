<template>
    <div class="home-page">
        <div class="home-page-content-full-width">
            <img src="../assets/Waveflow2.png" alt="Waveflow logo" />
            <div class="waveflow-description-container">
                <div>
                    <p>Välkommen till Waveflow!</p>
                    <p>Här kan du se information och statistik från Sveriges Radio.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "StartPage",
}
</script>


<style scoped>
.home-page {
    display: flex;
    align-items: center;
    min-height: 100vh;
}
.home-page-content-full-width {
    width: 100%;
}

.home-page-content-full-width > img {
    width: 100%;
}

.waveflow-description-container {
    display: flex;
    justify-content: center;
    padding: 1em 2em 2em;
}

p + p {
    margin-top: 2em;
}

p {
    font-family: Abel;
    text-align: start;
    font-size: 20px;
    line-height: 35px;
    margin-top: 0.5em;
}

@media screen and (min-width: 768px) {
    p {
        font-size: 24px;
        margin-top: 2em;
    }

    p + p {
        margin-top: 0em;
    }
}
</style>
