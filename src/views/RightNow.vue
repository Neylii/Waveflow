<template>
    <div class="rightnow">
        <div id="container" class="border">
            <div id="left" class="border">
                <Infobox msg="Här kan du visa vad som sänds just nu i de olika kanalerna." />
                <div id="leftbottom" class="border">
                    <div id="radioStationContainer">
                        <radio-station station="P1" id="132" />
                        <radio-station station="P2" id="163" />
                        <radio-station station="P3" id="164" :checked="true" />
                        <radio-station station="P4 Göteborg" id="212" />
                    </div>
                </div>
            </div>
        </div>
        <div id="right" class="border">
            <div id="righttop">
                <h3 class="textAlignLeft marginLeft">Start</h3>
            </div>
            <div id="rightbottom">
                <program
                    v-for="program in allPrograms"
                    :key="program"
                    :time="startTime(program.starttimeutc)"
                    :title="program.title"
                    :description="program.description"
                    :imgSrc="program.channel.name + '.png'"
                >
                    {{ program }}
                </program>
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
        }
    },
    components: {
        Infobox,
        RadioStation,
        Program,
    },
    methods: {
        checkTime(i) {
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
            h = this.checkTime(h)
            m = this.checkTime(m)
            return h + ":" + m
        },

        async getTablo(api) {
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

            Array.prototype.push.apply(this.allPrograms, json)

            this.allPrograms = this.allPrograms.sort(function (a, b) {
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
        },

        removeProgramsFromList(id) {
            id = Number(id)
            for (let i = this.allPrograms.length - 1; i >= 0; i--) {
                if (this.allPrograms[i].channel.id === id) {
                    this.allPrograms.splice(i, 1)
                }
            }
        },
    },
    mounted() {
        this.getTablo("http://api.sr.se/api/v2/scheduledepisodes?channelid=164&size=500&format=json")
        console.log(this.allPrograms)
    },
}
</script>

<style scoped>
.rightnow {
    display: flex;
    flex-direction: column;
    padding-bottom: 5em;
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

#rightbottom {
    max-height: 700px;
    overflow-y: auto;
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
