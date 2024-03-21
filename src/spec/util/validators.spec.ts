import { describe, expect, it } from "vitest";
import { containsVue, noSymbols } from "../../util/validators";

const goodTest = "Vue is awesome"
const badTest = "Bad news everyone!"
const symbolCheck = "~"
const vueCheck = "vuE"

describe("No symbols validation", () => {
  it("Should return false for text containing symbols", () =>{
    
    expect(noSymbols.$validator(symbolCheck, null, null)).toBeFalsy()
    expect(noSymbols.$validator(badTest, null, null)).toBeFalsy()
  })

  it("Should return true for symbol-less text", () => {
    expect(noSymbols.$validator(goodTest, null, null)).toBeTruthy()
  })
})

describe("Vue check validation", () => {
  it("Should return false for text without 'vue'", () => {
    expect(containsVue.$validator(badTest, null, null)).toBeFalsy()
    expect(containsVue.$validator(symbolCheck, null, null)).toBeFalsy()
  })
  
  it("Should return true for text containing any variation of 'vue'", () =>{
    expect(containsVue.$validator(goodTest, null, null)).toBeTruthy()
    expect(containsVue.$validator(vueCheck, null, null)).toBeTruthy()
  })
})