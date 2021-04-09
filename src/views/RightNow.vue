<template>
    <div class="rightnow">
        <div id="left">
            <div class="info">
                <TopInfo title="Tablå" infotext="Här kan du se vad som sänds under dagen i vald kanal" />
            </div>
            <div id="leftbottom">
                <div id="radioStationContainer">
                    <Radio-station station="P1" id="132" />
                    <Radio-station station="P2" id="163" />
                    <Radio-station station="P3" id="164" :checked="true" />
                    <Radio-station station="P4 Göteborg" id="212" />
                </div>
            </div>
        </div>
        <div id="right">
            <div class="programs">
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
        addZerosToSingleDigits(i) {
            if (i < 10) {
                i = "0" + i
            }
            return i
        },

        jsonDateToDate(dateString) {
            let timestamp = +dateString.replace(/\/Date\((.*?)\)\//g, "$1")
            return new Date(timestamp)
        },

        startTime(dateString) {
            let programStartTime = this.jsonDateToDate(dateString)
            let h = programStartTime.getHours()
            let m = programStartTime.getMinutes()
            // add a zero in front of numbers<10
            h = this.addZerosToSingleDigits(h)
            m = this.addZerosToSingleDigits(m)
            return h + ":" + m
        },

        getDateFormatter(dateObj) {
            let month = dateObj.getUTCMonth() + 1
            let day = dateObj.getUTCDate()
            let year = dateObj.getUTCFullYear()

            month = this.addZerosToSingleDigits(month)
            day = this.addZerosToSingleDigits(day)

            return year + "-" + month + "-" + day
        },

        sortArrayOnTime(arrayToSort) {
            arrayToSort = arrayToSort.sort(function (a, b) {
                if (a.starttimeutc > b.starttimeutc) {
                    return 1
                } else if (a.starttimeutc < b.starttimeutc) {
                    return -1
                }
                if (a.channel.name > b.channel.name) {
                    return 1
                } else if (a.channel.name < b.channel.name) {
                    return -1
                }
                return 0
            })
            return arrayToSort
        },

        async getSingleTablo(api, tempArray) {
            let json = null

            try {
                let response = await fetch(api)
                if (!response.ok) {
                    throw new Error(response.status)
                }
                json = await response.json()
            } catch (err) {
                console.error(err)
            }

            json = json.schedule

            let dateNow = new Date()

            for (let i = json.length - 1; i >= 0; i--) {
                let dateProgram = this.jsonDateToDate(json[i].endtimeutc)
                if (dateNow > dateProgram) {
                    json.splice(i, 1)
                }
            }

            Array.prototype.push.apply(tempArray, json)
        },

        async fillUpChanneltoProgramList(channelId) {
            let date = new Date()
            let tempArray = []

            let query = `channelid=${channelId}&date=${this.getDateFormatter(date)}&size=500&format=json`

            do {
                await this.getSingleTablo(`https://api.sr.se/api/v2/scheduledepisodes?${query}`, tempArray)
                date.setDate(date.getDate() + 1)
            } while (tempArray.length < this.numberOfProgramsToShow)

            Array.prototype.push.apply(this.programArrayTemp, tempArray)

            this.programArrayTemp = this.sortArrayOnTime(this.programArrayTemp)
        },

        updateAllChannels() {
            this.programArrayTemp = []
            let checkBoxes = document.querySelectorAll(`input[type="checkbox"]`)

            checkBoxes.forEach((station) => {
                if (station.checked) {
                    this.fillUpChanneltoProgramList(station.parentNode.id)
                }
            })
            this.allPrograms = this.programArrayTemp
        },
    },
    mounted() {
        this.updateAllChannels()
    },
    computed: {
        showCertainNumberOfPrograms() {
            return this.allPrograms.slice(0, this.numberOfProgramsToShow)
        },
    },
}
</script>

<style scoped>
.rightnow {
    flex-direction: column;
}

#container {
    display: flex;
    margin-bottom: 2em;
}

#left {
    width: 100%;
}

#lefttop {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#leftbottom {
    display: flex;
    justify-content: center;
}

#radioStationContainer {
    display: flex;
    justify-content: center;
    margin-top: 1em;
    gap: 0.2em;
}

#right {
    display: flex;
    justify-content: center;
}

.programs {
    margin-top: 2em;
    padding-right: 0.6em;
    padding-left: 0.6em;
}

/* For bigger screens */
@media screen and (min-width: 360px) {
    .programs {
        padding-right: 1em;
        padding-left: 1em;
    }

    #right {
        width: 100%;
    }

    #radioStationContainer {
        gap: 0.5em;
    }
}

@media screen and (min-width: 768px) {
    .rightnow {
        display: flex;
        flex-direction: row;
    }

    #radioStationContainer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 2em;
    }
}
</style>
