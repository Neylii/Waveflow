<template>
    <div class="rightnow">
        <div id="container" class="border">
            <div id="left" class="border">
                <Infobox msg="Här kan du visa vad som sänds just nu i de olika kanalerna." />
                <div id="leftbottom" class="border">
                    <div id="radioStationContainer">
                        <Radio-station station="P1" id="132" />
                        <Radio-station station="P2" id="163" />
                        <Radio-station station="P3" id="164" :checked="true" />
                        <Radio-station station="P4 Göteborg" id="212" />
                    </div>
                </div>
            </div>
        </div>
        <div id="right" class="border">
            <div id="righttop">
                <h3 class="textAlignLeft marginLeft">Start</h3>
            </div>
            <div>
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
import Infobox from "../components/Infobox.vue"
import RadioStation from "../components/RadioStation"
import Program from "../components/Program"

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
        Infobox,
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

            do {
                await this.getSingleTablo(
                    `https://api.sr.se/api/v2/scheduledepisodes?channelid=${channelId}&date=${this.getDateFormatter(
                        date
                    )}&size=500&format=json`,
                    tempArray
                )
                date.setDate(date.getDate() + 1)
            } while (tempArray.length < this.numberOfProgramsToShow)

            Array.prototype.push.apply(this.programArrayTemp, tempArray)

            this.programArrayTemp = this.sortArrayOnTime(this.programArrayTemp)
        },

        updateAllChannels() {
            this.programArrayTemp = []
            let checkBoxes = document.getElementsByName("checkBoxStation")

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
    display: flex;
    flex-direction: column;
    padding-bottom: 5em;
    min-height: 100vh;
}

.marginLeft {
    margin-left: 2.3em;
}

#container {
    display: flex;
}

#left {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}
.infobox {
    background-color: rgb(228, 225, 241);
}

#lefttop {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#leftbottom {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1em;
}

#radioStationContainer {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1em;
    margin-top: 1em;
}

#right {
    flex-grow: 1;
    padding-right: 4em;
}

#righttop {
    margin-right: auto;
}

/* For bigger screens */
@media screen and (min-width: 700px) {
    .rightnow {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        width: 100%;
    }

    #radioStationContainer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 4em;
    }
}
</style>
