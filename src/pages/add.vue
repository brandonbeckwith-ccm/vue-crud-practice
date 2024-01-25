<script setup lang="ts">
import { ref } from "vue";
import AddTodo from "../components/AddTodoBar.vue";
import { postPost } from "../util/httpRequests";
import { useRouter } from "vue-router";

const addText = ref("");

const router = useRouter();

async function addRequest(invalid: boolean) {
  if (invalid) {
    return;
  }

  const task = {
    _id: "",
    todoName: addText.value,
    isComplete: false,
  };

  if (await postPost(task)) {
    router.push({
      path: "/",
    });
  } else {
    alert("Failed to add post!");
  }
}
</script>

<template>
  <AddTodo v-model="addText" @submit="addRequest"> </AddTodo>
</template>
