<template>
    <div class="right-now-container">
        <div class="info-options-container">
            <TopInfo title="Tablå" infotext="Här kan du se vad som sänds under dagen i vald kanal" />
            <div class="options-container">
                <div class="radio-station-container">
                    <Radio-station station="P1" id="132" />
                    <Radio-station station="P2" id="163" />
                    <Radio-station station="P3" id="164" :preChecked="true" />
                    <Radio-station station="P4 Göteborg" id="212" />
                </div>
            </div>
        </div>
        <div class="tablo-content-container">
            <div class="program-list-container">
                <Program
                    v-for="program in showCertainNumberOfPrograms"
                    :key="program"
                    :time="startTime(program.starttimeutc)"
                    :title="program.title"
                    :description="program.description"
                    :imgSrc="program.channel.name + '.png'"
                >
                    {{ program }}
                </Program>
            </div>
        </div>
    </div>
</template>

<script>
import RadioStation from "../components/RadioStation"
import Program from "../components/Program"
import TopInfo from "../components/TopInfo.vue"

export default {
    name: "RightNow",
    data() {
        return {
            allPrograms: [],
            programArrayTemp: [],
            numberOfProgramsToShow: 6,
        }
    },
    components: {
        TopInfo,
        RadioStation,
        Program,
    },
    methods: {
        addZerosToSingleDigits(number) {
            if (number < 10) {
                number = "0" + number
            }
            return number
        },

        /**
         * returns date from jsonDate
         *
         * @param {String} dateString The date string to convert
         * @returns {Date} date from timestamp
         */
        jsonDateToDate(dateString) {
            // removes symbols and string from json date
            let timestamp = +dateString.replace(/\/Date\((.*?)\)\//g, "$1")
            return new Date(timestamp)
        },

        /**
         * Gets hours and minutes from json Date String
         *
         * @param {String} dateString The date string get hours and minutes from
         * @returns {String} time in HH:MM
         */
        startTime(dateString) {
            let programStartTime = this.jsonDateToDate(dateString)
            let h = programStartTime.getHours()
            let m = programStartTime.getMinutes()
            h = this.addZerosToSingleDigits(h)
            m = this.addZerosToSingleDigits(m)
            return h + ":" + m
        },

        /**
         * Format date object to YYYY-MM-DD
         *
         * @param {Date} date to format
         * @returns {String} YYYY-MM-DD
         */
        formatDate(dateObj) {
            // +1 so jan is month 1 and not 0
            let month = dateObj.getUTCMonth() + 1
            let day = dateObj.getUTCDate()
            let year = dateObj.getUTCFullYear()

            month = this.addZerosToSingleDigits(month)
            day = this.addZerosToSingleDigits(day)

            return year + "-" + month + "-" + day
        },

        /**
         * Sorts the program list on Time and then channel name
         *
         * @param {Array} programList to sort
         * @returns {Array} the sorted array
         */
        sortProgramList(programList) {
            programList = programList.sort(function (a, b) {
                if (a.starttimeutc > b.starttimeutc) {
                    return 1
                } else if (a.starttimeutc < b.starttimeutc) {
                    return -1
                }
                //compares the channel name if the times are the same
                return a.channel.name.localeCompare(b.channel.name)
            })
            return programList
        },

        /**
         * fetches tablo for one day
         *
         * @param {String} apiUrl url to fetch data from
         * @param {Array} tempArray to push the result from the api into
         */
        async getSingleTablo(apiUrl, tempArray) {
            let json = null

            try {
                let response = await fetch(apiUrl)
                if (!response.ok) {
                    throw new Error(response.status)
                }
                json = await response.json()
            } catch (err) {
                console.error(err)
            }

            // schedule is the array with all programs
            json = json.schedule

            let dateNow = new Date()

            //removes all programs from the list that has already aired
            for (let i = json.length - 1; i >= 0; i--) {
                let dateProgram = this.jsonDateToDate(json[i].endtimeutc)
                if (dateNow > dateProgram) {
                    json.splice(i, 1)
                }
            }

            // Merge the arrays
            Array.prototype.push.apply(tempArray, json)
        },

        /**
         * adds programs to the program list
         *
         * @param {String} channelId the channels id
         */
        async addProgramsToProgramList(channelId) {
            let date = new Date()
            let tempArray = []

            // the query to add to the request
            let query = `channelid=${channelId}&date=${this.formatDate(date)}&size=500&format=json`

            // calls getSingleTablo one day at a time until number of programs is met
            do {
                await this.getSingleTablo(`https://api.sr.se/api/v2/scheduledepisodes?${query}`, tempArray)
                date.setDate(date.getDate() + 1)
            } while (tempArray.length < this.numberOfProgramsToShow)

            //merge arrays
            Array.prototype.push.apply(this.programArrayTemp, tempArray)

            //Sorts the array
            this.programArrayTemp = this.sortProgramList(this.programArrayTemp)
        },

        /**
         * Update the programlist for each radiostation that is checked
         */
        filterSelectedChannels() {
            this.programArrayTemp = []
            let checkBoxes = document.querySelectorAll(`input[type="checkbox"]`)

            // loops all radio stations and adds programs to programlist for each checked radiostation
            checkBoxes.forEach((station) => {
                if (station.checked) {
                    this.addProgramsToProgramList(station.parentNode.id)
                }
            })
            this.allPrograms = this.programArrayTemp
        },
    },
    //on mount get programs for pre checked channels
    mounted() {
        this.filterSelectedChannels()
    },
    computed: {
        // runs function when the variable allPrograms is updated
        showCertainNumberOfPrograms() {
            //  return new array with just the first indexes from 0 to numberOfProgramsToShow
            return this.allPrograms.slice(0, this.numberOfProgramsToShow)
        },
    },
}
</script>

<style scoped>
.info-options-container {
    width: 100%;
}

.radio-station-container {
    display: flex;
    justify-content: center;
    margin-top: 1em;
    gap: 0.2em;
}

.tablo-content-container {
    display: flex;
    justify-content: center;
}

.program-list-container {
    margin-top: 2em;
    padding: 0em 0.6em;
}

/* For bigger screens */
@media screen and (min-width: 360px) {
    .radio-station-container {
        gap: 0.5em;
    }

    .program-list-container {
        padding: 0em 1.5em;
    }
}

@media screen and (min-width: 768px) {
    .right-now-container {
        display: flex;
    }

    .options-container {
        display: flex;
        justify-content: center;
    }

    .radio-station-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 2em;
    }

    .tablo-content-container {
        width: 100%;
    }
}
</style>
