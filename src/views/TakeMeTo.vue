<template>
    <div id="takemeto">
        <div class="container">
            <div class="left">
                <div>
                    <TopInfo
                        title="Dagens Mix"
                        infotext="Välj datum och se en mix av låtar som spelats på din valda radiokanal"
                    />
                </div>

                <label for="channel" class="description">Välj kanal<br /></label>
                <div class="leftbottom">
                    <div id="channelcontainer">
                        <div><Channel channel="P1" channelID="chP1" /></div>
                        <div><Channel channel="P2" channelID="chP2" /></div>
                        <div><Channel channel="P3" channelID="chP3" /></div>
                        <div><Channel channel="P4 Göteborg" channelID="chP4" /></div>
                    </div>
                </div>
                <label for="date" class="description">Välj datum<br /></label>
                <div class="date">
                    <input type="date" id="inputdate" v-model="inputDate" min="2011-01-01" :max="today"/>
                    <input type="button" id="btn" value="Sök" @click="getSongMix" />
                </div>
            </div>
        </div>

        <div class="right">
            <div class="songbox">
                <ul id="songlist">
                    <li v-for="description in songMix" :key="description">{{ description }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import TopInfo from "../components/TopInfo.vue"
import Channel from "../components/Channel.vue"
export default {
    name: "Take me to",
    components: {
        TopInfo,
        Channel,
    },
    data() {
        return {
            inputDate: "",
            inputChannel: "",
            today: "",
            channelForQuery: "",
            channelID: [],
            songMix: [],
            text: "Hello Vue.\nThis is a line of text.\nAnother line of text.\n",
        }
    },
    mounted() {
        this.getChannelId()
        this.updateToday()
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
        },

        updateToday() {
            this.today = new Date().toISOString().split("T")[0]
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
/* for smallest screens */
#takemeto {
    display: flex;
    flex-direction: column;
    min-height: 99vh;
}

.container {
    display: flex;
    margin-bottom: 1em;
}

.left {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.leftbottom {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1em;
    text-align: center;
}

#channelcontainer {
    display: flex;
    justify-content: center;
    gap: 0.5em;
}

.date {
    display: flex;
    flex-direction: row;
    margin-top: 1em;
    justify-content: center;
    height: 3em;
}

#btn {
    border-radius: 50%;
    border-color: #84c1cc;
    text-transform: uppercase;
    color: #10505c;
    font-weight: bold;
    letter-spacing: 0.05em;
    width: 3.5em;
    height: 3.5em;
    cursor: pointer;
}

#inputdate {
    text-align: center;
    color: #145F6D;
    font-weight: bold;
    font-size: 1.2em;
    border-radius: 0.6em;
    border-color: #84c1cc;
    text-transform: uppercase;
    box-sizing: border-box;
    outline: 0;
    position: relative;
    width: 14em;
}

input[type="date"]::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
}

.description {
    display: none;
}

.right {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.songbox {
    background: rgba(20, 95, 109, 0.3);
    border: 2px solid #84c1cc;
    box-sizing: border-box;
    border-radius: 10px;
    transform: scale(0.9);
}

#songlist > li {
    list-style-image: url("../assets/star.svg");
    margin: 2em;
    text-align: start;
    font-size: large;
}

/* For medium screens */
@media screen and (min-width: 765px) {
    #takemeto {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
    }

    .description {
        display: initial;
        font-size: large;
    }

    #btn {
        border-radius: 1.5em;
        width: 7em;
    }

    #channelcontainer {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1fr;
        transform: scale(0.9);
    }

    .songbox {
        background: rgba(20, 95, 109, 0.3);
        padding: 2.15em;
        border: 2px solid #84c1cc;
        border-radius: 10px;
        transform: scale(1);
        margin: 4em;
    }

    #songlist > li {
        align-items: flex-end;
        font-size: large;
        padding: 0.3em;
        margin: 1em;
        text-align: start;
    }

    /* For biggest screens */
    @media screen and (min-width: 992px) {
        #channelcontainer {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: 1fr;
        }

        .right {
            align-items: flex-start;
        }

        .songbox {
            margin: 4em;
            transform:scale(1.1)
        }
    }
}
</style>
