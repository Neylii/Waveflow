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
    position: absolute;
    display: flex;
    width: 14em;
    height: 13.5em;
    left: 13em;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, #31a1bd 0%, rgba(49, 161, 189, 0) 100%);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
</style>