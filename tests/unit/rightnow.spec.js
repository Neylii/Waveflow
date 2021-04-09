import { expect } from "chai"
import RightNow from "@/views/RightNow.vue"

/**
 * Testing RightNow methods
 */
describe("RightNow.vue", () => {
    it("check if added zero when single digit number", () => {
        // addZerosToSingleDigits() should add a zero to a number less than 10.
        const number = RightNow.methods.addZerosToSingleDigits(9)
        expect(number).to.equal("09")
    })
    it("check if zero not added when double digit number", () => {
        // addZerosToSingleDigits() should not add a zero to a number greater than 9.
        const number = RightNow.methods.addZerosToSingleDigits(10)
        expect(number).to.not.equal("010")
    })
})