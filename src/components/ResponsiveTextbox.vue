<script setup lang="ts">
import { computed } from "vue";
import { ErrorObject } from "@vuelidate/core/index.js";

defineOptions({
  inheritAttrs: false
})

const model = defineModel<string>()

const props = defineProps<{
  errors?: ErrorObject[]
  invalid?: boolean
}>()

const hasErrors = computed(() => (props.errors !== undefined && props.errors.length > 0))

const currentClasses = computed(() => ({
    'good-text': !props.invalid,
    'bad-text': props.invalid
  }))
</script>

<template>
  <div class="error-wrapper">
    <div v-if="hasErrors" class="flex-card error-card">
      <p class="error-text">Errors:</p>
      <p class="error-text" v-for="error of props.errors">{{ error.$message }}</p>
    </div>
  </div>
  <input
    :class="currentClasses"
    class="flex-text"
    v-model="model"
    v-bind="$attrs"
    type="text"
  />
</template>

<style>

.flex-text {
  outline: none;
  flex-grow: 2;
  height: 24pt;
  border-radius: 10px;
  border: none;
  padding-left: 1vw;
}

.error-wrapper {
  position: relative;
}

.error-text {
  margin-bottom: 5px;
  margin-top: 0;
}

.error-text:first-child{
  margin-top: 8px;
}

.error-text:last-child{
  margin-bottom: 8px;
}

.error-card {
  position: absolute;
  width: max-content;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  bottom: 18pt;
  left: 1em;
  padding-left: 1em;
  padding-right: 1em;
  background-color: #552222;
  transition: 0.25s;
}

.card-template {
  position: relative;
}

.flex-text::placeholder {
  color: #BBB
}

.bad-text {
  background-color: #333;
  transition: 0.25s;
}

.bad-text:hover {
  background-color: #444;
}

.good-text {
  transition: 0.25s;
  background-color: #495981; 
}

.good-text:hover {
  transition: 0.25s;
  background-color: #4959B9; 
}
</style>