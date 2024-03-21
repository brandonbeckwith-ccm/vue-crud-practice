import { describe, expect, it, vi } from "vitest";
import TodoItemVue from "../../components/TodoItem.vue";
import { flushPromises, mount } from "@vue/test-utils";
import { useRouter } from "vue-router";

const mockPush = vi.fn();

vi.mock("vue-router", () => ({
  useRouter: vi.fn(() => {
    push: mockPush;
  }),
}));

describe("Todo Item row tests", () => {
  it("Should render the todo passed as a prop", async () => {
    const wrapper = mount(TodoItemVue, {
      props: {
        _id: "asdf",
        todoName: "roflcopter",
        isComplete: true,
      },
    });
    const input = wrapper.find("input");
    expect(input.element.value).toBe("roflcopter");
  });

  it("Should emit a 'deleteEvent' request when the delete button is clicked", async () => {
    const wrapper = mount(TodoItemVue, {
      props: {
        _id: "asdf",
        todoName: "roflcopter",
        isComplete: true,
      },
    });
    const deleteButton = wrapper.find(".delete-button");
    deleteButton.trigger("click");
    await flushPromises();
    expect(wrapper.emitted("deleteEvent")).toBeTruthy();
  });

  it("Should redirect to an edit page with an id when edit is clicked", async () => {
    const push = vi.fn();
    vi.mocked(useRouter, true).mockImplementation(() => ({ push } as any));

    const wrapper = mount(TodoItemVue, {
      props: {
        _id: "asdf",
        todoName: "roflcopter",
        isComplete: true,
      },
    });

    const editButton = wrapper.find(".edit-button");

    await editButton.trigger("click");
    expect(push).toHaveBeenCalledWith({ path: "edit", query: { id: "asdf" } });
  });
});
