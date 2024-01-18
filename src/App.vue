<script setup lang="ts">
import axios from "axios";
import TableItem from "./components/TableItem.vue";
import { computed, onMounted, ref } from "vue";
import { TaskInfo } from "./types";

// TODO: Add filter
// TODO: Add Add
// TODO: Make pretty :3

type ResponseData = {
  createdAt: string;
  isComplete: boolean;
  todoName: string;
  updatedAt: string;
  _id: string;
};

const sortAscending = ref(true)
const todoData = ref<ResponseData[]>([]);

type Response = {
  code: string;
  data: Array<ResponseData>;
};

const todoSorted = computed(() => {
  const sorted = [...todoData.value].sort((a: ResponseData, b: ResponseData) => {
    if (a.todoName > b.todoName){
      return 1;
    } else if (a.todoName < b.todoName){
      return -1;
    } else {
      return 0;
    }
  })
  return (sortAscending.value)? sorted : sorted.reverse();
})

async function pullData() {
  try {
    const response = await axios.get<Response>(
      "https://calm-plum-jaguar-tutu.cyclic.app/todos"
    );
    todoData.value = response.data.data as ResponseData[];
  } catch (error) {
    alert(`Pull request failed!\nReason: ${error}`);
  }
}

async function updateData(taskInfo: TaskInfo){
  console.log("Trying to update data!")
  try{
    const response = await axios.put<Response>(
      `https://calm-plum-jaguar-tutu.cyclic.app/todos/${taskInfo.id}`,{
        isComplete: taskInfo.complete
      });
    console.dir(response)
  } catch (error) {
    alert(`Put request failed!\nReason: ${error}`);
  }
  pullData();
}

async function addData(taskInfo: TaskInfo) {
  try {
    const response = await axios.post<Response>(
      "https://calm-plum-jaguar-tutu.cyclic.app/todos", {
        todoName: taskInfo.text,
        isComplete: taskInfo.complete
      }
    );
    console.dir(response)
  } catch (error) {
    alert(`Post request failed!\nReason: ${error}`);
  }
  pullData();
}

async function deleteData(taskInfo: TaskInfo) {
  try {
    const response = await axios.delete<Response>(
      `https://calm-plum-jaguar-tutu.cyclic.app/todos/${taskInfo.id}`);
    console.dir(response)
  } catch (error) {
    alert(`Delete request failed!\nReason: ${error}`);
  }
  pullData();
}

onMounted(async () => {
  pullData();
});
</script>

<template>
  <button @click="sortAscending = !sortAscending">
    Swap Sort
  </button>
  <TableItem
    v-for="item of todoSorted"
    :key="item._id"
    :id="item._id"
    :complete="item.isComplete"
    :text="item.todoName"
    @delete-data="deleteData"
    @update-data="updateData"
    @add-data="addData"
  ></TableItem>
</template>

<style scoped></style>
