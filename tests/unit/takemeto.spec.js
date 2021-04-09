import { expect } from "chai"
import fetchMock from "fetch-mock/es5/server"
import { shallowMount } from '@vue/test-utils'
import TakeMeTo from "@/views/TakeMeTo.vue"

/**
 * Test TakeMeTo functions
 */
describe("TakeMeTo.vue", () => {
    before(() => {
        fetchMock.get("https://api.sr.se/api/v2/channels?format=json", { channels: [ { name: "P1", id: 132 } ]})
    })

    it("checks for a proper channel ID", async () => {
        const wrapper = shallowMount(TakeMeTo)
        // Call the function getChannelId() so that it will update the channelID variable
        await wrapper.vm.getChannelId()
        expect(wrapper.vm.channelID[0].id).to.equal(132)
        expect(fetchMock.called("https://api.sr.se/api/v2/channels?format=json")).to.be.true
    })

    after(() => fetchMock.restore())
})
