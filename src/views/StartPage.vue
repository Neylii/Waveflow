<template>
    <div id="startPage">
        <div class="text-container">
            <h1>Waveflow</h1>
            <div class="paragraphs">
                <p>Välkommen till Waveflow!</p>
                <p>Här kan du se information och statistik från Sveriges Radio.</p>
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
#startPage {
    height: 99vh;
    width: 99vw;
}

.text-container {
    margin-top: 40%;
}

.paragraphs {
    width: 80%;
}

h1 {
    font-family: Pacifico;
    font-style: normal;
    font-weight: normal;
    font-size: 500%;
    text-align: center;
    color: #84c1cc;
}

p {
    font-family: Abel;
    font-style: normal;
    font-weight: normal;
    line-height: 130%;
    color: #fafeff;
    text-align: start;
    font-size: 150%;
    margin-left: 5%;
    padding-bottom: 3%;
}
</style>
