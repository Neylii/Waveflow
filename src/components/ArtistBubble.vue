<template>
    <div id="bubble">
        {{ artistName }}
    </div>
</template>

<script>
export default {
    props: {
        artistName: String,
    },
}
</script>

<style>
#bubble {
    position: relative;
    display: flex;
    width: 10em;
    height: 10em;
    top: 2em;
    left: 5em;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, #31a1bd 0%, rgba(11, 40, 48, 0.418) 100%);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

div + #bubble {
    width: 8.5em;
    height: 8.5em;
    left: -3.5em;
    top: -3em;
    background: linear-gradient(180deg, rgba(0, 88, 104, 0.69) 0%, #145f6d 100%);
}

div + #bubble + #bubble {
    width: 7.5em;
    height: 7.5em;
    left: 4.5em;
    top: -6em;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%), #84c1cc;
}

@media screen and (min-width: 768px) {
    #bubble {
        width: 13em;
        height: 13em;
        top: 10em;
        left: 4em;
    }

    div + #bubble {
        width: 11em;
        height: 11em;
        left: -6em;
        top: 5em;
    }

    div + #bubble + #bubble {
        width: 9em;
        height: 9em;
        left: 4.5em;
        top: 0em;
    }
}

@media screen and (min-width: 992px) {
    #bubble {
        width: 15em;
        height: 15em;
        top: 10em;
        left: 4em;
    }

    div + #bubble {
        width: 13em;
        height: 13em;
        left: -7em;
        top: 5em;
    }

    div + #bubble + #bubble {
        width: 11em;
        height: 11em;
        left: 6em;
        top: -2em;
    }
}

@media screen and (min-width: 1200px) {
    #bubble {
        width: 20em;
        height: 20em;
        top: 7em;
        left: 0em;
    }

    div + #bubble {
        width: 18em;
        height: 18em;
        left: -12em;
        top: 3em;
    }

    div + #bubble + #bubble {
        width: 16em;
        height: 16em;
        left: 7em;
        top: -10em;
    }
}
</style>