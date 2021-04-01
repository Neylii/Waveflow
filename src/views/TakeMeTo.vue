<template>
    <div class="outer">
        <div class="leftbox">
            <div class="info">
                <div><Sectiontitle msg="Låtlistan" /></div>
                <div><Infobox msg="En mix av låtar som var mest populära på en kanal vid en viss tidpunkt" /></div>
            </div>

            <div class="input">
                <div>Välj kanal</div>
                <div class="channelcontainer">
                    <div><Channel channel="P1" channelID="chP1" /></div>
                    <div><Channel channel="P2" channelID="chP2" /></div>
                    <div><Channel channel="P3" channelID="chP3" /></div>
                    <div><Channel channel="P4 Göteborg" channelID="chP4" /></div>
                </div>

                <div class="date">
                    <label for="takeme">Välj datum<br /></label>
                    <input type="date" v-model="inputDate" />
                    <input type="button" id="btn" value="Sök" @click="getSongMix" />
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
import Channel from "../components/Channel.vue"
export default {
    name: "Take me to",
    components: {
        Infobox,
        Sectiontitle,
        Channel,
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
.outer {
    display: flex;
    flex-direction: column;
    padding-bottom: 5em;
    min-height: 90vh;
    color: #ffffff;
}

.info {
    display: flex;
    flex-direction: row;
}

.input {
    display: flex;
    flex-direction: column;
    margin-left: 3em;
    margin-right: 3em;
    margin-top: 1em;
    margin-bottom: 1em;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1em;
    flex-direction: column;
}

#btn:hover {
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

.channelcontainer {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
}

img {
    height: 100px;
    width: 100px;
}

input[type="radio"] {
    height: 2em;
    width: 2em;
    padding: 5em;
    margin-top: 0;
    margin-left: 0;
}

/* just to make it easier to see
/* .songbox {
    border-top: solid grey;
} */

#songlist > li {
    margin-top: 3em;
    margin-left: 3em;
    list-style-type: none;
    text-align: start;
    font-size: large;
}

/* For bigger screens */
@media screen and (min-width: 700px) {
    .outer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
    }

    .info {
        display: grid;
    }

    .channelcontainer {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
}
</style>
