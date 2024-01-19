<script setup lang="ts">
import TableItem from "../components/TableItem.vue";
import { computed, onMounted, ref } from "vue";
import { ResponseData, TaskInfo, debounce } from "../shared";
import {
  deletePost,
  getPosts,
  postPost,
  updatePost,
} from "../util/HttpRequests";
import useVuelidate from "@vuelidate/core";
import { textBoxValidationRules } from "../util/Validators";

const DEBOUNCE_TIME = 50;

let oldGet: ResponseData[]; // Keep a backup to restore from


const sortCheckbox = ref(true);
const completedCheckbox = ref(false);
const todoData = ref<ResponseData[]>([]);
const filterInput = ref("");

const textInput = ref("");

const validator = useVuelidate(textBoxValidationRules, {textbox: textInput})

const todoFiltered = computed(() => {
  return [...todoData.value].filter((value) => {
    // Copy or we end up blowing the stack
    return value.todoName
      .toLowerCase()
      .includes(filterInput.value.toLowerCase());
  });
});

const filterCompleted = computed(() => {
  return todoFiltered.value.reduce((filtered: ResponseData[], current) => {
    // Copy or we end up blowing the stack
    if (current.isComplete) {
      filtered.push(current);
    }
    return filtered;
  }, []);
});

const todoSorted = computed(() => {
  const toSort = !completedCheckbox.value
    ? todoFiltered.value
    : filterCompleted.value;
  const sorted = toSort.sort(
    // Don't need copy here
    (a: ResponseData, b: ResponseData) => {
      if (a.todoName > b.todoName) {
        return 1;
      } else if (a.todoName < b.todoName) {
        return -1;
      } else {
        return 0;
      }
    }
  );
  return sortCheckbox.value ? sorted : sorted.reverse();
});


async function deleteUpdate(event: TaskInfo) {
  try {
    await deletePost(event);
    await debouncedUpdatePosts();
  } catch (error) {
    console.dir(error);
  }
}

async function addRequest() {
  validator.value.$touch()
  if (validator.value.textbox.$error) {
    alert("Please check your input!")
    return
  }
  try {
    postPost({
      _id: "",
      todoName: textInput.value,
      isComplete: false,
    });
    await debouncedUpdatePosts();
  } catch (error) {
    console.dir(error);
  }
  textInput.value = "";
}

async function updatePosts() {
  try {
    const { data: response } = await getPosts();
    oldGet = response.data;
    todoData.value = oldGet;
  } catch (error) {
    todoData.value = oldGet; // reset state
  }
}

const debouncedUpdatePosts = debounce(updatePosts, DEBOUNCE_TIME)

async function updateCheckmark(event: TaskInfo) {
  await updatePost(event);
  await updatePosts();
}

onMounted(() => {
  updatePosts()
});
</script>

<template>
  <div class="flex-container">
    <div class="flex-add">
      <input
        @keypress.enter="addRequest"
        placeholder="Todo..."
        type="text"
        v-model="textInput"
      />
      <button @click="addRequest" class="add-button">Add</button>
    </div>

    <table>
      <tr>
        <td class="flex-sort">
          <input type="text" placeholder="filter" v-model="filterInput" />
          <div>
            <h5>Sort Descending</h5>
            <input type="checkbox" v-model="sortCheckbox" />
          </div>
        </td>
        <td>
          <h5>completed</h5>
          <input type="checkbox" v-model="completedCheckbox" />
        </td>
        <td>
          <button @click="debouncedUpdatePosts">Refresh</button>
        </td>
      </tr>

      <tr>
        <th>Task</th>
        <th>Completed</th>
        <th>Delete?</th>
      </tr>

      <TableItem
        v-for="item of todoSorted"
        :key="item._id"
        :_id="item._id"
        :is-complete="item.isComplete"
        :todo-name="item.todoName"
        @delete-event="deleteUpdate"
        @update-event="updateCheckmark"
      ></TableItem>
    </table>
  </div>
</template>

<style>
.flex-add {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.flex-container {
  display: flex;
  align-items: center;
  flex-flow: column;
}

.flex-sort {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

table {
  width: 50%;
}

.add-button {
  margin-left: 5%;
}

.table-text {
  display: flex;
  justify-content: left;
}

.flex-child {
  flex: 1;
  margin: 10px;
}

input[type="text"] {
  height: 1em;
  margin: 5px;
}
</style>
