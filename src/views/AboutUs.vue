<template>
    <div id="footerContainer">
        <div class="topText">
            <h2>vi är</h2>
            <h1>Waveflow!</h1>
        </div>
        <div id="mainContentMobile">
            <div class="mainContentTop">
                <about-us-box
                    class="mainContentTopLeft"
                    name="Niklas"
                    description="Musikskapande och hunden Nala, då trivs Kungsbackabon Niklas!"
                    role="JAVA"
                />
                <about-us-box
                    class="mainContentTopRight"
                    name="Emma"
                    description="Frölundabo som gillar tidiga mornar på gymmet"
                    role="JAVA"
                />
            </div>
            <div class="mainContentMiddle">
                <about-us-box
                    name="Marcus"
                    description="Surfdrömmande majornabo som siktar mot Portugal"
                    role="Ux-design"
                />
                <about-us-box
                    name="Oscar"
                    description="Tefantasten som lämnade Schlätta för Göteborg"
                    role="UX-design"
                />
            </div>
            <div class="mainContentCenter">
                <about-us-box
                    name="Caroline"
                    description="Den kloka samhällsanalytikern med sin bas i Olskroken"
                    role="UX-design"
                />
            </div>
            <div class="mainContentBottom">
                <about-us-box name="Mia" description="Vinkonnässören som lämnade Borås för Lerum" role="UX-design" />
                <about-us-box name="Tom" description="Den discogolfande gamern från Torslanda" role="JAVA" />
            </div>
        </div>

        <div id="mainContentDesktop">
            <div class="mainContentTop">
                <about-us-box name="Niklas" description="Musikskapande och hunden Nala, då trivs Niklas!" role="JAVA" />
                <about-us-box name="Emma" description="Frölundabo som gillar tidiga mornar på gymmet" role="JAVA" />
                <about-us-box name="Tom" description="Den discogolfande gamern från Torslanda" role="JAVA" />
            </div>
            <div class="mainContentBottom">
                <about-us-box
                    name="Marcus"
                    description="Surfdrömmande majornabo som siktar mot Portugal"
                    role="Ux-design"
                />
                <about-us-box
                    name="Oscar"
                    description="Tefantasten som lämnade Schlätta för Göteborg"
                    role="UX-design"
                />
                <about-us-box name="Mia" description="Vinkonnässören som lämnade Borås för Lerum" role="UX-design" />
                <about-us-box
                    name="Caroline"
                    description="Den kloka samhällsanalytikern med sin bas i Olskroken"
                    role="UX-design"
                />
            </div>
        </div>
        <div class="bottomContainer">
            <div id="bottomText">
                <p>
                    Waveflow är en applikation baserad <br />på data från Sveriges Radio. <br />
                    Version 1.0
                </p>
            </div>
        </div>
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
    justify-content: center;
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
}
.topText > h1 {
    font-size: 28px;
    font-style: normal;
    font-weight: normal;
    color: #89dbee;
    margin-left: 0.2em;
}

#mainContentMobile {
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

#mainContentMobile > * {
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

.bottomContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 0.2;
}

#bottomText {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 0.2;
}

#bottomText > p {
    font-family: Abel;
    font-size: 12px;
}

#mainContentDesktop {
    display: none;
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

@media screen and (min-width: 768px) {
    #mainContentMobile {
        display: none;
    }

    #mainContentDesktop {
        display: flex;
        flex-direction: column;
        gap: 6em;
    }

    .topText {
        align-self: center;
        margin-bottom: 4em;
    }

    .topText > h2 {
        font-size: 50px;
    }
    .topText > h1 {
        font-size: 72px;
    }

    .mainContentTop {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .mainContentBottom {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .bottomContainer {
        display: flex;
        justify-content: center;
    }

    #bottomText {
        background: rgba(132, 193, 204, 0.1);
        width: 6em;
        padding: 1em;
    }

    #bottomText > p {
        font-size: 14px;
    }
}
</style>
