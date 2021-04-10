<template>
    <div class="top3">
        <div class="info-selection-box">
            <div class="info-box">
                <TopInfo
                    title="Topp 3"
                    infotext="Se vilka tre artiser som är mest spelade på P3 sorterat på år och vecka."
                />
            </div>
            <div class="select-date-box">
                <div class="weekyear">
                    <year-week-select @year="setYear" @week="setWeek" ref="yearWeek" />
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
        TopInfo,
    },
    data() {
        return {
            topThreeArtists: [],
            year: 2021,
            week: 1,
        }
    },
    name: "Top3",

    methods: {
        /**
         * Updates the year variable to the users selection. Value is sent from YearWeekSelect-component.
         */
        setYear(value) {
            this.year = value
        },

        /**
         * Updates the week variable to the users selection. Value is sent from YearWeekSelect-component.
         */
        setWeek(value) {
            this.week = value
        },

        /**
         *  @param artistMap a map of artists
         *  @param artist artist to be put in the map
         * checks if artist is already in the map, and if it is the method adds 1 to that artists value.
         * If artist isn't already in the map, value is set to 1.
         */
        addArtistToMap(artistMap, artist) {
            let value = 0
            if (artistMap.has(artist)) {
                value = artistMap.get(artist) + 1
                artistMap.set(artist, value)
            } else {
                artistMap.set(artist, 1)
            }
        },

        /**
         * @param date a non-formatted date
         * Format the date to match YYYY-mm-dd
         */
        formatDate(date) {
            var d = new Date(date),
                month = "" + (d.getMonth() + 1),
                day = "" + d.getDate(),
                year = d.getFullYear()

            if (month.length < 2) month = "0" + month
            if (day.length < 2) day = "0" + day

            return [year, month, day].join("-")
        },

        /**
         * @param index will add days to the date
         * using data() variables year and week to determine the first date of that specific year/week
         */
        getDateOfISOWeek(index) {
            var simple = new Date(this.year, 0, 1 + (this.week - 1) * 7)
            var dow = simple.getDay()
            var ISOweekStart = simple
            if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1 + index)
            else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay() + index)
            return this.formatDate(ISOweekStart)
        },

        /**
         * @param date is used to search the API for a specific day
         * returns an array of songs from the API
         */
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
            }
            if (json !== undefined) {
                return json.song
            }
        },

        /**
         * calling several methods to add artists to artistMap
         * Push all artists in the map to the artistList in order to sort artists by amount of plays
         * Updating topThreeArtists[] so that it contains the three artists with highest amount of plays
         */
        async addArtistsToList() {
            let currentWeek = this.$refs.yearWeek.getCurrentWeek()
            if (this.year === 2021 && this.week > currentWeek) {
                this.week = currentWeek
            }
            let artistMap = new Map()
            let artistList = []
            for (let i = 0; i < 7; i++) {
                let songs = await this.getSongs(this.getDateOfISOWeek(i))
                for (const song of songs) {
                    if (song.artist) {
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
    cursor: pointer;
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