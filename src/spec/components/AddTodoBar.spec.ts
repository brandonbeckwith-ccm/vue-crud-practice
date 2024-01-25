import { describe, expect, it } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import AddTodoBarVue from "../../components/AddTodoBar.vue";

describe("Add Todo Component Tests", () => {
  it("Emits submit events when clicking the submit button", async () => {
    const wrapper = mount(AddTodoBarVue)
    const button = wrapper.find('button')

    button.trigger('click')
    await flushPromises()

    expect(wrapper.emitted('submit')).toBeTruthy()
  });

  it("Emits submit events when pressing enter in the text field", async () => {
    const wrapper = mount(AddTodoBarVue)
    const input = wrapper.find('input')

    input.trigger('keypress.enter')
    await flushPromises()

    expect(wrapper.emitted('submit')).toBeTruthy()
  })

  it("Returns 'false' on a submission with no errors", async() => {
    const wrapper = mount(AddTodoBarVue)
    const input = wrapper.find('input')

    input.setValue('vue')

    input.trigger('keypress.enter')
    await flushPromises()
    const emitted = wrapper.emitted('submit')

    await flushPromises()
    expect(emitted![0][0]).toBeFalsy()
  })

  it("Returns 'true' on a submission with errors", async() => {
    const wrapper = mount(AddTodoBarVue)
    const input = wrapper.find('input')

    input.setValue('vue!')

    input.trigger('keypress.enter')
    await flushPromises()
    const emitted = wrapper.emitted('submit')

    await flushPromises()
    expect(emitted![0][0]).toBeTruthy()
  })
});
