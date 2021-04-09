import { expect } from "chai"
import { shallowMount } from '@vue/test-utils'
import fetchMock from "fetch-mock/es5/server"
import TopThree from "@/views/TopThree.vue"

/**
 * Test TopThree functions
 */
describe("TopThree.vue", () => {
    before(() => {
        fetchMock.get("https://api.sr.se/api/v2/playlists/getplaylistbychannelid?id=164&startdatetime=2020-01-01&size=5000&format=json", { song: [ { artist: "Billie Eilish" } ]})
    })

    // Test if the getSongs() function returns what is expected of it.
    it("checks for an artist", async () => {
        let song = await TopThree.methods.getSongs("2020-01-01")
        expect(song[0].artist).to.equal("Billie Eilish")
        expect(fetchMock.called("https://api.sr.se/api/v2/playlists/getplaylistbychannelid?id=164&startdatetime=2020-01-01&size=5000&format=json")).to.be.true
    })
    // Test the setYear() function and if the data() variable "year" gets updated.
    it("check if year is updated", () => {
        const wrapper = shallowMount(TopThree)
        wrapper.vm.setYear(2012)
        expect(wrapper.vm.year).to.equal(2012)
    })

    after(() => fetchMock.restore())
})