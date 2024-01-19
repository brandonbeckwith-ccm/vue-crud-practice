<script setup lang="ts">
import { ref } from "vue"
import { Events, TaskInfo } from "../shared";


const emit = defineEmits<{
  (e: Events, taskInfo: TaskInfo): void
}>()

const props = defineProps<TaskInfo>()

let textInput = ref(props.todoName)
let checkBoxInput = ref(props.isComplete)

function emitEvent(event: Events) {
  emit(event, {
      _id: props._id,
      todoName: textInput.value,
      isComplete: checkBoxInput.value,
  })
}

</script>

<template>
  <tr>
    <td class="table-text">
      <h3> {{ props.todoName }}</h3>
    </td>
    <td>
      <input @change="emitEvent('updateEvent')" type="checkbox" v-model="checkBoxInput" />
    </td>
    <td>
      <button @click="emitEvent('deleteEvent')">Delete</button>
    </td>
  </tr>
</template>

<style>
.table-text {
  display: flex;
  justify-content: left;
}
</style>