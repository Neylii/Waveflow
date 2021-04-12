<!-- 
    About us page, shows info about the creators and which api the page uses and version
-->
<template>
    <div id="about-us-container">
        <div class="about-us-headers">
            <h2>vi är</h2>
            <h1>Waveflow!</h1>
        </div>
        <div class="about-us-content-container">
            <div class="ux-container">
                <div class="first-ux-subcontainer">
                    <about-us-box name="Caroline" description="Skidälskaren med sin bas i Olskroken" role="UX-design" />
                    <about-us-box
                        name="Mia"
                        description="Vinkonnässören som lämnade Borås för Lerum"
                        role="UX-design"
                    />
                </div>
                <div class="second-ux-subcontainer">
                    <about-us-box
                        name="Marcus"
                        description="Surfdrömmande majornabo som siktar mot Portugal"
                        role="UX-design"
                    />
                    <about-us-box
                        name="Oscar"
                        description="Tefantasten som lämnade Schlätta för Göteborg"
                        role="UX-design"
                    />
                </div>
            </div>
            <div class="java-container">
                <div class="first-java-subcontainer">
                    <about-us-box name="Tom" description="Den discgolfande gamern från Torslanda" role="JAVA" />
                </div>
                <div class="second-java-subcontainer">
                    <about-us-box
                        name="Niklas"
                        description="Musikskapande och hunden Nala, då trivs Kungsbackabon"
                        role="JAVA"
                    />
                    <about-us-box name="Emma" description="Frölundabo som gillar tidiga mornar på gymmet" role="JAVA" />
                </div>
            </div>
        </div>
        <div class="about-us-bottom-container">
            <div class="info-text-container">
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
#about-us-container {
    min-height: 99vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.about-us-headers {
    display: flex;
    margin-left: 1em;
    font-family: Pacifico;
    line-height: 49px;
    position: relative;
    top: 10px;
}

.about-us-headers > h2 {
    font-size: 20px;
    font-style: normal;
    font-weight: normal;
}
.about-us-headers > h1 {
    font-size: 28px;
    font-style: normal;
    font-weight: normal;
    color: #89dbee;
    margin-left: 0.2em;
}

.about-us-content-container {
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

.first-java-subcontainer {
    display: flex;
    justify-content: center;
    position: relative;
    top: -1.6em;
}

.ux-container {
    display: flex;
    flex-direction: column;
}

.first-ux-subcontainer {
    display: flex;
    gap: 0.1em;
}

.second-ux-subcontainer {
    display: flex;
    gap: 0.1em;
}

.second-java-subcontainer {
    display: flex;
    gap: 0.1em;
    position: relative;
    top: -3em;
}

.about-us-bottom-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 9em;
    margin-bottom: 4em;
}

.info-text-container > p {
    font-family: Abel;
}

/* For bigger screens */
@media screen and (min-width: 410px) {
    .first-ux-subcontainer {
        gap: 1.5em;
    }

    .second-ux-subcontainer {
        gap: 1.5em;
    }

    .second-java-subcontainer {
        gap: 1.5em;
    }
}

/* For desktop  change order of ux and java to fit on the screen better */
@media screen and (min-width: 768px) {
    .about-us-content-container {
        flex-flow: column-reverse;
        background: none;
        padding: 2em;
    }

    #mainContentDesktop {
        display: flex;
        flex-direction: column;
        gap: 6em;
        padding: 2em;
    }

    .about-us-headers {
        align-self: center;
        margin-bottom: 4em;
    }

    .about-us-headers > h2 {
        font-size: 50px;
    }
    .about-us-headers > h1 {
        font-size: 72px;
    }

    .ux-container {
        flex-direction: row;
    }

    .second-java-subcontainer {
        top: 0em;
    }

    .java-container {
        display: flex;
        flex-direction: row;
        margin-bottom: 4em;
    }

    .first-java-subcontainer {
        top: 0em;
    }

    .info-text-container {
        background: rgba(132, 193, 204, 0.1);
        width: 6em;
        padding: 1em;
        flex-grow: 0.2;
    }
}
</style>
