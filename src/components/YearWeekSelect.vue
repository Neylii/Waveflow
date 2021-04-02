<template>
    <div id="year-week-select">
        <select name="year" class="date-dropdown" v-model="selectedYear" @change="createListOfWeeks(); selections()">
            <option :value="year" v-for="year in years" :key="year">{{ year }}</option>
        </select>
        <select name="week" class="date-dropdown" v-model="selectedWeek" @change="selections()">
            <option :value="week" v-for="week in weeks" :key="week">{{ week }}</option>
        </select>
    </div>
</template>

<script>
export default {
    emits: ["year", "week"],

    data() {
        return {
            years: [],
            weeks: [],
            selectedYear: 2021,
            selectedWeek: 1,
        }
    },

    mounted() {
        this.createListOfAvailableYears()
        this.createListOfWeeks()
    },

    methods: {
        // adds all years from 2011 to current year to the years[] array
        createListOfAvailableYears() {
            let year = 2011
            let d = new Date()
            let currentYear = d.getFullYear()
            while (year <= currentYear) {
                this.years.push(year)
                year++
            }
        },
        // adds all available weeks of the selected year to the weeks[] array
        createListOfWeeks() {
            this.weeks.length = 0
            let d = new Date()
            let currentYear = d.getFullYear()
            let week = 1
            if (this.selectedYear !== currentYear) {
                for (let i = 1; i <= 52; i++) {
                    this.weeks.push(i)
                }
            } else {
                while (week <= this.getCurrentWeek()) {
                    this.weeks.push(week)
                    week++
                }
            }
        },

        // returns the current week as a number
        getCurrentWeek() {
            const today = new Date()
            const firstDayOfYear = new Date(today.getFullYear(), 0, 1)
            const pastDaysOfYear = (today - firstDayOfYear) / 86400000
            return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7) - 1
        },

        // emits the selected year and week so that it can be used in the main view
        selections() {
            this.$emit("year", this.selectedYear)
            this.$emit("week", this.selectedWeek)
            console.log(this.selectedYear + ", " + this.selectedWeek)
        },
    },
}
</script>

<style>
</style>