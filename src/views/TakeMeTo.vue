<template>
    <div class="takeme">
        <div class="leftbox">
            <Infobox msg="Se vilka låtar som var mest populära på en kanal vid en viss  tidpunkt." />

            <div class="input">
                <Sectiontitle msg="Take me to" />

                <div class="channel">
                    <label for="channel">Välj en kanal<br /></label>
                    <input type="radio" value="P1" v-model="inputChannel" /> P1
                    <input type="radio" value="P2" v-model="inputChannel" /> P2
                    <input type="radio" value="P3" v-model="inputChannel" /> P3
                </div>

                <div class="date">
                    <label for="takeme">Välj ett datum<br /></label>
                    <input type="date" v-model="inputDate"/>
                    <br />
                    <input type="button" id="btnsearch" value="Sök" @click="getSongMix" />
                </div>
            </div>
        </div>

        <div class="rightbox">
            <div class="rbtitle">{{ inputDate }} mix/låtar på {{ inputChannel }}</div>

            <div class="songbox">
                <ul id="songlist">
                    <li v-for="description in songMix" :key="description">{{ description }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Infobox from '../components/Infobox.vue'
import Sectiontitle from '../components/Sectiontitle.vue'
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

            for (let i = 0; i < 6; i++) {
                let randomIndex = Math.floor(Math.random() * json.song.length)
                this.songMix.push(json.song[randomIndex].description)
            }
        },

        async fetchIt() {
            let query = `id=${this.channelForQuery}&startdatetime=${this.inputDate}&format=json`
            let response = await fetch(
                `https://api.sr.se/api/v2/playlists/getplaylistbychannelid?${query}`
            )
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
    background-color: rgb(234, 235, 191);
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

.channel {
    margin-bottom: 0.5em;
}

.date {
    margin-bottom: 0.5em;
}

#btnsearch {
    margin-top: 0.5em;
    border-radius: 0.5em; 
}

.rbtitle {
    margin-bottom: 0.5em;
    font-size: x-large;
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
}
</style>