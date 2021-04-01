<template>
    <div id="footerContainer">
        <div class="topText">
            <h2>vi är</h2>
            <h1>Waveflow!</h1>
        </div>
        <div id="mainContent">
            <div class="mainContentTop">
                <about-us-box
                    class="mainContentTopLeft"
                    :name="'Niklas'"
                    :description="'Musikskapande och hunden Nala, då trivs Niklas!'"
                    :role="'JAVA'"
                />
                <about-us-box
                    class="mainContentTopRight"
                    :name="'Emma'"
                    :description="'Frölundabo som gillar tidiga mornar på gymmet'"
                    :role="'JAVA'"
                />
            </div>
            <div class="mainContentMiddle">
                <about-us-box
                    :name="'Marcus'"
                    :description="'Surfdrömmande majornabo som siktar mot Portugal'"
                    :role="'Ux-design'"
                />
                <about-us-box
                    :name="'Oscar'"
                    :description="'Tefantasten som lämnade Schlätta för Göteborg'"
                    :role="'UX-design'"
                />
            </div>
            <div class="mainContentCenter">
                <about-us-box
                    :name="'Caroline'"
                    :description="'Den kloka samhällsanalytikern med sin bas i Olskroken'"
                    :role="'UX-design'"
                />
            </div>
            <div class="mainContentBottom">
                <about-us-box
                    :name="'Mia'"
                    :description="'Vinkonnässören som lämnade Borås för Lerum'"
                    :role="'UX-design'"
                />
                <about-us-box :name="'Tom'" :description="'Den discogolfande gamern från Torslanda'" :role="'JAVA'" />
            </div>
        </div>
        <div id="bottomText">Waveflow är en applikation baserad på data från Sveriges Radio. Version 1.0</div>
    </div>
</template>

<script>
import aboutUsBox from "../components/AboutUsBox.vue"

export default {
    name: "Footer",
    components: {
        aboutUsBox,
    },
}
</script>
 

<style scoped>
#footerContainer {
    min-height: 99vh;
    display: flex;
    flex-direction: column;
}

.topText {
    display: flex;
    align-self: flex-start;
    margin-left: 1em;
    font-family: Pacifico;
    font-size: 28px;
    line-height: 49px;
    position: relative;
    top: 10px;
}

.topText > h2 {
    font-size: 20px;
    font-style: normal;
    font-weight: normal;
    color: #ffffff;
}
.topText > h1 {
    font-size: 28px;
    font-style: normal;
    font-weight: normal;
    color: #89dbee;
    margin-left: 0.2em;
}

#mainContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5em;
    margin-left: 1em;
    margin-right: 1em;
    background: rgba(132, 193, 204, 0.1);
    border-radius: 5px;
    padding-top: 2em;
}

#mainContent > * {
    display: flex;
    justify-content: center;
    width: 23em;
}

.mainContentCenter {
    position: relative;
    top: -1.6em;
}

.mainContentBottom {
    position: relative;
    top: -3em;
}

@media screen and (min-width: 320px) {
    
    .mainContentTop {
        gap: 0;
    }
    .mainContentMiddle {
        gap: 1.5em;
    }
    .mainContentCenter {
        gap: 1.5em;
    }
    .mainContentBottom {
        gap: 1.5em;
    }


}
</style>