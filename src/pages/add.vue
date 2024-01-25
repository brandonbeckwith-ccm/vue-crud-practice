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

  try {
    postPost({
      _id: "",
      todoName: addText.value,
      isComplete: false,
    });
    router.push({
      path: "/"
    });
    addText.value = "";
  } catch (error) {
    console.dir(error);
  }
}
</script>

<template>
  <AddTodo v-model="addText" @submit="addRequest"> </AddTodo>
</template>