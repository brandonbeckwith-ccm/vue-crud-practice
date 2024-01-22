<script setup lang="ts">

import { computed, ref } from "vue";
import { Events, TaskInfo } from "../util/shared";
import { useRouter } from "vue-router";

import FlexText from "./FlexText.vue";
import IconButton from "./IconButton.vue";

const router = useRouter();

const emit = defineEmits<{
  (e: Events, taskInfo: TaskInfo): void;
}>();

const props = defineProps<TaskInfo>();

let textInput = ref(props.todoName);
let checkBoxInput = ref(props.isComplete);

const outgoingTask = computed<TaskInfo>(() => ({
  _id: props._id,
  todoName: textInput.value,
  isComplete: checkBoxInput.value,
}));

</script>

<template>
  <FlexCard class="flex-row">

    <FlexText
      disabled="true"
      class="text-box"
      type="text"
      :invalid="true"
      v-model="props.todoName"/>

    <input
      @change="emit('updateEvent', outgoingTask)"
      type="checkbox"
      class="check-box"
      v-model="checkBoxInput"
    />

    <IconButton
      class="base-button edit-button"
      @click="
        router.push({
          name: 'edit',
          query: {
            id: props._id,
          },
        })
      "
    >
      <svg
        fill="none"
        height="24"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    </IconButton>

    <IconButton
      class="base-button delete-button"
      @click="emit('deleteEvent', outgoingTask)"
    >
      X
    </IconButton>

  </FlexCard>
</template>

<style scoped>
.flex-row {
  display: flex;
  background-color: #444;
  justify-content: space-evenly;
  min-width: 40vw;
  align-items: center;
  flex-wrap: nowrap;
  margin-left: 1em;
  margin-right: 1em;
  margin-bottom: 1vh;
  margin-top: 1vh;
  border-radius: 10px;
  padding: 5px;
  max-height: 18vh;
}

.flex-row:first-child {
  margin-top: 2vh;
}
.flex-row:last-child {
  margin-bottom: 2vh;
}

.check-box {
  min-width: 5.3vh;
  min-height: 5.3vh;
}
.delete-button {
  background-color: #bb3333;
  margin-left: 0.5em;
  margin-right: 0em;
  font-size: 18pt;
}
.edit-button {
  background-color: #333377;
}

.text-box {
  width: 30vw;
  margin-left: 1em;
  background-color: #333;
  margin-right: 1em;
}
</style>
