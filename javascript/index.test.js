const rewire = require("rewire")
const index = rewire("./index")
const demo = index.__get__("demo")
const getCopyright = index.__get__("getCopyright")
// @ponicode
describe("demo", () => {
    test("0", () => {
        let callFunction = () => {
            demo()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getCopyright", () => {
    test("0", () => {
        let callFunction = () => {
            getCopyright()
        }
    
        expect(callFunction).not.toThrow()
    })
})
