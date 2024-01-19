<script setup lang="ts">
import { useRoute } from "vue-router";
import { TaskInfo } from "../shared";
import { onMounted, ref } from "vue";
import { router } from "../routes";
import { deletePost, getPost, postPost } from "../util/HttpRequests";

const route = useRoute();
const postId = route.query.id?.toString()!;

const taskInfo = ref<TaskInfo>({
  todoName: "To be done...",
  _id: "",
  isComplete: false
});

async function getTask() {
  try {
    const { data: requestData } = await getPost({
      todoName: "",
      isComplete: false,
      _id: postId
    })
    taskInfo.value = requestData.data
    console.dir(requestData)
  } catch (error) {
    console.log(error)
  }
}

async function updateTask() {
  try {
    const postUpdate: TaskInfo = {
      todoName: taskInfo.value.todoName,
      isComplete: false,
      _id: ""
    }
    await postPost(postUpdate)
    await deletePost(taskInfo.value)
    router.push({name: "home"})
  } catch (error) {
    alert("Failed to save edits!")
    console.dir(error)
  }
}

onMounted(() => {
  getTask()
})
</script>

<template>

  <input type="text" v-model="taskInfo.todoName"/>
  <button @click="updateTask">Save</button>
  <button @click="router.push({name: 'home'})">Cancel</button>

</template>
