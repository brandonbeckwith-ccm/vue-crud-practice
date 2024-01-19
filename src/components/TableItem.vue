<script setup lang="ts">
import { ref } from "vue"
import { Events, TaskInfo } from "../shared";
import { useRouter } from "vue-router";

const router = useRouter();


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
      <button @click="router.push({
        name: 'edit',
        query: {
          id: props._id
        }
      })">Edit</button>
      <button @click="emitEvent('deleteEvent')">Delete</button>
    </td>
  </tr>
</template>

<style scoped>
.table-text {
  display: flex;
  justify-content: left;
}
tr {
  margin-bottom: 10px;
  background-color: #333;
}

td {
  margin-left: 0px;
  margin-right: 0px;
}
</style>