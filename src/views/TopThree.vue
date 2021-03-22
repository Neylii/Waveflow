<template>
    <div class="top3">
        <div class="leftbox">
            <Infobox msg="Se vilka låtar som var mest populära på en kanal vid en viss tidpunkt." />

            <div class="weekyear">
                <label for="week">År Vecka</label>
                <input type="button" @click="addArtistsToList(2016, 25)" />
            </div>
        </div>

        <div class="rightbox">
            <div class="rbtitle">TOPP 3</div>

            <div>
                <bubble v-for="artist in topThreeArtists" :key="artist" :artistName="artist.artist">{{
                    artist
                }}</bubble>
            </div>
        </div>
    </div>
</template>

<script>
import Infobox from "../components/Infobox"
import Bubble from "../components/ArtistBubble"
export default {
    components: {
        Bubble,
        Infobox,
    },
    data() {
        return {
            topThreeArtists: [],
        }
    },
    name: "Top3",

    methods: {
        addArtistToMap(artistMap, artist) {
            let value = 0
            if (artistMap.has(artist)) {
                value = artistMap.get(artist) + 1
                artistMap.set(artist, value)
            } else {
                artistMap.set(artist, 1)
            }
        },

        formatDate(date) {
            var d = new Date(date),
                month = "" + (d.getMonth() + 1),
                day = "" + d.getDate(),
                year = d.getFullYear()

            if (month.length < 2) month = "0" + month
            if (day.length < 2) day = "0" + day

            return [year, month, day].join("-")
        },

        getDateOfISOWeek(year, week, index) {
            var simple = new Date(year, 0, 1 + (week - 1) * 7)
            var dow = simple.getDay()
            var ISOweekStart = simple
            if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1 + index)
            else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay() + index)
            return this.formatDate(ISOweekStart)
        },

        async getSongs(date) {
            let json
            try {
                let resp = await fetch(
                    `http://api.sr.se/api/v2/playlists/getplaylistbychannelid?id=164&startdatetime=${date}&size=5000&format=json`
                )
                if (!resp.ok) {
                    throw new Error(resp.status)
                }
                json = await resp.json()
            } catch (err) {
                console.log(err)
                alert("Something went wrong.")
            }
            if (json !== undefined) {
                return json.song
            }
        },

        async addArtistsToList(year, week) {
            let artistMap = new Map()
            let artistList = []
            for (let i = 0; i < 7; i++) {
                let songs = await this.getSongs(this.getDateOfISOWeek(year, week, i))
                for (const song of songs) {
                    if (song.artist.includes(",") || song.artist.includes("&")) {
                        let artistsInCollab = song.artist.replaceAll("&", ",").split(",")
                        for (let artist of artistsInCollab) {
                            artist = artist.trim()
                            this.addArtistToMap(artistMap, artist)
                        }
                    } else {
                        this.addArtistToMap(artistMap, song.artist)
                    }
                }
            }
            for (const [key, value] of artistMap.entries()) {
                artistList.push({ artist: key, plays: value })
            }
            artistList.sort(function(a, b) {
                return b.plays - a.plays
            })
            this.topThreeArtists = [artistList[0], artistList[1], artistList[2]]
        },
    },
}
</script>

<style scoped>
.rightbox {
    position: relative;
}

.top3 {
    background-color: rgb(178, 223, 223);
    display: flex;
    flex-direction: column;
}

.infobox {
    background-color: rgb(71, 182, 182);
}

.weekyear {
    display: flex;
    flex-direction: column;
    margin-left: 3em;
    margin-right: 3em;
}

div + #bubble {
    background: rgba(0, 194, 129, 0.486);
    height: 125px;
    width: 125px;
    margin-left: 41%;
    margin-top: 18%;
}

div + #bubble + #bubble {
    background: rgba(255, 251, 0, 0.39);
    height: 100px;
    width: 100px;
    margin-left: 25%;
    margin-top: 31%;
}

/* For bigger screens */
@media screen and (min-width: 700px) {
    .top3 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        width: 100%;
    }
}
</style>
