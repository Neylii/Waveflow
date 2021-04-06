<template>
    <div class="top3">
        <div class="info-selection-box">
            <div class="info-box">
                <TopInfo title="Topp 3" infotext="Se vilka tre artiser som är mest spelade på Sveriges Radio sorterat på år och vecka."/>
            </div>
            <div class="select-date-box">
                <div class="weekyear">
                    <year-week-select @year="setYear" @week="setWeek" />
                    <div class="button-container">
                        <input type="button" value="Sök" class="search-button arimo-font" @click="addArtistsToList()" />
                    </div>
                </div>
            </div>
        </div>

        <div class="artist-bubble-box">
            <div class="bubble-container">
                <bubble class="bubbles" v-for="artist in topThreeArtists" :key="artist" :artistName="artist.artist">{{
                    artist
                }}</bubble>
            </div>
        </div>
    </div>
</template>

<script>
import Bubble from "../components/ArtistBubble"
import yearWeekSelect from "../components/YearWeekSelect"
import TopInfo from "../components/TopInfo"

export default {
    components: {
        Bubble,
        yearWeekSelect,
        TopInfo
    },
    data() {
        return {
            topThreeArtists: [],
            year: 2021,
            week: 1,
            showNoMatches: false,
        }
    },
    name: "Top3",

    methods: {
        // Updates the year variable to the users selection. Value is sent from YearWeekSelect-component.
        setYear(value) {
            this.year = value
        },

        // Updates the week variable to the users selection. Value is sent from YearWeekSelect-component.
        setWeek(value) {
            this.week = value
        },

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
    display: flex;
    width: 100%;
    font-family: Armata;
    font-style: normal;
    font-weight: normal;
    color: #ffffff;
    justify-content: center;
}

.bubble-container {
    justify-content: center;
}

.bubbles {
    display: flex;
}

.top3 {
    display: flex;
    flex-direction: column;
    height: 100vh;
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
    margin-top: 2%;
    height: 2.5em;
    width: 100%;
    justify-content: center;
}

.search-button {
    color: #145f6d;
    height: 48px;
    width: 6em;
    border: 1px solid #84c1cc;
    border-radius: 25px;
    font-size: 16px;
    font-weight: bold;
}

/* For bigger screens */
@media screen and (min-width: 768px) {
    .top3 {
        display: grid;
        grid-template-columns: 5fr 6fr;
        grid-template-rows: 1fr;
        width: 100%;
    }

    .info-box {
        flex-direction: column;
    }

    .search-button {
        width: 9em;
    }
}
</style>