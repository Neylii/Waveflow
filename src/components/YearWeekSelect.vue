<template>
    <div id="year-week-select">
        <label for="year" class="arimo-font">
            Välj år
            <select
                name="year"
                class="date-dropdown arimo-font"
                v-model="selectedYear"
                @change="
                    createListOfWeeks();
                    selections()">
                <option :value="year" v-for="year in years" :key="year">{{ year }}</option>
            </select></label
        >
        <label for="week" class="arimo-font">
            Välj vecka
            <select name="week" class="date-dropdown arimo-font" v-model="selectedWeek" @change="selections()">
                <option :value="week" v-for="week in weeks" :key="week">{{ week }}</option>
            </select></label
        >
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
.arimo-font {
    font-family: Arimo;
    font-style: normal;
}

#year-week-select {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 5%;
}

label {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    color: #FAFEFF;
}

.date-dropdown {
    border: 1px solid #84c1cc;
    border-radius: 25px;
    text-indent: 20px;
    font-size: 16px;
    line-height: 23px;
    color: #145F6D;
    width: 9em;
    height: 3em;
    margin-top: 5%;
}

select > option {
    border: 1px solid #84c1cc;
    border-radius: 25px;
}
</style>