<!--
   Component for the RightNow view, Clickable card for each radio station
   wheck clicked calls the method to fetch tablo for each channel that's clicked
-->
<template>
    <label :for="station" class="radio-station">
        <img :src="station + '.png'" :alt="station + 'channel picture '" />
        <input type="checkbox" :id="station" @click="$parent.filterSelectedChannels" :checked="preChecked" />
    </label>
</template>

<script>
export default {
    props: {
        station: String,
        preChecked: Boolean,
    },
}
</script>

<style scoped>
.radio-station {
    align-items: center;
    background: #ffffff;
    padding: 1em;
    border: 4px solid #84c1cc;
    border-radius: 10px;
    cursor: pointer;
}

.radio-station > img {
    height: 3em;
    width: 3em;
    margin-bottom: 1em;
}

.radio-station > input[type="checkbox"] {
    transform: scale(1.2);
    margin-bottom: 0em;
    cursor: pointer;
}

@media screen and (min-width: 360px) {
    .radio-station > img {
        height: 4em;
        width: 4em;
        margin-bottom: 1em;
    }

    .radio-station > input[type="checkbox"] {
        transform: scale(1.4);
        margin-bottom: 0em;
    }
}

@media screen and (min-width: 500px) {
    .radio-station > img {
        height: 5.8em;
        width: 5.8em;
    }

    .radio-station > input[type="checkbox"] {
        transform: scale(1.7);
        margin-bottom: 0em;
    }
}

@media screen and (min-width: 600px) {
    .radio-station > img {
        height: 8em;
        width: 8em;
        margin-bottom: 1.5em;
    }

    .radio-station > input[type="checkbox"] {
        transform: scale(2.1);
        margin-bottom: 0.5em;
    }
}

@media screen and (min-width: 1000px) {
    .radio-station > img {
        height: 10em;
        width: 10em;
    }

    .radio-station > input[type="checkbox"] {
        transform: scale(2.5);
    }
}
</style>