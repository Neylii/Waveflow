<template>
    <div id="footerContainer">
        <div id="footerContent">
            <div id="footerLogo">
                <img src="../assets/yrgo.png">
            </div>
            <div id="footerText">
                <p>Detta är en hemsida baserad på Sveriges Radio API</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: "Footer",
}
</script>


<style scoped>
#footerContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 35em;
    background-color: lightgoldenrodyellow;
}

#footerContent {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 5%;
    height: 15em;
    padding: 7em;
    gap: 4em;
}

#footerLogo {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: gray;
    border-radius: 50%;
}

img {
    width: 300px;
    height: 300px;
}

#footerText {
    display: flex;
    align-items: center;
    justify-content: center;
}

p {
    font-size: 1.5em;
}
</style>