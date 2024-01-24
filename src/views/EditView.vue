<script setup lang="ts">
import { useRoute } from "vue-router";
import { TaskInfo } from "../util/shared";
import { computed, onMounted, ref } from "vue";
import { router } from "../routes";
import { deletePost, getPost, postPost } from "../util/httpRequests";
import FlexText from "../components/FlexText.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { noSymbols, containsVue } from "../util/Validators";

import FlexCard from "../components/FlexCard.vue";
import IconButton from "../components/IconButton.vue";

const route = useRoute();
const postId = route.query.id?.toString()!;

const taskInfo = ref<TaskInfo>({
  todoName: "To be done...",
  _id: "",
  isComplete: false,
});

const todoName = computed(() => taskInfo.value.todoName);

const vuelidate = useVuelidate(
  {
    todoName: {
      required,
      noSymbols,
      containsVue,
    },
  },
  { todoName }
);

async function getTask() {
  try {
    const { data: requestData } = await getPost({
      todoName: "",
      isComplete: false,
      _id: postId,
    });
    taskInfo.value = requestData.data;
    console.dir(requestData);
  } catch (error) {
    console.log(error);
  }
}

async function updateTask() {
  vuelidate.value.$touch();

  if (vuelidate.value.$error) {
    return;
  }

  try {
    const postUpdate: TaskInfo = {
      todoName: taskInfo.value.todoName,
      isComplete: false,
      _id: "",
    };
    await postPost(postUpdate);
    await deletePost(taskInfo.value);
    router.push({ name: "home" });
  } catch (error) {
    alert("Failed to save edits!");
    console.dir(error);
  }
}

onMounted(() => {
  getTask();
});
</script>

<template>
  <FlexCard class="big-card">
    <FlexText
      @keypress.enter="updateTask"
      placeholder="Todo..."
      v-model="taskInfo.todoName"
      class="filter-text"
      :invalid="vuelidate.todoName.$invalid"
      :errors="vuelidate.todoName.$errors"
    />
    <IconButton class="back-button" @click="router.push({ name: 'home' })"> Back </IconButton>
    <IconButton class="save-button" @click="updateTask" >
      Save
    </IconButton>
  </FlexCard>
</template>

<style>

.big-card {
  min-width: 50vw;
  padding: 1em;
}

.save-button {
  min-width: 43px;
  margin-left: 1em;
  min-height: 43px;
  background-color: #449944;
}

.back-button {
  min-width: 43px;
  margin-left: 1em;
  min-height: 43px;
  background-color: #994444;
}

.st0 {
  fill: #eeeeee;
}

</style>
../util/httpRequests