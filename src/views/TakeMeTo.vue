<template>
    <div id="takemeto">
        <div class="container">
            <div class="left">
                <div class="info">
                    <div><Sectiontitle msg="Låtlistan" /></div>
                    <div class="infobox"><Infobox msg="Välj datum och se en mix av låtar som spelats på din valda radiokanal" /></div>
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
                    <input type="date" v-model="inputDate" />
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
/* for smallest screens */
#takemeto {
    display: flex;
    flex-direction: column;
    padding-bottom: 5em;
    min-height: 90vh;
    color: #ffffff;
}

.container {
    display: flex;
    margin-bottom: 2em;
}

.left {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.info {
    display: flex;
    flex-direction: row;
    min-height: 20%;
    transform: scale(0.8);
}

.lefttop {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.leftbottom {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1em;
    text-align: center;
    margin-left: -2em;
    margin-right: -2em;
}

#channelcontainer {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5em;
    margin-top: 1em;
    /* transform: scale(0.8); */
    margin-left: 1em;
}

.date {
    font-style: Armata;
    display: flex;
    flex-direction: row;
    margin-left: 3em;
    margin-right: 3em;
    margin-top: 1em;
    margin-bottom: -3em;
    justify-content: center;
    flex-wrap: wrap;
    transform: scale(1.2);
}

.description {
    display: none;
}

.right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    margin-right: 2em;
    margin-left: 2em;
}

.songbox {
    background: rgba(20, 95, 109, 0.3);
    border: 2px solid #84c1cc;
    box-sizing: border-box;
    border-radius: 10px;
    transform: scale(0.9);
}

#songlist > li {
    display: flex;
    align-items: flex-end;
    color: #ffffff;
    font-family: Arimo;
    list-style-type: none;
    padding: 0.2em;

    margin: 1em;
    text-align: start;
}

@media screen and (min-width: 576px) {
    .songbox {
        transform: scale(1);
    }

    .info {
        transform: scale(1);
    }
}

/* For medium screens */
@media screen and (min-width: 700px) {
    #takemeto {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        margin-left: -2em;
        transform: scale(0.8);
    }

    .info {
        display: grid;
    }

    .infobox {
        transform: scale(0.9);
    }

    .description {
        display: initial;
        font-size: large;
    }

    #channelcontainer {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1fr;
        transform: scale(0.8);
    }

    .songbox {
        background: rgba(20, 95, 109, 0.3);
        padding: 2.15em;
        border: 2px solid #84c1cc;
        border-radius: 10px;
    }

    #songlist > li {
        display: flex;
        align-items: flex-end;
        color: #ffffff;
        font-family: Arimo;
        font-size: x-large;
        list-style-type: none;
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
            transform: scale(0.8);
        }


    }
}
</style>
