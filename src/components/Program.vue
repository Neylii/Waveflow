<template>
    <div class="programcontainer">
        <div class="timecontainer">
            <p>
                <strong>{{ time }}</strong>
            </p>
        </div>
        <Program-container :title="title" :description="description" />
        <div class="stationimg">
            <img :src="imgSrc" />
        </div>
    </div>
</template>

<script>
import ProgramContainer from "./ProgramDescription"

export default {
    name: "Program",
    props: {
        title: String,
        description: String,
        time: String,
        imgSrc: String,
    },
    components: {
        ProgramContainer,
    },
}
</script>


<style scoped>
.programcontainer {
    display: flex;
    background: rgba(20, 95, 109, 0.3);
    border: 1px solid #84c1cc;
    border-radius: 10px;
    max-width: 22em;
    width: 100%;
}

.programcontainer + .programcontainer {
    border-top: none;
}

.timecontainer {
    display: flex;
    align-items: center;
    border-right: 1px solid #84c1cc;
    padding: 0.5em;
}

.timecontainer > p {
    font-family: arimo;
    font-size: 16px;
}

.timecontainer > p {
    margin: 1em;
}

.stationimg {
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid #84c1cc;
    box-sizing: border-box;
    border-radius: 0px 10px 10px 0px;
    background-color: rgba(255, 255, 255, 0.5);
}

.stationimg > img {
    height: 4em;
    width: 4em;
    margin: 0.3em;
}

@media screen and (min-width: 768px) {
    .programcontainer {
        max-width: 40em;
    }

    .timecontainer > p {
        font-size: 24px;
    }

    .stationimg > img {
        height: 5em;
        width: 5em;
        margin: 1em;
    }
}
</style>