<template>
    <div id="startPage">
        <div>
            <img src="../assets/Waveflow2.png" alt="logo">
            <div class="text-container">
                <p>Välkommen till Waveflow!<br>
                Här kan du se information och statistik från Sveriges Radio.</p>
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

.text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 6em;
}

img {
    width: 100%;
}

#startPage {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
}

p {
    font-family: Abel;
    font-style: normal;
    font-weight: normal;
    color: #fafeff;
    text-align: start;
    font-size: 24px;
}
</style>
