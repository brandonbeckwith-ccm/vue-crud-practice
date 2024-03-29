<script setup lang="ts">
import TodoItem from "../components/TodoItem.vue";
import { computed, onMounted, ref } from "vue";
import { DataResponse, TaskInfo } from "../util/types";
import { debounce } from "../util/shared";
import {
  deletePost,
  getPosts,
  postPost,
  updatePost,
} from "../util/httpRequests";
import ResponsiveTextbox from "../components/ResponsiveTextbox.vue";
import AddTodoBar from "../components/AddTodoBar.vue";
import { useRouter } from "vue-router";
import IconButton from "../components/IconButton.vue";

const DEBOUNCE_TIME = 250;

let oldGet: DataResponse[]; // Keep a backup to restore from
const router = useRouter();

const sortingOrder = ref<SortOptions>("task_dsc");

const todoData = ref<DataResponse[]>([]);

const filterInput = ref("");
const addText = ref("");

const sortingOptions = [
  { text: "Tasks (dsc)", value: "task_dsc" },
  { text: "Tasks (asc)", value: "task_asc" },
  { text: "Complete", value: "complete" },
  { text: "Incomplete", value: "incomplete" },
] as const;
type SortOptions = (typeof sortingOptions)[number]["value"];

// Copy or we end up blowing the stack
const todoFiltered = computed(() =>
  todoData.value.filter((value) =>
    value.todoName.toLowerCase().includes(filterInput.value.toLowerCase())
  )
);

const todoSorted = computed(() => {
  const taskSort = (a: DataResponse, b: DataResponse) => {
    return a.todoName.localeCompare(b.todoName); // Thanks Ethan!
  };

  const completeSort = (a: DataResponse, b: DataResponse) => {
    return +b.isComplete - +a.isComplete;
  };

  // Required so vue updates.
  // Sort / reverse modify the original array
  // which doesn't register as a change!
  const sorting = [...todoFiltered.value];

  switch (sortingOrder.value) {
    case "task_asc":
      return sorting.sort(taskSort).reverse();
    case "task_dsc":
      return sorting.sort(taskSort);
    case "complete":
      return sorting.sort(completeSort);
    case "incomplete":
      return sorting.sort(completeSort).reverse();
  }
});

async function addRequest(invalid: boolean) {
  if (addText.value === "") {
    router.push({
      path: "add",
    });
  }

  if (invalid) {
    return;
  }

  const task: TaskInfo = {
    _id: "",
    todoName: addText.value,
    isComplete: false,
  };

  if (await postPost(task)) {
    addText.value = "";
  } else {
    alert("Failed to post!");
  }

  await debouncedUpdatePosts();
}

async function deleteUpdate(event: TaskInfo) {
  if (!(await deletePost(event))) {
    alert("Failed to delete todo!");
  }
  await debouncedUpdatePosts();
}

async function updatePosts() {
  const task = await getPosts();
  if (task) {
    oldGet = task.data;
    todoData.value = oldGet;
  } else {
    todoData.value = oldGet;
  }
}

const debouncedUpdatePosts = debounce(updatePosts, DEBOUNCE_TIME);
const debouncedAddRequest = debounce(addRequest, DEBOUNCE_TIME);

async function updateCheckmark(event: TaskInfo) {
  if (!(await updatePost(event))) {
    alert("Failed to update completion status!");
  }
  await debouncedUpdatePosts();
}

onMounted(() => {
  updatePosts();
});
</script>

<template>
  <div class="flex-card container-card">
    <AddTodoBar v-model="addText" @submit="debouncedAddRequest"></AddTodoBar>

    <div class="flex-card control-card">
      <ResponsiveTextbox
        placeholder="Search"
        class="less-aggressive-textbox"
        v-model="filterInput"
      />

      <select name="sorting-orders" v-model="sortingOrder">
        <option v-for="item of sortingOptions" :value="item.value">
          {{ item.text }}
        </option>
      </select>

      <IconButton class="refresh-button" @click="debouncedUpdatePosts">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style="fill: #ffffff"
        >
          <path
            d="M 7.1601562 3 L 8.7617188 5 L 18 5 C 18.551 5 19 5.448 19 6 L 19 15 L 16 15 L 20 20 L 24 15 L 21 15 L 21 6 C 21 4.346 19.654 3 18 3 L 7.1601562 3 z M 4 4 L 0 9 L 3 9 L 3 18 C 3 19.654 4.346 21 6 21 L 16.839844 21 L 15.238281 19 L 6 19 C 5.449 19 5 18.552 5 18 L 5 9 L 8 9 L 4 4 z"
          ></path>
        </svg>
      </IconButton>
    </div>

    <div class="flex-list list-card">
      <TransitionGroup name="list">
        <TodoItem
          v-for="item of todoSorted"
          :key="item._id"
          :_id="item._id"
          :is-complete="item.isComplete"
          :todo-name="item.todoName"
          @delete-event="deleteUpdate"
          @update-event="updateCheckmark"
        ></TodoItem
      ></TransitionGroup>
    </div>
  </div>
</template>

<style>
.filter-text {
  margin-left: 1em;
  flex-grow: 10;
}

.flex-add {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.base-button:first-of-type {
  margin-left: 0.5em;
}

.base-button:last-of-type {
  margin-right: 0.6em;
}

.base-button {
  max-width: 50px;
  max-height: 50px;
  border-radius: 10px;
  transition: 0.25s;
  border-color: transparent;
}

.base-button:active {
  transform: scale(0.85);
  box-shadow: 3px, 2px, 22px, 1px rgba(0, 0, 0, 0.5);
}

.list-enter-active {
  animation: fade-in 0.75s ease-in-out;
}

.list-leave-active {
  animation: fade-in 0.75s ease-in-out reverse;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    transform: translateX(0px);
  }
}

.add-button {
  min-width: 24pt;
  min-height: 24pt;
  margin-right: 1.5em;
  margin-left: 0em;
  background-color: #333399;
}

.add-button:hover {
  background-color: #4444cc;
}

.refresh-button {
  margin-left: 5px;
  background-color: #55aa55;
}

.refresh-button:hover {
  background-color: #66bb66;
}

.control-card {
  min-width: 42vw;
  background-color: #222;
  justify-items: space-evenly;
  margin-left: 1vw;
  margin-right: 1vw;
  margin-bottom: 0vw;
  max-height: 6vh;
}

.less-aggressive-textbox {
  flex-grow: 1;
  flex-shrink: 0;
  width: 1vw;
  margin-left: 1em;
  margin-right: 1em;
}

.list-card {
  background-color: #222;
  margin: 1vw;
  max-height: 55vh;
  min-width: 40vw;
  padding: 0%;
  overflow-y: scroll;
  justify-content: flex-start;
}

.container-card {
  align-items: center;
  max-width: 47vw;
  background-color: #111;
}

.flex-sort {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

select {
  border-radius: 10px;
  min-width: 5em;
  min-height: 24px;
  border-color: transparent;
  margin-right: 1em;
}

table {
  width: 50%;
}

.add-button {
  margin-left: 1em;
}

.table-text {
  display: flex;
  justify-content: left;
}

.flex-child {
  flex: 1;
  margin: 10px;
}
</style>
../util/httpRequests
