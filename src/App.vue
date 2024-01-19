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
const todoData = ref<ResponseData[]>([]);
const filterInput = ref("");

const textInput = ref("");

type Response = {
  code: string;
  data: Array<ResponseData>;
};

const todoFiltered = computed(() => {
  const filtered = [...todoData.value].filter((value) => {
    // Copy or we end up blowing the stack
    return value.todoName
      .toLowerCase()
      .includes(filterInput.value.toLowerCase());
  });
  return filtered;
});

const todoSorted = computed(() => {
  const sorted = todoFiltered.value.sort(
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
    <div class="flex-filter">
      <input @keypress.enter="addRequest" type="text" v-model="textInput" />
      <button @click="addRequest" class="add-button">Add</button>
    </div>

    <table>
      <tr>
        <td class="">
          <input type="text" v-model="filterInput" />
          <input type="checkbox" v-model="sortCheckbox" />
        </td>
        <td>

        </td>
        <td>
          <button @click="debouncedGetRequest">Re-fetch</button>
        </td>
      </tr>
      
      <tr>
        <th class>
          <h3>Task</h3>
        </th>
        <th>
          <h3>Completed</h3>
        </th>
        <th>
          <h3>Delete?</h3>
        </th>
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

.flex-filter {
  display: flex;
  justify-content: flex-start;
}
.flex-container {
  display: flex;
  align-items: center;
  flex-flow: column;
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
</style>
