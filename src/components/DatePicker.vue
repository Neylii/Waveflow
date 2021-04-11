<template>
    <datepicker placeholder="Välj datum" v-model="$parent.inputDate" :lower-limit="startDate" :upper-limit="today" />
</template>

<script>
import Datepicker from "vue3-datepicker"
export default {
    name: "DatePicker",
    components: {
        Datepicker,
    },
    props: {
        startDate: Date,
        today: Date,
    },
}
</script>

<style>
input[type="text"] {
    height: 3em;
    width: 15em;
    cursor: pointer;
    border: 1px solid #84c1cc;
    box-sizing: border-box;
    border-radius: 10px;

    font-family: Arimo;
    color: #145f6d;
    font-weight: bolder;
    text-align: center;
}
</style>
