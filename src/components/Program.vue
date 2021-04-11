<template>
    <div class="program-container">
        <div class="program-start-time">
            <p>
                <strong>{{ time }}</strong>
            </p>
        </div>
        <Program-Description :title="title" :description="description" />
        <div class="stationimg">
            <img :src="imgSrc" alt="channel picture"/>
        </div>
    </div>
</template>

<script>
import ProgramDescription from "./ProgramDescription"

export default {
    name: "Program",
    props: {
        title: String,
        description: String,
        time: String,
        imgSrc: String,
    },
    components: {
        ProgramDescription,
    },
}
</script>


<style scoped>
.program-container {
    display: flex;
    background: rgba(20, 95, 109, 0.3);
    border: 1.5px solid #84c1cc;
    border-radius: 10px;
    width: 17em;
}

/* prevent double stacking of borders, only first siblin have border-top */
.program-container + .program-container {
    border-top: none;
}

.program-start-time {
    display: flex;
    align-items: center;
    border-right: 1.5px solid #84c1cc;
    padding: 0.5em;
}

/* all p tags under a parent with the class program-start-time */
.program-start-time > p {
    font-family: arimo;
    font-size: 14px;
    margin: 0.5em;
}

.stationimg {
    display: flex;
    align-items: center;
    border-left: 1.5px solid #84c1cc;
    border-radius: 0px 10px 10px 0px;
    background-color: #ffffff;
}

.stationimg > img {
    height: 3em;
    width: 3em;
    margin: 0.2em;
}

/* media queries for bigger screens */
@media screen and (min-width: 360px) {
    .program-container {
        width: 21em;
    }

    .program-start-time > p {
        font-size: 18px;
    }

    .stationimg > img {
        height: 4em;
        width: 4em;
        margin: 0.3em;
    }
}

@media screen and (min-width: 500px) {
    .program-container {
        width: 27em;
    }

    .program-start-time > p {
        font-size: 18px;
    }
}

@media screen and (min-width: 600px) {
    .program-container {
        width: 33em;
    }
}

@media screen and (min-width: 768px) {
    .program-container {
        max-width: 28em;
        width: auto;
    }

    .program-start-time > p {
        font-size: 20px;
    }

    .stationimg > img {
        height: 4.5em;
        width: 4.5em;
        margin: 0.7em;
    }
}

@media screen and (min-width: 1000px) {
    .program-container {
        max-width: 40em;
    }

    .program-start-time > p {
        font-size: 24px;
    }

    .stationimg > img {
        height: 5em;
        width: 5em;
        margin: 1em;
    }
}
</style>
