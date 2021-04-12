<template>
    <datepicker
        :placeholder="today.toLocaleDateString()"
        v-model="$parent.inputDate"
        :lower-limit="startDate"
        :upper-limit="today"
    />
</template>

<script>
/**
 * Component for TakeMeTo.vue
 * Standard calendar with a min and max date.
 */
import Datepicker from "vue3-datepicker"
import { ref } from "vue"
export default {
    name: "DatePicker",
    components: {
        Datepicker,
    },
    data() {
        return {
            startDate: new Date("2011-01-01"),
            today: ref(new Date()),
        }
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
