<script setup lang="ts">
import axios from "axios";
import TableItem from "./components/TableItem.vue";
import { computed, onMounted, ref } from "vue";
import { TaskInfo, debounce } from "./shared";

// TODO: Add filter
// TODO: Make pretty :3

const BASE_URL = "https://calm-plum-jaguar-tutu.cyclic.app/todos";
type RequestType = "get" | "post" | "put" | "delete";

const DEBOUNCE_TIME = 50;

type ResponseData = {
  createdAt: string;
  updatedAt: string;
} & TaskInfo;

let oldGet: ResponseData[]; // Keep a backup to restore from

const sortCheckbox = ref(true);
const completedCheckbox = ref(false);
const todoData = ref<ResponseData[]>([]);
const filterInput = ref("");

const textInput = ref("");

type Response = {
  code: string;
  data: Array<ResponseData>;
};

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

// There has to be a better way T_T
async function processRequest(requestType: RequestType, taskInfo?: TaskInfo) {
  const urlModifier =
    (requestType === "delete" || requestType === "put") && taskInfo
      ? `/${taskInfo._id}`
      : "";

  const url = BASE_URL + urlModifier;
  console.log(`Making ${requestType} to ${url}`);

  try {
    // Things have gone very wrong
    switch (requestType) {
      case "get":
        const { data: requestData } = await axios.get<Response>(url);
        oldGet = requestData.data as ResponseData[];
        todoData.value = oldGet;
        break;
      case "post":
        console.dir(await axios.post<Response>(url, taskInfo));
        break;
      case "put":
        console.dir(await axios.put<Response>(url, taskInfo));
        break;
      case "delete":
        console.dir(await axios.delete<Response>(url));
        break;
    }

    console.log(`${requestType} completed successfully`);
  } catch (error) {
    if (requestType === "get") {
      todoData.value = oldGet; // Restore old values on error
    }

    alert(`${requestType} request failed!\nReason: ${error}`);
  }
}

const debouncedGetRequest = debounce(processRequest, DEBOUNCE_TIME).bind(
  null,
  "get"
);

async function deleteRequest(event: TaskInfo) {
  await processRequest("delete", event);
  await debouncedGetRequest();
}

async function addRequest() {
  const taskInfo = {
    _id: "",
    todoName: textInput.value,
    isComplete: false,
  } as TaskInfo;
  console.log("Trying to post...");
  await processRequest("post", taskInfo);
  await debouncedGetRequest();
  textInput.value = "";
}

async function putRequest(event: TaskInfo) {
  await processRequest("put", event);
  await debouncedGetRequest();
}

onMounted(async () => {
  processRequest("get");
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
          <button @click="debouncedGetRequest">Refresh</button>
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
        @delete-event="deleteRequest"
        @update-event="putRequest"
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
