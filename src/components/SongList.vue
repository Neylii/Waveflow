<template>
    <div class="songbox">
        <ul id="songlist">
            <li v-for="description in $parent.songMix" :key="description">{{ description }}</li>
        </ul>
    </div>
</template>

<script>
/**
 * Component for TakeMeTo.vue.
 * Adds songs in a list to show the user.
 */
export default {
    name: "SongList",
}
</script>

<style>
.songbox {
    background: rgba(20, 95, 109, 0.3);
    border: 2px solid #84c1cc;
    box-sizing: border-box;
    border-radius: 10px;
    transform: scale(0.9);
}

#songlist > li {
    list-style-image: url("../assets/star.svg");
    margin: 2em;
    text-align: start;
    font-size: large;
}

/* For biggest screens */
@media screen and (min-width: 765px) {
    .songbox {
        background: rgba(20, 95, 109, 0.3);
        padding: 2.15em;
        border: 2px solid #84c1cc;
        border-radius: 10px;
        transform: scale(1);
        margin: 4em;
    }

    #songlist > li {
        align-items: flex-end;
        font-size: large;
        padding: 0.3em;
        margin: 1em;
        text-align: start;
    }
}

@media screen and (min-width: 992px) {
    .songbox {
        margin: 4em;
        transform: scale(1.1);
    }
}
</style>
