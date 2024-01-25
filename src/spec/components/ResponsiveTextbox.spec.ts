import { describe, expect, it } from "vitest";
import ResponsiveTextboxVue from "../../components/ResponsiveTextbox.vue";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";


describe("Responsive Textbox Tests", () => {
  const wrapper = mount(ResponsiveTextboxVue, {
    props: {
      modelValue: "Hah!",
      "onUpdate:modelValue": (e: any) => ({modelValue: e})
    }
  })
  it("Should update it's value from props", () => {
    const input = wrapper.find("input")
    expect(input.element.value).toBe("Hah!")
  })

  it("Should update text reactively", async () => {
    const input = wrapper.find("input")

    input.setValue("Wahoo!")

    expect(input.element.value).toBe("Wahoo!")
  })

  it("Should be good for valid text", async () => {
    const input = wrapper.find("input")
    input.setValue("vue")
    expect(input.classes()).toContain("good-text")
  })

  it("Should be bad for invalid text", async () => {
    wrapper.setProps({invalid: true})
    const input = wrapper.find("input")

    await nextTick()
    expect(input.classes()).toContain("bad-text")
  })
})