<template>
    <div class="takeme">
        <div class="leftbox">
            <Infobox msg="Se vilka låtar som var mest populära på en kanal vid en viss  tidpunkt." />

            <div class="input">
                <Sectiontitle msg="Take me to" />

                <div class="channelcontainer">
                    <label for="channel">Välj en kanal<br /></label>
                    <div>
                        <label for="chP1"><img src="P1.png" class="imgsize"/></label>
                        <input type="radio" value="P1" id="chP1" v-model="inputChannel" checked />
                    </div>
                    <div>
                        <label for="chP2"><img src="P2.png"/></label>
                        <input type="radio" value="P2" id="chP2" v-model="inputChannel" />
                    </div>
                    <div>
                        <label for="chP3"><img src="P3.png"/></label>
                        <input type="radio" value="P3" id="chP3" v-model="inputChannel" />
                    </div>
                    <div>
                        <label for="chP4"><img src="P4 Göteborg.png"/></label>
                        <input type="radio" value="P4 Göteborg" id="chP4" v-model="inputChannel" />
                    </div>
                </div>

                <div class="date">
                    <label for="takeme">Välj ett datum<br /></label>
                    <input type="date" v-model="inputDate" />
                    <br />
                    <input type="button" id="btnsearch" value="Sök" @click="getSongMix" />
                </div>
            </div>
        </div>

        <div class="rightbox">
            <div class="songbox">
                <ul id="songlist">
                    <li v-for="description in songMix" :key="description">{{ description }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Infobox from "../components/Infobox.vue"
import Sectiontitle from "../components/Sectiontitle.vue"
export default {
    name: "Take me to",
    components: {
        Infobox,
        Sectiontitle,
    },
    data() {
        return {
            inputDate: "",
            inputChannel: "",
            channelForQuery: "",
            channelID: [],
            songMix: [],
        }
    },
    mounted() {
        this.getChannelId()
    },
    methods: {
        async getChannelId() {
            let response = await fetch("https://api.sr.se/api/v2/channels?format=json")
            let result = await response.json()

            for (const channel of result.channels) {
                if (channel.name === "P1") {
                    this.channelID.push({ name: channel.name, id: channel.id })
                } else if (channel.name === "P2") {
                    this.channelID.push({ name: channel.name, id: channel.id })
                } else if (channel.name === "P3") {
                    this.channelID.push({ name: channel.name, id: channel.id })
                } else if (channel.name === "P4 Göteborg") {
                    this.channelID.push({ name: channel.name, id: channel.id })
                }
            }
            console.log(this.channelID)
        },

        channelCheck() {
            for (const channel of this.channelID) {
                if (channel.name === this.inputChannel) {
                    this.channelForQuery = channel.id
                }
            }
        },

        async getSongMix() {
            //checks which channel the user chose.
            this.channelCheck()

            //clears the list each time the function is called
            this.songMix = []
            let json = await this.fetchIt()

            // If less than or equal to 6 songs in json, print out the songs.
            if (json.song.length <= 6) {
                for (let i = 0; i < json.song.length; i++) {
                    this.songMix.push(json.song[i].description)
                }
                // If more than 6 songs in json, take 6 songs at random
            } else {
                for (let i = 0; i < 6; i++) {
                    this.addSong(json)

                    // Check for duplicates
                    while (this.checkDuplicates(this.songMix)) {
                        this.refillSongs(json)
                    }
                }
            }
        },

        addSong(json) {
            let randomIndex = Math.floor(Math.random() * json.song.length)
            this.songMix.push(json.song[randomIndex].description)
        },

        checkDuplicates(array) {
            let noDup = new Set(array)

            if (array.length !== noDup.size) {
                return true
            } else {
                return false
            }
        },

        refillSongs(json) {
            let uniqSongs = new Set(this.songMix)
            do {
                this.songMix = [...uniqSongs]
                let randomIndex = Math.floor(Math.random() * json.song.length)
                this.songMix.push(json.song[randomIndex].description)
                console.log("change")
            } while (this.songMix.length > 7)
        },

        async fetchIt() {
            let query = `id=${this.channelForQuery}&startdatetime=${this.inputDate}&format=json`
            let response = await fetch(`https://api.sr.se/api/v2/playlists/getplaylistbychannelid?${query}`)
            if (!response.ok) {
                throw new Error(response.status + " " + response.statusText)
            } else {
                let json = await response.json()
                return json
            }
        },
    },
}
</script>

<style scoped>
.takeme {
    display: flex;
    flex-direction: column;
}

.infobox {
    background-color: rgb(219, 224, 144);
}

.input {
    display: flex;
    flex-direction: column;
    margin-left: 3em;
    margin-right: 3em;
    margin-top: 1em;
    margin-bottom: 1em;
}

.channelcontainer {
    display: flex;
    flex-direction: row;
    align-items: center;
}

img {
    height: 100px;
    width: 100px;
}

input[type="radio"] {
    height: 25px;
    width: 25px;
    padding: 5em;
    margin-top: 0;
    margin-left: 0;
}

.date {
    margin-bottom: 0.5em;
}

#btnsearch {
    margin-top: 0.5em;
    border-radius: 0.5em;
}

.songbox {
    border-top: solid 0.1em grey;
}

#songlist > li {
    margin-bottom: 1em;
    list-style-type: circle;
    text-align: start;
}

/* For bigger screens */
@media screen and (min-width: 700px) {
    .takeme {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        width: 100%;
    }

    .channelcontainer {
        max-width: 100%;
        height: auto;
    }
}
</style>
