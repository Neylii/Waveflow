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

                <div class="date">
                    <DatePicker :startDate="startDate" :today="today" />
                    <input type="button" id="btn" value="Sök" @click="getSongMix" />
                </div>
                <div v-if="nochannel">Välj kanal först!</div>
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
import DatePicker from "../components/DatePicker.vue"
import TopInfo from "../components/TopInfo.vue"
import Channel from "../components/Channel.vue"
export default {
    name: "Take me to",
    components: {
        DatePicker,
        TopInfo,
        Channel,
    },
    data() {
        return {
            inputDate: "",
            inputChannel: "",
            nochannel: false,
            startDate: "",
            today: "",
            channelForQuery: "",
            channelID: [],
            songMix: [],
        }
    },
    mounted() {
        this.getChannelId()
        this.updateDate()
        this.channelCheck()
    },
    methods: {
        /**
         * Fetch desired channel ID's from SR API.
         * Saves the name and ID of the channels into an array.
         */
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

        /**
         * Set the start date for calendar as well as the end date to todays date.
         */
        updateDate() {
            this.startDate = new Date("2011-01-01")
            this.today = new Date()
        },

        /**
         * Function is called when user clicks the search button.
         * Calls other functions; check channel of users choice, fetches songs from
         * SR API and adds either 6 or 6 random songs in an array to show the user.
         */
        async getSongMix() {
            // First checks if user did not chose a channel.
            if (this.inputChannel.length === 0) {
                this.nochannel = true
            } else {
                this.nochannel = false
                //checks which channel the user chose.
                this.channelCheck()

                //clears the array each time the function is called
                this.songMix = []
                let json = await this.fetchIt()

                // If less than or equal to 6 songs in json, print out the songs.
                if (json.song.length <= 6) {
                    for (let i = 0; i < json.song.length; i++) {
                        this.songMix.push(json.song[i].description)
                    }
                } else {
                    // If more than 6 songs in json, take 6 songs at random
                    for (let i = 0; i < 6; i++) {
                        this.addRandomSong(json)

                        // Check for duplicates, if duplicate are found, calls refillSongs
                        while (this.checkDuplicates(this.songMix)) {
                            this.refillSongs(json)
                        }
                    }
                }
            }
        },

        /**
         * Checks if the channel the user choose matches any in channelID array
         * and then takes the ID of that channel and saves it in channelForQuery for later use.
         */
        channelCheck() {
            for (const channel of this.channelID) {
                if (channel.name === this.inputChannel) {
                    this.channelForQuery = channel.id
                }
            }
        },

        /**
         * Adds the song description from json into the songMix array.
         * @param json - Json song to be added.
         */
        addRandomSong(json) {
            let randomIndex = Math.floor(Math.random() * json.song.length)
            this.songMix.push(json.song[randomIndex].description)
        },

        /**
         * Takes in array and make it into a set to be able to check for duplicates.
         * @param array - Array to check for duplicates.
         * @return true if duplicates are found. Otherwise return false.
         */
        checkDuplicates(array) {
            let noDup = new Set(array)

            if (array.length !== noDup.size) {
                return true
            } else {
                return false
            }
        },

        /**
         * Makes songMix into a set to take away duplicates,
         * then back into an array and refill with another song until songMix have 6 songs.
         * @param json - song to be added in array
         */
        refillSongs(json) {
            let uniqSongs = new Set(this.songMix)
            do {
                this.songMix = [...uniqSongs]
                this.addRandomSong(json)
            } while (this.songMix.length > 7)
        },

        /**
         * Fetches json from SR API
         * @return json
         */
        async fetchIt() {
            let query = `id=${this.channelForQuery}&startdatetime=${this.inputDate}&format=json`
            let response = await fetch(`https://api.sr.se/api/v2/playlists/getplaylistbychannelid?${query}`)
            try {
                if (!response.ok) {
                    throw new Error(response.status + " " + response.statusText)
                } else {
                    let json = await response.json()
                    return json
                }
            } catch (error) {
                console.log(error)
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
    height: 3em;
    cursor: pointer;
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
            transform: scale(1.1);
        }
    }
}
</style>
