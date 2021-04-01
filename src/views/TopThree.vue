<template>
    <div class="top3">
        <div class="info-selection-box">
            <div class="info-box">
                <Sectiontitle msg="Topp 3" class="top-three-title" />
                <Infobox
                    msg="Se vilka tre artiser som är mest spelade på Sveriges Radio sorterat på år och vecka."
                    class="description-text"
                />
            </div>
            <div class="select-date-box">
                <div class="weekyear">
                    <div class="selectWeekYear">
                        <input type="text" placeholder="year" class="dateField" v-model="year" />
                        <input type="text" placeholder="week" class="dateField" v-model="week" />
                    </div>
                    <div class="button-container">
                        <input type="button" value="GO" class="go-button" @click="addArtistsToList()" />
                    </div>
                </div>
            </div>
        </div>

        <div class="artist-bubble-box">
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
import Sectiontitle from "../components/Sectiontitle"
export default {
    components: {
        Bubble,
        Infobox,
        Sectiontitle,
    },
    data() {
        return {
            topThreeArtists: [],
            year: null,
            week: null,
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

        getDateOfISOWeek(index) {
            var simple = new Date(this.year, 0, 1 + (this.week - 1) * 7)
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
                    `https://api.sr.se/api/v2/playlists/getplaylistbychannelid?id=164&startdatetime=${date}&size=5000&format=json`
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

        async addArtistsToList() {
            let artistMap = new Map()
            let artistList = []
            for (let i = 0; i < 7; i++) {
                let songs = await this.getSongs(this.getDateOfISOWeek(i))
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
            artistList.sort(function (a, b) {
                return b.plays - a.plays
            })
            this.topThreeArtists = [artistList[0], artistList[1], artistList[2]]
        },
    },
}
</script>

<style scoped>
.artist-bubble-box {
    position: relative;
    width: 100%;
    font-family: Armata;
    font-style: normal;
    font-weight: normal;
    color: #ffffff;
}

.top3 {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
}

.info-selection-box {
    display: flex;
    flex-direction: column;
}

.info-box {
    position: relative;
    display: flex;
    flex-grow: 1;
    align-items: center;
}

.top-three-title {
    display: flex;
    font-size: 2.5em;
    width: 40%;
    justify-content: center;
}

.description-text {
    width: 60%;
    font-family: Armata;
    line-height: 2em;
    font-size: 0.9em;
    color: #ffffff;
}

.select-date-box {
    display: flex;
    flex-direction: row;
    flex-grow: 5;
}

.weekyear {
    display: flex;
    flex-direction: column;
    margin-top: 5%;
    width: 100%;
    align-items: center;
}

.selectWeekYear {
    display: flex;
    height: 3em;
    width: 100%;
    justify-content: space-evenly;
}

.dateField {
    width: 40%;
    height: 100%;
}

.button-container {
    display: flex;
    margin-top: 5%;
    height: 2.5em;
    width: 100%;
    justify-content: center;
}

.go-button {
    height: 3em;
    width: 5em;
}

div + #bubble {
    width: 11em;
    height: 11em;
    left: 2.5em;
    top: 8em;

    background: linear-gradient(180deg, rgba(0, 88, 104, 0.69) 0%, #145f6d 100%);
}

div + #bubble + #bubble {
    width: 9.5em;
    height: 9.5em;
    left: 13.5em;
    top: 15em;

    background: linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%), #84c1cc;
}

/* For bigger screens */
@media screen and (min-width: 700px) {
    .top3 {
        display: grid;
        grid-template-columns: 5fr 6fr;
        grid-template-rows: 1fr;
        width: 100%;
    }
}
</style>