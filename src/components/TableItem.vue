<script setup lang="ts">
import { computed, ref } from "vue"
import { TaskInfo } from "../types";


const emit = defineEmits<{
  (e: "updateData", update: TaskInfo): void
  (e: "deleteData", update: TaskInfo): void
  (e: "addData", update: TaskInfo): void
}>()

const props = defineProps<{
  text: string
  complete: boolean
  id: string
}>()

type Actions = "Edit" | "Save" | "Delete"

let isEditing = ref(false)
let textInput = ref(props.text)
let checkBoxInput = ref(props.complete)

const actionButtonText = computed<Actions>(() => {
  if (isEditing.value) {
    return "Save"
  } else {
    return "Edit"
  }
})



function updateEvent() {
  console.log(checkBoxInput.value)
  emit("updateData", {
      id: props.id,
      text: textInput.value,
      complete: checkBoxInput.value,
    }
  )
}

function deleteEvent() {
  emit("deleteData", {
      id: props.id,
      text: textInput.value,
      complete: checkBoxInput.value,
  })
}

function toggleEdit() {
  isEditing.value = !isEditing.value
  if (!isEditing.value) {
    updateEvent()
  }
}
      //<button @click="toggleEdit">{{ actionButtonText }}</button>
</script>

<template>
  <tr>
    <th>
      <input v-if="isEditing" type="text" v-model="textInput" />
      <h3 v-if="!isEditing">{{ props.text }}</h3>
    </th>
    <th>
      <input @change="updateEvent" type="checkbox" v-model="checkBoxInput" />
    </th>
    <th>
      <button @click="deleteEvent">Delete</button>
    </th>
  </tr>
</template>

<styles>
</styles>
